'use client';
// Client Component: carousel navigation + lightbox with keyboard listeners

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { UnitType } from '@/lib/units';
import { FLOOR_PLAN_LABELS } from '@/lib/units';
import { getCloudinaryUrl } from '@/lib/cloudinary';
import { buildWaLink } from '@/lib/wa';
import { site } from '@/lib/site';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

type UnitSectionProps = {
  unit: UnitType;
  variant: 'ivory' | 'emerald';
};

export default function UnitSection({ unit, variant }: UnitSectionProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxType, setLightboxType] = useState<'photo' | 'plan'>('photo');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const waMessage = `Halo Ibu ${site.marketing.name}, saya tertarik dengan ${unit.name} di The Brawijaya dan ingin informasi lebih lanjut!`;
  const waLink = buildWaLink(waMessage);

  const isIvory = variant === 'ivory';
  const bgClass = isIvory ? 'bg-brand-ivory' : 'bg-brand-emerald';
  const textClass = isIvory ? 'text-brand-charcoal' : 'text-brand-ivory';
  const mutedClass = isIvory ? 'text-brand-charcoal/70' : 'text-brand-ivory/80';

  const highlights = unit.id === 'aryasatya' 
    ? ['Kanopi beton gratis', 'Bata merah', 'Smart lock']
    : ['Kanopi beton gratis', 'Bata merah', 'Smart lock', 'Iconic door', 'Skylight'];

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    const scrollAmount = carouselRef.current.clientWidth * 0.7;
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const openLightbox = (index: number, type: 'photo' | 'plan') => {
    setLightboxIndex(index);
    setLightboxType(type);
    setLightboxOpen(true);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    const items = lightboxType === 'photo' ? unit.photoIds : unit.floorPlanIds;
    if (direction === 'prev') {
      setLightboxIndex((prev) => (prev - 1 + items.length) % items.length);
    } else {
      setLightboxIndex((prev) => (prev + 1) % items.length);
    }
  };

  // Track carousel scroll boundaries
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let rafId: number | null = null;

    const updateScrollState = () => {
      const left = el.scrollLeft > 4;
      const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
      
      if (left !== canScrollLeft) setCanScrollLeft(left);
      if (right !== canScrollRight) setCanScrollRight(right);
    };

    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateScrollState();
        rafId = null;
      });
    };

    updateScrollState(); // initial
    el.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      el.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [canScrollLeft, canScrollRight]);

  // Recompute on image load
  const handleImageLoad = () => {
    const el = carouselRef.current;
    if (!el) return;
    const left = el.scrollLeft > 4;
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
    if (left !== canScrollLeft) setCanScrollLeft(left);
    if (right !== canScrollRight) setCanScrollRight(right);
  };

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyboard = (e: KeyboardEvent) => {
      const items = lightboxType === 'photo' ? unit.photoIds : unit.floorPlanIds;
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + items.length) % items.length);
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % items.length);
      }
      if (e.key === 'Escape') {
        setLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [lightboxOpen, lightboxType, unit.photoIds, unit.floorPlanIds]);

  const currentLightboxImage = lightboxType === 'photo' 
    ? unit.photoIds[lightboxIndex]
    : unit.floorPlanIds[lightboxIndex];

  return (
    <section id={unit.id} className={`${bgClass} ${textClass} py-16 px-4 relative scroll-mt-18`}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-3">
            {unit.name.replace('Tipe ', '').toUpperCase()}
          </h2>
          <p className={`text-lg mb-4 ${mutedClass}`}>
            {unit.landDimensions} | LB {unit.buildingArea} | LT {unit.landArea}
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={`${isIvory ? 'border-brand-emerald text-brand-emerald' : 'border-brand-gold text-brand-gold'}`}>
              {unit.bedrooms} Kamar Tidur
            </Badge>
            <Badge variant="outline" className={`${isIvory ? 'border-brand-emerald text-brand-emerald' : 'border-brand-gold text-brand-gold'}`}>
              {unit.bathrooms} Kamar Mandi
            </Badge>
            <Badge variant="outline" className={`${isIvory ? 'border-brand-emerald text-brand-emerald' : 'border-brand-gold text-brand-gold'}`}>
              {unit.carport || 'Carport'}
            </Badge>
          </div>
        </div>

        {/* Photo Carousel */}
        <div className="relative mb-12">
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {unit.photoIds.map((photoId, index) => (
              <button
                key={photoId}
                type="button"
                onClick={() => openLightbox(index, 'photo')}
                className="relative shrink-0 snap-start w-[70%] md:w-[40%] lg:w-[24%] aspect-3/4 rounded-lg overflow-hidden hover:opacity-90 transition-opacity"
              >
                <Image
                  src={getCloudinaryUrl(photoId, 'f_auto,q_auto')}
                  alt={`${unit.name} photo ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 70vw, (max-width: 1024px) 40vw, 24vw"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  priority={index === 0}
                  onLoad={handleImageLoad}
                />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => scrollCarousel('left')}
            className={`absolute left-2 top-1/2 -translate-y-1/2 ${isIvory ? 'bg-white/90 text-brand-emerald' : 'bg-brand-emerald/90 text-white'} p-2 rounded-full shadow-lg hover:scale-110 transition-all duration-200 ${
              canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Previous photos"
            tabIndex={canScrollLeft ? 0 : -1}
            aria-hidden={!canScrollLeft}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => scrollCarousel('right')}
            className={`absolute right-2 top-1/2 -translate-y-1/2 ${isIvory ? 'bg-white/90 text-brand-emerald' : 'bg-brand-emerald/90 text-white'} p-2 rounded-full shadow-lg hover:scale-110 transition-all duration-200 ${
              canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Next photos"
            tabIndex={canScrollRight ? 0 : -1}
            aria-hidden={!canScrollRight}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Highlights */}
        <div className="mb-12">
          <h3 className="font-semibold text-xl mb-4">Keunggulan</h3>
          <div className="flex flex-wrap gap-3">
            {highlights.map((highlight) => (
              <div
                key={highlight}
                className={`px-4 py-2 rounded-lg ${isIvory ? 'bg-white border border-brand-emerald/20' : 'bg-brand-emerald/50 border border-brand-gold/30'}`}
              >
                <span className="text-sm font-medium">{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floor Plans */}
        <div className="mb-12">
          <h3 className="font-semibold text-xl mb-6">Denah</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {unit.floorPlanIds.map((planId, index) => (
              <Card
                key={planId}
                className={`overflow-hidden cursor-pointer hover:shadow-xl transition-shadow ${isIvory ? 'bg-white' : 'bg-brand-ivory'}`}
                onClick={() => openLightbox(index, 'plan')}
              >
                <div className="relative w-full aspect-3/4 bg-gray-50">
                  <Image
                    src={getCloudinaryUrl(planId, 'f_auto,q_auto')}
                    alt={`${unit.name} ${FLOOR_PLAN_LABELS[(index + 1) as keyof typeof FLOOR_PLAN_LABELS]}`}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="font-medium text-brand-charcoal">
                    {FLOOR_PLAN_LABELS[(index + 1) as keyof typeof FLOOR_PLAN_LABELS]}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              Tanya {unit.name}
            </a>
          </Button>
        </div>
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl p-0 bg-black/95 border-none">
          <DialogTitle className="sr-only">
            {lightboxType === 'photo' ? 'Galeri foto' : 'Denah'}
          </DialogTitle>
          <div className="relative w-full h-[80vh]">
            <Image
              src={getCloudinaryUrl(currentLightboxImage, 'f_auto,q_auto')}
              alt={`${unit.name} ${lightboxType === 'photo' ? 'photo' : 'floor plan'} ${lightboxIndex + 1}`}
              fill
              className={lightboxType === 'photo' ? 'object-contain' : 'object-contain p-4'}
              sizes="100vw"
              priority
            />
            <button
              type="button"
              onClick={() => navigateLightbox('prev')}
              data-lightbox-arrow
              data-dir="prev"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 text-black p-3 rounded-full shadow-lg hover:scale-110 hover:bg-white transition-transform flex items-center justify-center"
              aria-label="Previous"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              type="button"
              onClick={() => navigateLightbox('next')}
              data-lightbox-arrow
              data-dir="next"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 text-black p-3 rounded-full shadow-lg hover:scale-110 hover:bg-white transition-transform flex items-center justify-center"
              aria-label="Next"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
            <DialogClose asChild>
              <button
                type="button"
                className="absolute top-4 right-4 bg-white/90 text-black p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                aria-label="Tutup"
              >
                <X className="h-6 w-6" />
              </button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
