export function buildWaLink(message: string): string {
  const phone = process.env.NEXT_PUBLIC_WA_NUMBER;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
