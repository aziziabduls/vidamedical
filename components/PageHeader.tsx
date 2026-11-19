'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { fadeUpVariants } from '@/lib/motion';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  eyebrow: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
}

export default function PageHeader({
  breadcrumbs,
  eyebrow,
  title,
  description,
  actions,
}: PageHeaderProps) {
  return (
    <section className="bg-white border-b border-slate-200/80 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-6">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={crumb.label}>
                {idx > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={1.5} />
                )}
                {crumb.href && !isLast ? (
                  <Link href={crumb.href} className="hover:text-[#0472B5] transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#0B2545] font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            );
          })}
        </nav>

        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 text-xs font-medium text-[#0472B5] mb-2">
              <span>{eyebrow}</span>
              <span className="w-10 h-px bg-[#0472B5]/35" aria-hidden="true" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-semibold text-[#0B2545] tracking-[-0.02em] leading-[1.15]">
              {title}
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-[60ch]">
              {description}
            </p>
          </div>

          {actions && <div className="shrink-0 flex flex-wrap items-center gap-3">{actions}</div>}
        </motion.div>
      </div>
    </section>
  );
}
