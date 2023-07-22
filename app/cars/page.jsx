'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';

export default function SearchBar() {
  const searchParams = useSearchParams();

  const id = searchParams.get('id');

  return <>{id}</>;
}

