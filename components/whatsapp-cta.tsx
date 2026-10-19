import { FaWhatsapp } from 'react-icons/fa';

type WhatsAppCTAProps = {
  href: string;
  label: string;
  showNote?: boolean;
  noteClassName?: string;
  align?: 'start' | 'center';
};

export default function WhatsAppCTA({ href, label, showNote = false, noteClassName, align = 'center' }: WhatsAppCTAProps) {
  const alignClass = align === 'start' ? 'items-start' : 'items-center';
  
  return (
    <div className={`flex flex-col ${alignClass} gap-3`}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center justify-center gap-3 h-14 px-8 text-base font-semibold rounded-xl bg-brand-gold hover:bg-brand-gold-hover text-brand-charcoal shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgb(212,175,55,0.4)] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold w-full max-w-sm sm:w-auto before:absolute before:inset-0 before:rounded-xl before:bg-brand-gold before:opacity-40 before:blur-xl before:motion-reduce:hidden before:animate-pulse-ring"
      >
        <FaWhatsapp className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span>{label}</span>
      </a>
      {showNote && (
        <p className={noteClassName || "text-sm text-brand-charcoal/60"}>
          Konsultasi langsung dengan Yulia via WhatsApp
        </p>
      )}
    </div>
  );
}
