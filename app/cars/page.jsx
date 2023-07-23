'use client';

import { useSearchParams } from 'next/navigation';
import React from 'react';

import style from './page.module.css';

export default function page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return <div className={style.id}>{id}</div>;
}

