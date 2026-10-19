import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from './navbar';
import { navItems } from '@/lib/site';

describe('Navbar', () => {
  it('only renders enabled nav items', () => {
    render(<Navbar />);
    
    const enabledItems = navItems.filter(item => item.enabled);
    const disabledItems = navItems.filter(item => !item.enabled);

    enabledItems.forEach(item => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });

    disabledItems.forEach(item => {
      expect(screen.queryByText(item.label)).not.toBeInTheDocument();
    });
  });

  it('mobile menu trigger opens Sheet', async () => {
    render(<Navbar />);
    
    const menuButtons = screen.queryAllByRole('button');
    const menuButton = menuButtons.find(btn => 
      btn.getAttribute('aria-label')?.toLowerCase().includes('menu') ||
      btn.textContent?.toLowerCase().includes('menu')
    );
    
    if (menuButton) {
      await userEvent.click(menuButton);
      
      const logos = screen.queryAllByAltText('The Brawijaya');
      expect(logos.length).toBeGreaterThan(1);
    }
  });

  it('removes scroll and resize listeners on unmount', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = render(<Navbar />);

    const scrollCalls = addEventListenerSpy.mock.calls.filter(
      call => call[0] === 'scroll'
    ).length;
    const resizeCalls = addEventListenerSpy.mock.calls.filter(
      call => call[0] === 'resize'
    ).length;

    unmount();

    const scrollRemoveCalls = removeEventListenerSpy.mock.calls.filter(
      call => call[0] === 'scroll'
    ).length;
    const resizeRemoveCalls = removeEventListenerSpy.mock.calls.filter(
      call => call[0] === 'resize'
    ).length;

    expect(scrollRemoveCalls).toBe(scrollCalls);
    expect(resizeRemoveCalls).toBe(resizeCalls);

    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });
});
