import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { PageBanner } from '@/components/layout/PageBanner';
import { Container } from '@/components/ui/Container';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { GradientOrb } from '@/components/ui/GradientOrb';
import { ProjectGallery } from '@/components/ui/ProjectGallery';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion';
import { getImageClasses } from '@/lib/utils';
import { slideshowImages } from '@/data/slideshow-images';
import projectsData from '@/data/projects.json';
import type { Project } from '@/types';

const projects = projectsData as Project[];

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = projects.find((p) => p.slug === slug);
    return {
      title: project?.name || 'Project',
      description: project?.description || (project ? `${project.name} - Mass Timber Project in ${project.location}` : ''),
    };
  });
}

function AwardBadge({ award }: { award: 'winner' | 'submitted' }) {
  if (award === 'winner') {
    return (
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg shadow-amber-500/25">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
        Project of the Year Winner
      </div>
    );
  }
  return (
    <div className="inline-flex items-center gap-2 bg-charcoal-900/10 text-charcoal-950 px-4 py-2 rounded-full text-sm font-semibold">
      <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
      Project of the Year Nominee
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-semibold text-charcoal-950">{label}</p>
      <p className="text-sm text-charcoal-950/60 mt-1">{value}</p>
    </div>
  );
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return notFound();

  const hasGallery = project.gallery && project.gallery.length > 1;

  return (
    <>
      <PageBanner
        title={project.name}
        subtitle={project.location}
        backgroundImage={project.image || '/images/construction-wide.png'}
        images={slideshowImages.default}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Projects', href: '/projects' },
          { label: project.name },
        ]}
      />

      <section className="py-16 md:py-24 relative overflow-hidden">
        <GradientOrb color="forest" size="lg" speed="slow" className="-left-40 top-20 opacity-15" />

        <Container>
          {/* Award badge */}
          {project.award && (
            <ScrollReveal className="mb-8">
              <AwardBadge award={project.award} />
            </ScrollReveal>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image / Gallery */}
              <ScrollReveal>
                {hasGallery ? (
                  <ProjectGallery images={project.gallery!} projectName={project.name} />
                ) : (
                  <div className="relative h-[420px] md:h-[600px] lg:h-[680px] rounded-2xl overflow-hidden glass-light">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className={`object-cover ${getImageClasses(project.image)}`}
                        sizes="(max-width: 1024px) 100vw, 66vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-charcoal-900/5">
                        <svg className="w-20 h-20 text-charcoal-900/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                      </div>
                    )}
                  </div>
                )}
              </ScrollReveal>

              {/* Description */}
              <ScrollReveal>
                <GlassPanel>
                  <h2 className="text-2xl font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-4">Project Overview</h2>
                  <p className="text-charcoal-950/70 leading-relaxed">
                    {project.description || `${project.name} is a ${project.category.toLowerCase()} mass timber project located in ${project.location}. This project showcases the capabilities of Ironworker-led mass timber construction, combining engineered wood products with steel connections for a modern, sustainable structural system.`}
                  </p>
                </GlassPanel>
              </ScrollReveal>

              {/* Scope of Work */}
              {project.scope && (
                <ScrollReveal>
                  <GlassPanel>
                    <h2 className="text-2xl font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-4">Scope of Work</h2>
                    <p className="text-charcoal-950/70 leading-relaxed">{project.scope}</p>
                  </GlassPanel>
                </ScrollReveal>
              )}

              {/* Challenges & Innovations */}
              {(project.challenges || project.innovations) && (
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.challenges && (
                    <StaggerItem>
                      <GlassPanel className="h-full">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                          </div>
                          <h3 className="text-lg font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950">Challenges Overcome</h3>
                        </div>
                        <p className="text-charcoal-950/70 leading-relaxed text-sm">{project.challenges}</p>
                      </GlassPanel>
                    </StaggerItem>
                  )}
                  {project.innovations && (
                    <StaggerItem>
                      <GlassPanel className="h-full">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 rounded-xl bg-forest-500/10 flex items-center justify-center">
                            <svg className="w-5 h-5 text-forest-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                          </div>
                          <h3 className="text-lg font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950">Innovation</h3>
                        </div>
                        <p className="text-charcoal-950/70 leading-relaxed text-sm">{project.innovations}</p>
                      </GlassPanel>
                    </StaggerItem>
                  )}
                </StaggerContainer>
              )}

              {/* Safety */}
              {project.safety && (
                <ScrollReveal>
                  <GlassPanel>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-forest-500/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-forest-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                      </div>
                      <h3 className="text-lg font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950">Safety Performance</h3>
                    </div>
                    <p className="text-charcoal-950/70 leading-relaxed text-sm">{project.safety}</p>
                  </GlassPanel>
                </ScrollReveal>
              )}

            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ScrollReveal direction="right">
                <GlassCard padding="lg">
                  <h3 className="text-lg font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-4">Project Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-charcoal-950">Category</p>
                      <Badge variant="category" className="mt-1">{project.category}</Badge>
                    </div>
                    <StatItem label="Location" value={project.location} />
                    {project.owner && <StatItem label="Owner" value={project.owner} />}
                    {project.contractor && <StatItem label="Contractor" value={project.contractor} />}
                    {project.generalContractor && <StatItem label="General Contractor" value={project.generalContractor} />}
                    {project.ironworkerHours && (
                      <StatItem label="Ironworker Hours" value={project.ironworkerHours.toLocaleString()} />
                    )}
                    {project.sqft && <StatItem label="Square Footage" value={project.sqft} />}
                    {project.localUnion && <StatItem label="Local Union" value={project.localUnion} />}
                    {!project.owner && (
                      <>
                        <StatItem label="Structure Type" value="Mass Timber" />
                        <StatItem label="Construction Method" value="Ironworker-Led Erection" />
                      </>
                    )}
                  </div>
                </GlassCard>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.1}>
                <Button variant="primary" size="lg" href="/contact" className="w-full">
                  Inquire About This Project
                </Button>
              </ScrollReveal>
              <ScrollReveal direction="right" delay={0.2}>
                <Button variant="outline" size="md" href="/projects" className="w-full">
                  Back to All Projects
                </Button>
              </ScrollReveal>

              {project.slug === 'walmart-home-office-campus' && (
                <ScrollReveal direction="right" delay={0.3}>
                  <a
                    href="https://www.youtube.com/watch?v=pdJYsWFq-MQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <GlassCard padding="md" hover>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-charcoal-950/50 mb-0.5">Related Watch</p>
                          <p className="text-sm font-semibold text-charcoal-950 leading-snug">Composite-crew mass timber on Ascent, Milwaukee</p>
                        </div>
                      </div>
                    </GlassCard>
                  </a>
                </ScrollReveal>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
