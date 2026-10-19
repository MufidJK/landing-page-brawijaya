import { render, screen } from '@testing-library/react';
import Hero from './hero';
import { site } from '@/lib/site';

describe('Hero', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_WA_NUMBER = '6281234567890';
  });

  it('shows headline', () => {
    render(<Hero />);
    
    expect(screen.getByText(/elegan di setiap detail/i)).toBeInTheDocument();
    expect(screen.getByText(/the brawijaya/i)).toBeInTheDocument();
  });

  it('shows price from lib/site', () => {
    render(<Hero />);
    
    expect(screen.getByText(new RegExp(site.priceFrom, 'i'))).toBeInTheDocument();
  });

  it('CTA links to WhatsApp', () => {
    render(<Hero />);
    
    const link = screen.getByRole('link', { name: /chat yulia di whatsapp/i });
    expect(link).toHaveAttribute('href', expect.stringContaining('wa.me/6281234567890'));
  });

  it('CTA has target="_blank" and rel="noopener noreferrer"', () => {
    render(<Hero />);
    
    const link = screen.getByRole('link', { name: /chat yulia di whatsapp/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
