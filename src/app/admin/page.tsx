'use client';

import Link from 'next/link';
import {
  Users, Building2, FileText, GraduationCap, Package,
  HelpCircle, MessageCircle, MapPin, Settings
} from 'lucide-react';

const contentSections = [
  { label: 'Leadership', href: '/admin/leadership', icon: Users, description: 'Manage leadership team members, bios, and photos', count: 29 },
  { label: 'Contractors', href: '/admin/contractors', icon: Building2, description: 'Manage contractor profiles, locations, and ratings', count: 18 },
  { label: 'Projects', href: '/admin/projects', icon: FileText, description: 'Manage project listings, galleries, and awards', count: 13 },
  { label: 'Training Centers', href: '/admin/training-centers', icon: GraduationCap, description: 'Manage training facilities, courses, and contacts', count: 118 },
  { label: 'Suppliers', href: '/admin/suppliers', icon: Package, description: 'Manage supplier and manufacturer profiles', count: 4 },
  { label: 'FAQ', href: '/admin/faq', icon: HelpCircle, description: 'Manage frequently asked questions', count: 6 },
  { label: 'Testimonials', href: '/admin/testimonials', icon: MessageCircle, description: 'Manage partner testimonials and quotes', count: 2 },
  { label: 'Locations', href: '/admin/locations', icon: MapPin, description: 'Manage office locations and contact info', count: 4 },
  { label: 'Site Settings', href: '/admin/settings', icon: Settings, description: 'Contact info, social links, site name, business hours' },
];

export default function AdminDashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-cream font-[family-name:var(--font-jakarta)]">Dashboard</h1>
        <p className="text-cream/50 text-sm mt-1">Manage all site content from here. Changes go live after a short deploy (~2-3 min).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contentSections.map((section) => {
          const Icon = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="group bg-[#1E3A2A] border border-white/[0.06] rounded-xl p-5 hover:border-amber-500/30 hover:bg-[#1E3A2A]/80 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 transition-colors shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-cream font-[family-name:var(--font-jakarta)]">{section.label}</h3>
                    {section.count && (
                      <span className="text-xs text-cream/40 bg-white/5 px-2 py-0.5 rounded-full">{section.count}</span>
                    )}
                  </div>
                  <p className="text-xs text-cream/40 mt-1 leading-relaxed">{section.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
