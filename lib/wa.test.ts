import { buildWaLink } from './wa';

describe('buildWaLink', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv, NEXT_PUBLIC_WA_NUMBER: '6281234567890' };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('builds correct wa.me URL with number from env', () => {
    const result = buildWaLink('Hello');
    expect(result).toBe('https://wa.me/6281234567890?text=Hello');
  });

  it('URL-encodes spaces in message', () => {
    const result = buildWaLink('Hello World Test');
    expect(result).toBe('https://wa.me/6281234567890?text=Hello%20World%20Test');
  });

  it('URL-encodes emoji in message', () => {
    const result = buildWaLink('Hi 🙏');
    expect(result).toBe('https://wa.me/6281234567890?text=Hi%20%F0%9F%99%8F');
  });

  it('handles empty message', () => {
    const result = buildWaLink('');
    expect(result).toBe('https://wa.me/6281234567890?text=');
  });

  it('URL-encodes special characters', () => {
    const result = buildWaLink('Price: Rp970 Juta & more!');
    expect(result).toBe('https://wa.me/6281234567890?text=Price%3A%20Rp970%20Juta%20%26%20more!');
  });
});
