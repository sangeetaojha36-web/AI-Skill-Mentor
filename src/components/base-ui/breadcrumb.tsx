import React from 'react';
import { ChevronRight, MoreHorizontal } from 'lucide-react';

export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<'nav'> {
  separator?: React.ReactNode;
}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className = '', ...props }, ref) => (
    <nav
      ref={ref}
      aria-label="breadcrumb"
      className={`relative ${className}`}
      {...props}
    />
  )
);
Breadcrumb.displayName = 'Breadcrumb';

export interface BreadcrumbListProps extends React.ComponentPropsWithoutRef<'ol'> {}

export const BreadcrumbList = React.forwardRef<HTMLOListElement, BreadcrumbListProps>(
  ({ className = '', ...props }, ref) => (
    <ol
      ref={ref}
      className={`flex flex-wrap items-center gap-1.5 break-words text-xs text-slate-300 sm:gap-2 ${className}`}
      {...props}
    />
  )
);
BreadcrumbList.displayName = 'BreadcrumbList';

export interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<'li'> {}

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className = '', ...props }, ref) => (
    <li
      ref={ref}
      className={`inline-flex items-center gap-1.5 sm:gap-2 ${className}`}
      {...props}
    />
  )
);
BreadcrumbItem.displayName = 'BreadcrumbItem';

export interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<'a'> {
  asButton?: boolean;
}

export const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, BreadcrumbLinkProps>(
  ({ className = '', href, onClick, children, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onClick) {
        if (!href || href === '#') {
          e.preventDefault();
        }
        onClick(e);
      }
    };

    return (
      <a
        ref={ref}
        href={href || '#'}
        onClick={handleClick}
        className={`transition-colors text-slate-400 hover:text-[#FEC163] hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FEC163] cursor-pointer inline-flex items-center gap-1 font-medium ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  }
);
BreadcrumbLink.displayName = 'BreadcrumbLink';

export interface BreadcrumbPageProps extends React.ComponentPropsWithoutRef<'span'> {}

export const BreadcrumbPage = React.forwardRef<HTMLSpanElement, BreadcrumbPageProps>(
  ({ className = '', ...props }, ref) => (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={`font-semibold text-white tracking-wide truncate max-w-[200px] sm:max-w-none inline-flex items-center gap-1 ${className}`}
      {...props}
    />
  )
);
BreadcrumbPage.displayName = 'BreadcrumbPage';

export interface BreadcrumbSeparatorProps extends React.ComponentPropsWithoutRef<'li'> {}

export const BreadcrumbSeparator = ({
  children,
  className = '',
  ...props
}: BreadcrumbSeparatorProps) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={`text-slate-600 [&>svg]:size-3.5 ${className}`}
    {...props}
  >
    {children ?? <ChevronRight className="h-3.5 w-3.5 text-slate-500" />}
  </li>
);
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

export const BreadcrumbEllipsis = ({
  className = '',
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={`flex h-6 w-6 items-center justify-center text-slate-500 ${className}`}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
);
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

export type BreadcrumbSegment =
  | {
      label: string;
      href?: string;
      onClick?: () => void;
      current?: false;
      icon?: React.ReactNode;
      badge?: string;
    }
  | {
      label: string;
      current: true;
      href?: never;
      onClick?: never;
      icon?: React.ReactNode;
      badge?: string;
    };

const sampleSegments: readonly BreadcrumbSegment[] = [
  { label: 'Dashboard', href: '#' },
  { label: 'Campaigns', href: '#' },
  { label: 'Spring Launch', current: true },
] as const;

export const Breadcrumb1: React.FC<{
  segments?: readonly BreadcrumbSegment[];
  className?: string;
  onNavigate?: (href?: string, label?: string) => void;
}> = ({ segments = sampleSegments, className = '', onNavigate }) => {
  return (
    <Breadcrumb className={className}>
      <BreadcrumbList className="border-border/70 bg-background w-full max-w-full justify-center rounded-2xl border px-2 py-1.5 shadow-sm sm:w-fit sm:justify-start sm:rounded-full sm:px-3">
        {segments.map((segment, index) => (
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
                {segment.icon && <span className="shrink-0">{segment.icon}</span>}
                <span>{segment.label}</span>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>
                {segment.icon && <span className="shrink-0">{segment.icon}</span>}
                <span>{segment.label}</span>
                {segment.badge && (
                  <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-[#FEC163]/20 text-[#FEC163] border border-[#FEC163]/30">
                    {segment.badge}
                  </span>
                )}
              </BreadcrumbPage>
            )}
            {index < segments.length - 1 ? <BreadcrumbSeparator /> : null}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumb1;
