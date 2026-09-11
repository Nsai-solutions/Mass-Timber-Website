'use client';

import { useState, useMemo } from 'react';
import { PageBanner } from '@/components/layout/PageBanner';
import { Container } from '@/components/ui/Container';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GradientOrb } from '@/components/ui/GradientOrb';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { slideshowImages } from '@/data/slideshow-images';
import centersData from '@/data/training-centers.json';

const regions = ['All', 'West', 'Midwest', 'Northeast', 'South', 'Canada'];

interface TrainingCenter {
  id: string;
  name: string;
  city: string;
  state: string;
  region: string;
  address: string;
  phone: string;
  courses: string[];
  status: string;
}

export default function TrainingCentersPage() {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const centers = centersData as TrainingCenter[];

  const filteredCenters = useMemo(() => {
    return centers.filter((center) => {
      const matchesRegion = selectedRegion === 'All' || center.region === selectedRegion;
      const matchesSearch = searchQuery === '' ||
        center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.state.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesRegion && matchesSearch;
    });
  }, [centers, selectedRegion, searchQuery]);

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = { All: centers.length };
    centers.forEach((c) => {
      counts[c.region] = (counts[c.region] || 0) + 1;
    });
    return counts;
  }, [centers]);

  return (
    <>
      <PageBanner
        title="Find a Training Center"
        subtitle="Locate mass timber training facilities near you"
        backgroundImage="/images/construction-wide.png"
        images={slideshowImages.trainingCenters}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Training', href: '/training' }, { label: 'Find a Training Center' }]}
      />

      {/* Map Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <GradientOrb color="forest" size="lg" speed="slow" className="-right-20 top-10 opacity-10" />
        <Container>
          <SectionHeading
            eyebrow="Locations"
            title="Training Centers Across North America"
            align="center"
          />

          {/* Interactive Map Visualization */}
          <div className="mt-12 mb-16">
            <GlassPanel>
              <div className="relative">
                {/* Region selector as map */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {regions.filter(r => r !== 'All').map((region) => (
                    <button
                      key={region}
                      onClick={() => setSelectedRegion(region === selectedRegion ? 'All' : region)}
                      className={`relative p-6 rounded-xl border-2 transition-all duration-200 text-center ${
                        selectedRegion === region
                          ? 'border-amber-500 bg-amber-500/10'
                          : 'border-charcoal-900/10 hover:border-amber-500/50 hover:bg-amber-500/5'
                      }`}
                    >
                      <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-forest-500/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-forest-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <h3 className="font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 text-sm">{region}</h3>
                      <p className="text-xs text-charcoal-950/50 mt-1">
                        {regionCounts[region] || 0} {(regionCounts[region] || 0) === 1 ? 'center' : 'centers'}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </GlassPanel>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal-950/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, city, or state..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl glass-light border border-charcoal-900/10 text-charcoal-950 placeholder-charcoal-950/40 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    selectedRegion === region
                      ? 'bg-amber-500 text-white'
                      : 'bg-charcoal-900/5 text-charcoal-950/60 hover:bg-charcoal-900/10'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-charcoal-950/50 mb-6">
            Showing {filteredCenters.length} of {centers.length} training centers
          </p>

          {/* Training Center Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCenters.map((center) => (
              <GlassCard key={center.id} padding="lg" hover>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950">
                      {center.name}
                    </h3>
                    <p className="text-sm text-charcoal-950/60 flex items-center gap-1 mt-1">
                      <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {center.city}, {center.state}
                    </p>
                  </div>
                  <Badge variant="category">{center.region}</Badge>
                </div>

                <p className="text-sm text-charcoal-950/60 mb-2">{center.address}</p>
                <p className="text-sm text-charcoal-950/60 mb-4 flex items-center gap-1">
                  <svg className="w-4 h-4 text-forest-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {center.phone}
                </p>

                {center.courses && center.courses.length > 0 && (
                  <div className="border-t border-charcoal-900/10 pt-4">
                    <p className="text-xs font-semibold text-charcoal-950/80 mb-2 uppercase tracking-wider">Available Courses</p>
                    <div className="flex flex-wrap gap-2">
                      {center.courses.map((course) => (
                        <span key={course} className="text-xs px-2 py-1 rounded-md bg-forest-500/10 text-forest-500 font-medium">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </GlassCard>
            ))}
          </div>

          {filteredCenters.length === 0 && (
            <div className="text-center py-16">
              <svg className="w-16 h-16 mx-auto mb-4 text-charcoal-950/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-lg font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-2">No Centers Found</h3>
              <p className="text-charcoal-950/60">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-charcoal-950">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-jakarta)] text-cream mb-4">
              Don&apos;t See a Center Near You?
            </h2>
            <p className="text-cream/60 mb-8">
              We&apos;re continually expanding our network of training facilities. Contact us to discuss training options in your area.
            </p>
            <Button variant="primary" href="/contact">Contact Us</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
