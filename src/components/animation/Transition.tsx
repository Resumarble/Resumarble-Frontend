'use client';
import React, { useEffect, useState } from 'react';

type Props = {
  delay?: number;
  animation: 'move' | 'show' | 'lazy-show';
  children: React.ReactElement;
};

export default function Transition({ animation, children, delay = 0 }: Props) {
  const [child, setChild] = useState<React.ReactElement>(children);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newChildren = React.cloneElement(children, {
        className: `${children.props.className} ${animation}`,
      });

      setChild(newChildren);
    }, delay * 1_000);

    return () => clearTimeout(timer);
  }, [animation, delay, children]);

  return <>{child}</>;
}
