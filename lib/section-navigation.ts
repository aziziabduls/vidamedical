export const SECTION_SELECT_EVENT = 'vida:section-select';

export interface SectionSelectDetail {
  coe?: string | null;
  layanan?: string | null;
}

/** Reads section selection query parameters from the current browser URL. */
export function getSectionSelectionFromLocation(): SectionSelectDetail {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  return {
    coe: params.get('coe'),
    layanan: params.get('layanan'),
  };
}

/**
 * Handles in-page navigation to a homepage section or top of page,
 * synchronizing URL state, active section tabs, and smooth scroll offset.
 */
export function scrollToHomeHref(href: string) {
  if (typeof window === 'undefined') return;

  const url = new URL(href, window.location.origin);
  const coe = url.searchParams.get('coe');
  const layanan = url.searchParams.get('layanan');
  const targetId = url.hash ? decodeURIComponent(url.hash.slice(1)) : '';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior: ScrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

  const nextRelativeUrl = `${url.pathname}${url.search}${url.hash}`;
  const currentRelativeUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (nextRelativeUrl !== currentRelativeUrl) {
    window.history.pushState(null, '', nextRelativeUrl);
  }

  if (coe || layanan) {
    window.dispatchEvent(
      new CustomEvent<SectionSelectDetail>(SECTION_SELECT_EVENT, {
        detail: { coe, layanan },
      })
    );
  }

  if (!targetId) {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  requestAnimationFrame(() => {
    const target = document.getElementById(targetId);
    target?.scrollIntoView({ behavior, block: 'start' });
  });
}

