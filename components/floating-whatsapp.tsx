import { MessageCircle } from 'lucide-react';
import { buildWaLink } from '@/lib/wa';
import { site } from '@/lib/site';

export default function FloatingWhatsApp() {
  const waLink = buildWaLink(`Halo Kak ${site.marketing.name}, saya tertarik dengan The Brawijaya dan ingin informasi lebih lanjut 🙏`);

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all hover:scale-110"
      style={{ 
        paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
        paddingRight: 'calc(1rem + env(safe-area-inset-right, 0px))',
      }}
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
