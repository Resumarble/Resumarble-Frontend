import React from 'react';

type Props = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
  children: React.ReactNode;
};

export default function Title({ children, as: Component = 'span' }: Props) {
  return <Component>{children}</Component>;
}
