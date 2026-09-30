import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/layout/PageBanner';
import { Container } from '@/components/ui/Container';
import { GlassCard } from '@/components/ui/GlassCard';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GradientOrb } from '@/components/ui/GradientOrb';
import { isRotatedImage, getImageRotation, cn } from '@/lib/utils';
import { slideshowImages } from '@/data/slideshow-images';
import contractorsData from '@/data/contractors.json';
import { projectsForContractor } from '@/lib/contractor-projects';
import { ProjectCard } from '@/components/cards/ProjectCard';
import type { Contractor } from '@/types';

const contractors = contractorsData as Contractor[];

export function generateStaticParams() {
  return contractors.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const contractor = contractors.find((c) => c.slug === slug);
    return {
      title: contractor?.name || 'Contractor',
      description: contractor ? `${contractor.name} - Mass Timber Contractor${contractor.address ? ` located at ${contractor.address}` : ''}` : '',
    };
  });
}

export default async function ContractorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const contractor = contractors.find((c) => c.slug === slug);

  if (!contractor) return notFound();

  const contractorProjects = projectsForContractor(contractor);

  return (
    <>
      <PageBanner
        title={contractor.name}
        subtitle="Mass Timber Contractor"
        backgroundImage={contractor.image || '/images/workers-installing.png'}
        images={slideshowImages.default}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contractors', href: '/contractors' },
          { label: contractor.name },
        ]}
      />

      <section className="py-16 md:py-24 relative overflow-hidden">
        <GradientOrb color="amber" size="lg" speed="slow" className="-right-40 top-10 opacity-15" />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image */}
              <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden glass-light">
                {contractor.image ? (
                  <div className={cn('absolute', isRotatedImage(contractor.image) ? 'inset-[-50%] w-[200%] h-[200%]' : 'inset-0')}>
                    <Image
                      src={contractor.image}
                      alt={contractor.name}
                      fill
                      className={cn('object-cover', getImageRotation(contractor.image))}
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-charcoal-900/5">
                    <svg className="w-20 h-20 text-charcoal-900/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </div>
                )}
              </div>

              {/* About */}
              <GlassPanel>
                <h2 className="text-2xl font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-4">About {contractor.name}</h2>
                {contractor.description ? (
                  <p className="text-charcoal-950/70 leading-relaxed">{contractor.description}</p>
                ) : (
                  <p className="text-charcoal-950/70 leading-relaxed">
                    {contractor.name} is a signatory Ironworker contractor specializing in mass timber construction. With expertise in structural erection, CLT installation, and steel-to-timber connections, they bring precision craftsmanship to every project. Their skilled ironworker workforce ensures safety, quality, and on-time delivery across North America.
                  </p>
                )}
              </GlassPanel>

              {/* Services — scope of work from the IMPACT signatory contractor data */}
              {(contractor.services?.length ?? 0) > 0 && (
                <GlassPanel>
                  <h2 className="text-2xl font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-6">Scope of Work</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {contractor.services!.map((service) => (
                      <div key={service} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        </div>
                        <span className="text-charcoal-950/70">{service}</span>
                      </div>
                    ))}
                  </div>
                </GlassPanel>
              )}

              {/* Projects by this contractor */}
              {contractorProjects.length > 0 && (
                <GlassPanel>
                  <h2 className="text-2xl font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-6">
                    Mass Timber Projects
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {contractorProjects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </GlassPanel>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <GlassCard padding="lg">
                <h3 className="text-lg font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-4">Contact Info</h3>

                {contractor.badges.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {contractor.badges.map((badge) => (
                      <Badge key={badge} variant={badge}>{badge}</Badge>
                    ))}
                  </div>
                )}


                <div className="space-y-3">
                  {contractor.address && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      <div>
                        <p className="text-sm font-semibold text-charcoal-950">Address</p>
                        <p className="text-sm text-charcoal-950/60">{contractor.address}</p>
                      </div>
                    </div>
                  )}
                  {contractor.phone && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      <div>
                        <p className="text-sm font-semibold text-charcoal-950">Phone</p>
                        <a href={`tel:${contractor.phone.replace(/[^+\d]/g, '')}`} className="text-sm text-amber-500 hover:text-amber-600 transition-colors">{contractor.phone}</a>
                      </div>
                    </div>
                  )}
                  {contractor.website && (
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                      <div>
                        <p className="text-sm font-semibold text-charcoal-950">Website</p>
                        <a href={contractor.website} target="_blank" rel="noopener noreferrer" className="text-sm text-amber-500 hover:text-amber-600 transition-colors break-all">{contractor.website.replace(/^https?:\/\//, '')}</a>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                    <div>
                      <p className="text-sm font-semibold text-charcoal-950">Categories</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {contractor.categories.map((cat) => (
                          <Badge key={cat} variant="category">{cat}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <Button variant="primary" size="lg" href="/contact" className="w-full">
                Request a Quote
              </Button>
              <Button variant="outline" size="md" href="/contractors" className="w-full">
                Back to All Contractors
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
