'use client'

import dynamic from 'next/dynamic'
import { useStation } from '@/features/station/hooks/use-station'
import { StationList } from '@/features/station/components/station-list'

const Map = dynamic(() => import('@/features/map/components/map').then((m) => m.Map), { ssr: false })

export function StationMap() {
    const { stations, isLoading, error } = useStation()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error?.message}</div>
    return (
        <div className="flex h-dvh w-full">
            <StationList stations={stations ?? []} />

            <div className="min-w-0 flex-1">
                <Map
                    stations={stations}
                    center={
                        stations?.[0]?.lat != null && stations?.[0]?.lng != null
                            ? [stations[0].lat, stations[0].lng]
                            : [51.1657, 10.4515]
                    }
                />
            </div>
        </div>
    )
}
