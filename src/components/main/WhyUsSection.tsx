import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { HeartIcon, LeafIcon, CupSodaIcon } from "lucide-react";

export const WhyUsSection = () => {
  return (
    <section className="my-12">
      <h2 className="mb-4 text-2xl font-semibold">Why Choose Our Tea?</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <LeafIcon className="mb-2 h-8 w-8 text-primary" />
            <CardTitle>Premium Quality</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Hand-picked leaves from the finest tea gardens around the world.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CupSodaIcon className="mb-2 h-8 w-8 text-primary" />
            <CardTitle>Rich Flavor</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Carefully processed to preserve the natural aroma and taste.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <HeartIcon className="mb-2 h-8 w-8 text-primary" />
            <CardTitle>Health Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Packed with antioxidants and nutrients for your well-being.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
