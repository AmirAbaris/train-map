'use client'

import dynamic from 'next/dynamic'

const Map = dynamic(() => import('@/features/map/components/map').then((m) => m.Map), { ssr: false })

export function StationMap() {
    return <Map  />
}
