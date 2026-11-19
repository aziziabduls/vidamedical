'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { CLINIC_CONTACT } from '@/lib/clinic-data';
import { fadeUpVariants, TRANSITIONS, VIEWPORT_ONCE } from '@/lib/motion';

interface CTABannerProps {
  title?: string;
  buttonLabel?: string;
}

export default function CTABanner({
  title = 'Siap menjaga kesehatan Anda?',
  buttonLabel = 'Hubungi Kami',
}: CTABannerProps) {
  return (
    <section className="py-10 sm:py-12 bg-[#F6F9FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="relative overflow-hidden rounded-2xl bg-[#EBF4FB] border border-[#0472B5]/12 px-6 py-7 sm:px-10 sm:py-8 shadow-[0_1px_2px_rgba(11,37,69,0.04)]"
        >
          {/* Subtle architectural curve accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/45"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-12 -bottom-20 w-56 h-56 rounded-full bg-[#0472B5]/[0.05]"
          />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5">
            <h2 className="text-xl sm:text-2xl font-semibold text-[#0B2545] tracking-tight text-center sm:text-left">
              {title}
            </h2>

            <motion.a
              whileTap={{ scale: 0.98 }}
              transition={TRANSITIONS.fast}
              href={CLINIC_CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#0472B5] hover:bg-[#035c93] text-white font-medium text-sm shadow-xs transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0472B5]"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
              <span>{buttonLabel}</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
