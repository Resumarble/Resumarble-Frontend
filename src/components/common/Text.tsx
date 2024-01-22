import React from 'react';

type Props = {
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
  children: React.ReactNode;
};

export default function Text({
  className,
  children,
  as: Component = 'span',
}: Props) {
  return <Component className={className}>{children}</Component>;
}
