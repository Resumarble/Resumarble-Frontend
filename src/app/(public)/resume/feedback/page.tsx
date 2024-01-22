'use client';

import React from 'react';
import Container from '@/components/common/Container';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button';

export default function FeedbackPage() {
  const router = useRouter();

  return (
    <Container>
      <p>준비중입니다. </p>
      <br />
      <Button
        label='이전으로'
        onClick={() => {
          router.back();
        }}
      ></Button>
    </Container>
  );
}
