import { render, screen } from '@testing-library/react';
import Footer from './footer';

describe('Footer', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_WA_NUMBER = '6281234567890';
  });

  it('WhatsApp link has correct href with number from env', () => {
    render(<Footer />);
    
    const waLink = screen.getByRole('link', { name: /hubungi yulia via whatsapp/i });
    expect(waLink).toHaveAttribute('href', expect.stringContaining('wa.me/6281234567890'));
  });

  it('WhatsApp link has target="_blank" and rel="noopener noreferrer"', () => {
    render(<Footer />);
    
    const waLink = screen.getByRole('link', { name: /hubungi yulia via whatsapp/i });
    expect(waLink).toHaveAttribute('target', '_blank');
    expect(waLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('shows disclaimer text', () => {
    render(<Footer />);
    
    expect(screen.getByText(/© 2026 The Brawijaya/i)).toBeInTheDocument();
    expect(screen.getByText(/seluruh hak cipta dilindungi/i)).toBeInTheDocument();
  });

  it('does not show developer name', () => {
    render(<Footer />);
    
    expect(screen.queryByText(/PT Mitra Sinergi Development/i)).not.toBeInTheDocument();
  });
});
