import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  type BreadcrumbSegment
} from '@/components/base-ui/breadcrumb';

const segments: readonly BreadcrumbSegment[] = [
  { label: 'Dashboard', href: '#' },
  { label: 'Campaigns', href: '#' },
  { label: 'Spring Launch', current: true },
] as const;

export const Breadcrumb1: React.FC<{
  segments?: readonly BreadcrumbSegment[];
  className?: string;
  onNavigate?: (href?: string, label?: string) => void;
}> = ({ segments: customSegments = segments, className = '', onNavigate }) => {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="border-border/70 bg-background w-full max-w-full justify-center rounded-2xl border px-2 py-1.5 shadow-sm sm:w-fit sm:justify-start sm:rounded-full sm:px-3">
        {customSegments.map((segment, index) => (
          <BreadcrumbItem key={segment.label}>
            {'href' in segment || 'onClick' in segment ? (
              <BreadcrumbLink
                href={'href' in segment ? segment.href : '#'}
                onClick={() => {
                  if ('onClick' in segment && segment.onClick) {
                    segment.onClick();
                  } else if (onNavigate && 'href' in segment) {
                    onNavigate(segment.href, segment.label);
                  }
                }}
              >
                {segment.label}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{segment.label}</BreadcrumbPage>
            )}
            {index < customSegments.length - 1 ? <BreadcrumbSeparator /> : null}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumb1;
