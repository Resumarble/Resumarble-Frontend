import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'CREATE',
};

type Props = {
  children: React.ReactNode;
};

export default function ResumeLayout({ children }: Props) {
  return <>{children}</>;
}
