import Hero from '@/components/sections/hero';
import UnitSection from '@/components/sections/unit-section';
import LocationSection from '@/components/sections/location';
import { units } from '@/lib/units';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <>
      <Hero />
      <UnitSection unit={units[0]} variant="ivory" />
      <Separator className="bg-[#C8A24A]" />
      <UnitSection unit={units[1]} variant="emerald" />
      <LocationSection />
    </>
  );
}
