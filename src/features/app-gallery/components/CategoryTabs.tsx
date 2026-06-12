import { CircularProgress, Stack } from '@mui/material';

import { SectionStatusBadge } from '@/components/reference-status';
import { CategoryButton } from '@/features/app-gallery/components/AppGalleryPrimitives';
import { appGallerySectionStatus } from '@/features/app-gallery/sectionStatus';

type CategoryTabsProps = {
  activeCategory: string;
  categories: Array<{ count: number; id: string; label: string }>;
  isLoading: boolean;
  onCategoryChange: (category: string) => void;
};

export function CategoryTabs({
  activeCategory,
  categories,
  isLoading,
  onCategoryChange,
}: CategoryTabsProps) {
  if (isLoading && categories.length === 0) {
    return <CircularProgress size={22} />;
  }

  return (
    <Stack aria-label="App categories" direction="row" flexWrap="wrap" gap={1} sx={{ mt: 1 }}>
      <SectionStatusBadge status={appGallerySectionStatus.categoryTabs} />
      {categories.map((category) => {
        const active = activeCategory === category.id;

        return (
          <CategoryButton
            active={active}
            aria-pressed={active}
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            type="button"
          >
            {category.label}
          </CategoryButton>
        );
      })}
    </Stack>
  );
}
