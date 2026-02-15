'use client'

import dynamic from 'next/dynamic'
import { useStation } from '@/features/station/hooks/use-station'

const Map = dynamic(() => import('@/features/map/components/map').then((m) => m.Map), { ssr: false })

export function StationMap() {
    const { stations, isLoading, error } = useStation()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error?.message}</div>
    return (
        <Map
            stations={stations}
            center={stations?.[0]?.lat && stations?.[0]?.lng ? [stations?.[0]?.lat, stations?.[0]?.lng] : undefined}
        />
    )
}
