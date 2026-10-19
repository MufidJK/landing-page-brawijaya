import { FaWhatsapp } from 'react-icons/fa';
import { buildWaLink } from '@/lib/wa';
import { site } from '@/lib/site';

export default function FloatingWhatsApp() {
  const waLink = buildWaLink(`Halo Ibu ${site.marketing.name}, saya tertarik dengan The Brawijaya dan ingin informasi lebih lanjut!`);

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-6 right-6 z-40 bg-whatsapp hover:bg-whatsapp-hover text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center"
      style={{ 
        paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
        paddingRight: 'calc(1rem + env(safe-area-inset-right, 0px))',
      }}
    >
      <FaWhatsapp className="h-[30px] w-[30px]" />
    </a>
  );
}
