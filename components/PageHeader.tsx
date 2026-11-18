'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  eyebrow: string;
  eyebrowIcon?: React.ReactNode;
  title: string;
  description: string;
  aside?: React.ReactNode;
  children?: React.ReactNode;
}

export default function PageHeader({
  breadcrumbs,
  eyebrow,
  eyebrowIcon,
  title,
  description,
  aside,
  children,
}: PageHeaderProps) {
  return (
    <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-6"
        >
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={`${crumb.label}-${idx}`}>
                {idx > 0 && (
                  <ChevronRight
                    className="w-3.5 h-3.5 text-slate-400 shrink-0"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                )}
                {crumb.href && !isLast ? (
                  <Link href={crumb.href} className="hover:text-[#0472B5] transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-800 font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 pl-3 border-l-2 border-[#0472B5] text-xs font-medium text-slate-600 mb-3">
              {eyebrowIcon}
              <span>{eyebrow}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              {title}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              {description}
            </p>
          </div>

          {aside && <div className="shrink-0">{aside}</div>}
        </div>

        {children}
      </div>
    </section>
  );
}
