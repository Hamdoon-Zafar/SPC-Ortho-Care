'use client';
// Client-side wrapper: the Studio (and its config) must only ever run in the browser.
import { NextStudio } from 'next-sanity/studio';
import config from '@/sanity.config';

export default function Studio() {
  return <NextStudio config={config} />;
}
