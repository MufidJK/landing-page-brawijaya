import { render, screen } from '@testing-library/react';
import LocationSection from './location';
import { locations } from '@/lib/location';

describe('LocationSection', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_WA_NUMBER = '6281234567890';
  });

  it('renders all 6 location items', () => {
    render(<LocationSection />);
    expect(locations).toHaveLength(6);
    
    locations.forEach(location => {
      expect(screen.getByText(location.label)).toBeInTheDocument();
    });
  });

  it('shows correct minutes for each location', () => {
    render(<LocationSection />);
    
    // 4 locations with 10 minutes, 2 with 15 minutes
    const tenMinute = screen.getAllByText(/10.*menit/i);
    expect(tenMinute.length).toBe(4);
    
    const fifteenMinute = screen.getAllByText(/15.*menit/i);
    expect(fifteenMinute.length).toBe(2);
  });

  it('shows correct labels', () => {
    render(<LocationSection />);
    
    // Spot check a few key locations (plain hyphen now)
    expect(screen.getByText(/tol bsd-bintaro/i)).toBeInTheDocument();
    expect(screen.getByText('Stasiun Rawa Buntu')).toBeInTheDocument();
    expect(screen.getByText('The Breeze')).toBeInTheDocument();
    expect(screen.getByText('Eka Hospital')).toBeInTheDocument();
    expect(screen.getByText('Sekolah Cikal')).toBeInTheDocument();
    expect(screen.getByText('Pasar Modern BSD')).toBeInTheDocument();
  });

  it('CTA links to WhatsApp', () => {
    render(<LocationSection />);
    
    const link = screen.getByRole('link', { name: /jadwalkan kunjungan/i });
    expect(link).toHaveAttribute('href', expect.stringContaining('wa.me/6281234567890'));
  });
});
