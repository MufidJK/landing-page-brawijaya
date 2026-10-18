'use client';
// Client Component: IntersectionObserver with cleanup, respects prefers-reduced-motion

import { useEffect, useRef, useState } from 'react';
import { locations } from '@/lib/location';
import { buildWaLink } from '@/lib/wa';
import { site } from '@/lib/site';
import { Button } from '@/components/ui/button';

export default function LocationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (isVisible) return; // already visible due to reduced motion preference

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const waMessage = `Halo Kak ${site.marketing.name}, saya ingin jadwalkan kunjungan ke The Brawijaya. Kapan waktu yang tersedia? 🙏`;
  const waLink = buildWaLink(waMessage);

  return (
    <section
      id="lokasi"
      ref={sectionRef}
      className={`bg-[#F7F3EA] text-[#1F2421] py-16 px-4 transition-opacity duration-700 scroll-mt-[72px] ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Lokasi Strategis di Jantung Tangerang Selatan
          </h2>
          <p className="text-lg text-[#1F2421]/70 max-w-3xl mx-auto">
            The Brawijaya terletak di lokasi yang strategis dengan akses mudah ke Stasiun Rawa Buntu, 
            MRT Lebak Bulus, dan Tol Jakarta-Serpong. Nikmati kemudahan menjangkau pusat perbelanjaan, 
            rumah sakit, sekolah, dan kawasan bisnis hanya dalam hitungan menit.
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {locations.map((location) => {
            const Icon = location.icon;
            return (
              <div
                key={location.id}
                className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <Icon className="h-10 w-10 text-[#C8A24A] mb-4" />
                <p className="text-sm text-[#1F2421]/60 mb-1">
                  {location.minutes} menit ke
                </p>
                <p className="font-semibold text-lg text-[#1F2421]">
                  {location.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-[#C8A24A] hover:bg-[#B8943A] text-[#1F2421] font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              Jadwalkan Kunjungan
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
