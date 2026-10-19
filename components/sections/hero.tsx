import Image from 'next/image';
import { getCloudinaryUrl } from '@/lib/cloudinary';
import { buildWaLink } from '@/lib/wa';
import { site } from '@/lib/site';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const waLink = buildWaLink(`Halo Ibu ${site.marketing.name}, saya tertarik dengan The Brawijaya dan ingin informasi lebih lanjut!`);
  
  return (
    <section id="beranda" className="relative bg-brand-emerald min-h-svh scroll-mt-18">
      {/* Hero Image */}
      <div className="absolute inset-x-0 top-0 h-[60svh] md:inset-0 md:h-auto z-0">
        <Image
          src={getCloudinaryUrl('hero-gerbang_p7bmqb', 'f_auto,q_auto,w_1920')}
          alt="The Brawijaya entrance gate illustration"
          fill
          priority
          className="object-cover object-[70%_0%] md:object-[50%_20%]"
          sizes="100vw"
        />
        {/* Gradient overlay — lower-left for text */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent md:bg-linear-to-r md:from-black/70 md:via-black/40 md:to-transparent" />
        {/* Mobile-only fade to emerald */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-b from-transparent to-brand-emerald md:hidden" />
      </div>

      {/* Content — vertically centered, left-aligned */}
      <div className="relative z-10 container mx-auto px-4 flex items-center min-h-svh">
        <div className="max-w-2xl">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white tracking-tight">
            Elegan di Setiap Detail
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl mb-6 text-white/95">
            The Brawijaya, {site.description}.
          </p>
          
          <p className="text-2xl md:text-3xl font-semibold mb-8 text-brand-gold">
            Mulai dari {site.priceFrom}
          </p>
          
          <Button asChild size="lg" className="bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal font-semibold shadow-lg hover:shadow-xl transition-all">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Hubungi Kami
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
