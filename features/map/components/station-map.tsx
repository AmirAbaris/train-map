'use client'

import dynamic from 'next/dynamic'
import { useStation } from '@/features/station/hooks/use-station'
import { StationList } from '@/features/station/components/station-list'
import { StationMapSkeleton } from './station-map-skeleton'
import { StationMapError } from './station-map-error'

const Map = dynamic(() => import('@/features/map/components/map').then((m) => m.Map), { ssr: false })

export function StationMap() {
    const { stations, isLoading, error } = useStation()

    if (isLoading) return <StationMapSkeleton />
    if (error) return <StationMapError message={error.message ?? 'Unknown error'} />
    
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
