'use client';
// Client Component: scroll listener + scroll spy + mobile sheet

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { site, navItems } from '@/lib/site';
import { buildWaLink } from '@/lib/wa';
import { getCloudinaryUrl } from '@/lib/cloudinary';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');
  const [mobileOpen, setMobileOpen] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const enabledNavItems = navItems.filter((item) => item.enabled);
    const sectionIds = enabledNavItems.map((item) => item.href.slice(1));

    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      // Top of page
      if (scrollY < 40) {
        setActiveSection(sectionIds[0]);
        return;
      }

      // Bottom of page
      if (innerHeight + scrollY >= scrollHeight - 4) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      // Middle: last section whose top is above 72px + 30% viewport
      const threshold = 72 + innerHeight * 0.3;
      let newActiveId = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= threshold) {
          newActiveId = id;
        }
      }

      setActiveSection(newActiveId);
    };

    const handleScrollThrottled = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        updateActiveSection();
        rafRef.current = null;
      });
    };

    updateActiveSection(); // initial state
    window.addEventListener('scroll', handleScrollThrottled, { passive: true });
    window.addEventListener('resize', handleScrollThrottled, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScrollThrottled);
      window.removeEventListener('resize', handleScrollThrottled);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const waLink = buildWaLink(`Halo Ibu ${site.marketing.name}, saya tertarik dengan The Brawijaya dan ingin informasi lebih lanjut!`);

  const enabledNavItems = navItems.filter((item) => item.enabled);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 72;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-18 transition-all duration-300 ${
        scrolled ? 'bg-brand-ivory shadow-lg' : 'bg-transparent'
      }`}
    >
      {/* Dark gradient behind transparent navbar */}
      {!scrolled && (
        <div className="absolute inset-0 bg-linear-to-b from-black/40 to-transparent pointer-events-none" />
      )}
      <div className="container mx-auto px-4 h-full flex items-center justify-between relative z-10">
        {/* Logo */}
        <Link href="#beranda" className="relative" onClick={(e) => handleNavClick(e, '#beranda')}>
          <Image
            src={getCloudinaryUrl('logo-the-brawijaya_u3zdci', 'f_auto,q_auto,w_300')}
            alt="The Brawijaya"
            width={150}
            height={107}
            className={`transition-all duration-300 object-contain h-12 w-auto ${
              scrolled ? 'brightness-0' : 'brightness-0 invert'
            }`}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {enabledNavItems.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            const activeColor = scrolled ? 'text-brand-emerald' : 'text-brand-gold';
            const inactiveColor = scrolled ? 'text-brand-charcoal' : 'text-white';
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-[13px] uppercase tracking-[0.16em] transition-colors group ${
                  isActive ? `${activeColor} ${scrolled ? 'font-semibold' : 'font-medium'}` : `${inactiveColor} font-medium hover:text-brand-gold`
                }`}
                onClick={(e) => handleNavClick(e, item.href)}
                aria-current={isActive ? 'location' : undefined}
              >
                {item.label}
                <span className="absolute left-0 -bottom-2 h-px bg-brand-gold w-full scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            );
          })}
          <Button
            asChild
            className="h-9 px-5 bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal text-[13px] uppercase tracking-wide font-semibold"
          >
            <a href={waLink} target="_blank" rel="noopener noreferrer">
              Hubungi Kami
            </a>
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className={`transition-colors ${scrolled ? 'text-brand-charcoal hover:text-brand-gold' : 'text-white hover:text-brand-gold'} hover:bg-transparent`}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-brand-ivory">
            <SheetHeader>
              <SheetTitle className="flex justify-center">
                <Image
                  src={getCloudinaryUrl('logo-the-brawijaya_u3zdci', 'f_auto,q_auto,w_300')}
                  alt="The Brawijaya"
                  width={150}
                  height={107}
                  className="w-30 h-auto"
                />
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 mt-8">
              {enabledNavItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-lg font-medium uppercase tracking-wide transition-colors ${
                      isActive ? 'text-brand-gold' : 'text-brand-charcoal hover:text-brand-gold'
                    }`}
                    onClick={(e) => {
                      handleNavClick(e, item.href);
                      setMobileOpen(false);
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Button
                asChild
                className="bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal font-semibold mt-4 uppercase tracking-wide"
              >
                <a href={waLink} target="_blank" rel="noopener noreferrer">
                  Hubungi Kami
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
