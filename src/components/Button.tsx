import React from 'react';

// Every call to action on the page uses this, so size, radius and icon spacing always match.
type Props = {
  href?: string;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'sm';
  icon?: React.ReactNode;
  disabled?: boolean;
  external?: boolean;
  children: React.ReactNode;
};

export const Button: React.FC<Props> = ({
  href, variant = 'primary', size = 'md', icon, disabled, external, children,
}) => {
  const cls = `btn btn-${variant} btn-${size}`;
  if (disabled || !href) {
    return (
      <button type="button" className={cls} disabled>
        {icon}
        <span>{children}</span>
      </button>
    );
  }
  return (
    <a className={cls} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {icon}
      <span>{children}</span>
    </a>
  );
};

export const Petal: React.FC<{ color: string; size?: number }> = ({ color, size = 12 }) => (
  <span
    aria-hidden="true"
    className="inline-block shrink-0 rounded-full"
    style={{ width: size * 0.62, height: size, background: color, transform: 'rotate(14deg)' }}
  />
);
