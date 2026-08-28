'use client';

import { Container } from '@/components/ui/Container';
import { TabGroup } from '@/components/ui/TabGroup';
import { SearchFilter } from '@/components/ui/SearchFilter';
import { ContractorCard } from '@/components/cards/ContractorCard';
import { useSearch } from '@/hooks/useSearch';
import contractorsData from '@/data/contractors.json';
import type { Contractor } from '@/types';

const tabs = [
  { label: 'Contractors', value: 'contractors', href: '/contractors' },
  { label: 'Projects', value: 'projects', href: '/projects' },
  { label: 'Suppliers and Manufacturers', value: 'suppliers', href: '/suppliers' },
];

const categories = ['Mass Timber'];
const locations = ['California', 'Colorado', 'Connecticut', 'Florida', 'Georgia', 'Illinois', 'Iowa', 'Maine', 'Maryland', 'Michigan', 'Minnesota', 'Missouri', 'Newfoundland and Labrador', 'Ohio', 'Ontario', 'Oregon', 'Pennsylvania', 'Saskatchewan', 'Texas', 'Washington'];

export function ContractorsDirectory() {
  const contractors = contractorsData as Contractor[];
  const { filteredItems, query, setQuery, category, setCategory, location, setLocation, sortBy, setSortBy } = useSearch({
    items: contractors,
    searchFields: ['name', 'description', 'address'],
    categoryField: 'categories',
    locationField: 'location',
  });

  return (
    <section className="py-12 md:py-16">
      <Container>
        <TabGroup tabs={tabs} activeTab="contractors" className="mb-8" />
        <SearchFilter query={query} onQueryChange={setQuery} categories={categories} category={category} onCategoryChange={setCategory} locations={locations} location={location} onLocationChange={setLocation} sortBy={sortBy} onSortChange={setSortBy} className="mb-8" />
        <p className="text-sm text-charcoal-950/50 mb-6">Showing {filteredItems.length} of {contractors.length} contractors</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((contractor) => (
            <ContractorCard key={contractor.id} contractor={contractor} />
          ))}
        </div>
        {filteredItems.length === 0 && (
          <div className="text-center py-16 glass-light rounded-xl">
            <svg className="w-12 h-12 text-charcoal-900/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <p className="text-charcoal-950/50">No contractors found matching your criteria.</p>
          </div>
        )}
      </Container>
    </section>
  );
}
