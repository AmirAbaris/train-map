'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useStation } from '@/features/station/hooks/use-station'
import { StationList } from '@/features/station/components/station-list'
import { Station } from '@/features/station/type/station'
import { StationMapSkeleton } from './station-map-skeleton'
import { StationMapError } from './station-map-error'

const Map = dynamic(() => import('@/features/map/components/map').then((m) => m.Map), { ssr: false })

export function StationMap() {
    const { stations, isLoading, error } = useStation()
    const [search, setSearch] = useState('')
    const [selectedStation, setSelectedStation] = useState<Station | null>(null)

    // i could add zustand gloabal state for handling state, but for this project, simple state will do
    // we have react compiler value here, so we don't need to memoize this
    const filteredStations = (stations ?? []).filter((station) =>
        station.city.toLowerCase().includes(search.toLowerCase()),
    )

    if (isLoading) return <StationMapSkeleton />
    if (error) return <StationMapError message={error.message ?? 'Unknown error'} />

    return (
        <div className="flex h-dvh w-full">
            <StationList
                stations={filteredStations}
                search={search}
                onSearchChange={setSearch}
                onStationSelect={setSelectedStation}
            />

            <div className="min-w-0 flex-1">
                <Map
                    stations={filteredStations}
                    center={
                        stations?.[0]?.lat != null && stations?.[0]?.lng != null
                            ? [stations[0].lat, stations[0].lng]
                            : [51.1657, 10.4515]
                    }
                    flyToPosition={selectedStation != null ? [selectedStation.lat, selectedStation.lng] : null}
                />
            </div>
        </div>
    )
}
