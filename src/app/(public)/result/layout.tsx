import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'RESULT',
};

type Props = {
  children: React.ReactNode;
};

export default function ResultLayout({ children }: Props) {
  return <>{children}</>;
}
