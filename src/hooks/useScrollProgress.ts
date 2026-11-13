import { useStore } from '@/store/useStore';
import { sectionRanges } from '@/content/site';

export function useScrollProgress() {
  const scroll = useStore((state) => state.scroll);
  const activeSection = useStore((state) => state.activeSection);

  // Return progress normalized within a specific section (0 to 1)
  const getSectionProgress = (sectionId: string) => {
    const range = sectionRanges.find((r) => r.id === sectionId);
    if (!range) return 0;
    if (scroll < range.start) return 0;
    if (scroll > range.end) return 1;
    return (scroll - range.start) / (range.end - range.start);
  };

  return { scroll, activeSection, getSectionProgress };
}
