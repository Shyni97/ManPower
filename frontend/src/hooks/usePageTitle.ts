/**
 * usePageTitle Hook
 * Updates the document title for client-side pages
 */

import { useEffect } from 'react';

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
