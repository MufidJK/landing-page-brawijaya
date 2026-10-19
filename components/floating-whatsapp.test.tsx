import { render, screen } from '@testing-library/react';
import FloatingWhatsApp from './floating-whatsapp';

describe('FloatingWhatsApp', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_WA_NUMBER = '6281234567890';
  });

  it('has correct wa.me href with number from env', () => {
    render(<FloatingWhatsApp />);
    
    const link = screen.getByRole('link', { name: /chat via whatsapp/i });
    expect(link).toHaveAttribute('href', expect.stringContaining('wa.me/6281234567890'));
  });

  it('has target="_blank" and rel="noopener noreferrer"', () => {
    render(<FloatingWhatsApp />);
    
    const link = screen.getByRole('link', { name: /chat via whatsapp/i });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
