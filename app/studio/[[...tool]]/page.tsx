import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export const dynamic = 'force-dynamic'

// next-sanity/studio からの再エクスポートはビルド時に createContext エラーを引き起こすため
// 同等の値をインラインで定義する
export const metadata = {
  referrer: 'same-origin' as const,
  robots: 'noindex',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover' as const,
}

export default function StudioPage() {
  return <NextStudio config={config} />
}
