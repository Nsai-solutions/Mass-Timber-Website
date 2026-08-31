import Image from 'next/image';
import { GlassCard } from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { isRotatedImage, getImageRotation, cn } from '@/lib/utils';
import type { Contractor } from '@/types';

interface ContractorCardProps {
  contractor: Contractor;
}

export function ContractorCard({ contractor }: ContractorCardProps) {
  return (
    <GlassCard hover padding="none" className="h-full flex flex-col">
      <div className={cn(
        'relative h-48 overflow-hidden flex items-center justify-center shrink-0',
        contractor.logo ? (contractor.logoOnDark ? 'bg-charcoal-950 p-6' : 'bg-cream p-6') : 'bg-charcoal-900/5'
      )}>
        {contractor.logo ? (
          <Image
            src={contractor.logo}
            alt={`${contractor.name} logo`}
            fill
            className="object-contain p-6"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : contractor.image ? (
          <div className={cn('absolute', isRotatedImage(contractor.image) ? 'inset-[-50%] w-[200%] h-[200%]' : 'inset-0')}>
            <Image
              src={contractor.image}
              alt={contractor.name}
              fill
              className={cn('object-cover', getImageRotation(contractor.image))}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ) : (
          <svg className="w-12 h-12 text-charcoal-900/20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
        )}
        {contractor.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex gap-2 z-10">
            {contractor.badges.map((badge) => (
              <Badge key={badge} variant={badge}>{badge}</Badge>
            ))}
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold font-[family-name:var(--font-jakarta)] text-charcoal-950 mb-1">
          {contractor.name}
        </h3>
        {contractor.address && (
          <p className="flex items-start gap-2 text-sm text-charcoal-950/60 mb-1">
            <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {contractor.address}
          </p>
        )}
        {contractor.phone && (
          <p className="flex items-center gap-2 text-sm text-charcoal-950/60 mb-1">
            <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            {contractor.phone}
          </p>
        )}
        {contractor.website && (
          <p className="flex items-center gap-2 text-sm mb-4">
            <svg className="w-4 h-4 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
            <a href={contractor.website} target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:text-amber-600 transition-colors truncate">
              {contractor.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}
            </a>
          </p>
        )}
        <div className="mt-auto pt-4">
          <Button variant="outline" size="sm" href={`/contractors/${contractor.slug}`} className="w-full">
            Details
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}
