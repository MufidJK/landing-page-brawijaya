import { render, screen } from '@testing-library/react';
import UnitSection from './unit-section';
import { units, FLOOR_PLAN_LABELS } from '@/lib/units';

describe('UnitSection', () => {
  const aryasatya = units[0];
  const adhinata = units[1];

  beforeEach(() => {
    process.env.NEXT_PUBLIC_WA_NUMBER = '6281234567890';
  });

  describe('Aryasatya', () => {
    it('shows correct specs: 5x11, LB 68, LT 55', () => {
      render(<UnitSection unit={aryasatya} variant="ivory" />);
      expect(screen.getByText(/5x11/)).toBeInTheDocument();
      expect(screen.getByText(/LB 68/)).toBeInTheDocument();
      expect(screen.getByText(/LT 55/)).toBeInTheDocument();
    });

    it('shows Carport badge', () => {
      render(<UnitSection unit={aryasatya} variant="ivory" />);
      expect(screen.getByText('Carport')).toBeInTheDocument();
    });

    it('does NOT show iconic door or skylight', () => {
      render(<UnitSection unit={aryasatya} variant="ivory" />);
      expect(screen.queryByText(/Iconic door/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Skylight/i)).not.toBeInTheDocument();
    });

    it('CTA href contains Aryasatya type name', () => {
      render(<UnitSection unit={aryasatya} variant="ivory" />);
      const link = screen.getByRole('link', { name: /tanya tipe aryasatya/i });
      expect(link).toHaveAttribute('href', expect.stringContaining('Aryasatya'));
    });

    it('renders all 11 photos', () => {
      render(<UnitSection unit={aryasatya} variant="ivory" />);
      const images = screen.getAllByRole('img');
      const photoImages = images.filter(img => 
        img.getAttribute('src')?.includes('aryasatya')
      );
      expect(photoImages.length).toBeGreaterThanOrEqual(11);
    });

    it('renders 3 floor plans with labels', () => {
      render(<UnitSection unit={aryasatya} variant="ivory" />);
      expect(screen.getByText(FLOOR_PLAN_LABELS[1])).toBeInTheDocument();
      expect(screen.getByText(FLOOR_PLAN_LABELS[2])).toBeInTheDocument();
      expect(screen.getByText(FLOOR_PLAN_LABELS[3])).toBeInTheDocument();
    });
  });

  describe('Adhinata', () => {
    it('shows correct specs: 6x11, LB 83, LT 66', () => {
      render(<UnitSection unit={adhinata} variant="emerald" />);
      expect(screen.getByText(/6x11/)).toBeInTheDocument();
      expect(screen.getByText(/LB 83/)).toBeInTheDocument();
      expect(screen.getByText(/LT 66/)).toBeInTheDocument();
    });

    it('shows "Carport 2 Mobil" badge', () => {
      render(<UnitSection unit={adhinata} variant="emerald" />);
      expect(screen.getByText('Carport 2 Mobil')).toBeInTheDocument();
    });

    it('shows iconic door and skylight', () => {
      render(<UnitSection unit={adhinata} variant="emerald" />);
      expect(screen.getByText(/Iconic door/i)).toBeInTheDocument();
      expect(screen.getByText(/Skylight/i)).toBeInTheDocument();
    });

    it('CTA href contains Adhinata type name', () => {
      render(<UnitSection unit={adhinata} variant="emerald" />);
      const link = screen.getByRole('link', { name: /tanya tipe adhinata/i });
      expect(link).toHaveAttribute('href', expect.stringContaining('Adhinata'));
    });

    it('renders all 9 photos', () => {
      render(<UnitSection unit={adhinata} variant="emerald" />);
      const images = screen.getAllByRole('img');
      const photoImages = images.filter(img => 
        img.getAttribute('src')?.includes('adhinata')
      );
      expect(photoImages.length).toBeGreaterThanOrEqual(9);
    });

    it('renders 3 floor plans with labels', () => {
      render(<UnitSection unit={adhinata} variant="emerald" />);
      expect(screen.getByText(FLOOR_PLAN_LABELS[1])).toBeInTheDocument();
      expect(screen.getByText(FLOOR_PLAN_LABELS[2])).toBeInTheDocument();
      expect(screen.getByText(FLOOR_PLAN_LABELS[3])).toBeInTheDocument();
    });
  });

  describe('Carousel arrows', () => {
    it('prev arrow hidden at start', () => {
      render(<UnitSection unit={aryasatya} variant="ivory" />);
      
      const carousel = document.querySelector('[role="region"]');
      if (carousel) {
        Object.defineProperty(carousel, 'scrollLeft', { value: 0, writable: true });
        Object.defineProperty(carousel, 'clientWidth', { value: 800, writable: true });
        Object.defineProperty(carousel, 'scrollWidth', { value: 2000, writable: true });
      }

      const prevButton = screen.getByLabelText('Foto sebelumnya');
      expect(prevButton).toHaveClass('opacity-0');
    });

    it('next arrow hidden at end', () => {
      render(<UnitSection unit={aryasatya} variant="ivory" />);
      
      const carousel = document.querySelector('[role="region"]');
      if (carousel) {
        Object.defineProperty(carousel, 'scrollLeft', { value: 1200, writable: true });
        Object.defineProperty(carousel, 'clientWidth', { value: 800, writable: true });
        Object.defineProperty(carousel, 'scrollWidth', { value: 2000, writable: true });
      }

      const nextButton = screen.getByLabelText('Foto berikutnya');
      expect(nextButton).toHaveClass('opacity-0');
    });
  });
});
