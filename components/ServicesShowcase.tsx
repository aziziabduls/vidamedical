'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Syringe, Stethoscope, Droplets, Home } from 'lucide-react';
import { CORE_SERVICES, type ServiceSummaryItem } from '@/lib/clinic-data';
import {
  staggerContainerVariants,
  staggerItemVariants,
  VIEWPORT_ONCE,
} from '@/lib/motion';

const SERVICE_ICONS: Record<ServiceSummaryItem['id'], React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  vaksinasi: Syringe,
  'medical-check-up': Stethoscope,
  'vitamin-booster': Droplets,
  'home-care': Home,
};

interface ServicesShowcaseProps {
  showHeader?: boolean;
}

export default function ServicesShowcase({ showHeader = true }: ServicesShowcaseProps) {
  return (
    <section className="py-12 sm:py-16 bg-[#F6F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="max-w-2xl mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-3 text-xs font-medium text-[#0472B5] mb-2">
              <span>Apa yang kami lakukan</span>
              <span className="w-12 h-px bg-[#0472B5]/35" aria-hidden="true" />
            </div>

            <h2 className="text-2xl sm:text-4xl font-semibold text-[#0B2545] tracking-[-0.02em] leading-tight">
              Layanan untuk Setiap Kebutuhan Anda
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Berbagai layanan kesehatan yang dirancang untuk menjaga Anda dan keluarga tetap sehat, aktif, dan terlindungi.
            </p>
          </div>
        )}

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
        >
          {CORE_SERVICES.map((service) => {
            const Icon = SERVICE_ICONS[service.id];
            return (
              <motion.article
                key={service.id}
                variants={staggerItemVariants}
                className="group bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_2px_rgba(11,37,69,0.04)] hover:border-[#0472B5]/35 hover:shadow-[0_8px_24px_rgba(11,37,69,0.06)] transition-colors flex flex-col overflow-hidden"
              >
                {/* 4:3 Service Photo */}
                <div className="relative aspect-[4/3] w-full bg-[#EBF4FB] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="w-9 h-9 rounded-xl bg-[#EBF4FB] text-[#0472B5] flex items-center justify-center shrink-0">
                        <Icon className="w-[18px] h-[18px]" strokeWidth={1.5} />
                      </span>
                      <h3 className="text-base font-semibold text-[#0B2545] leading-snug">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <Link
                      href={service.href}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0472B5] hover:text-[#035c93] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0472B5] rounded-sm"
                    >
                      <span>Lihat Detail</span>
                      <ArrowRight
                        className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                        strokeWidth={1.5}
                      />
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
