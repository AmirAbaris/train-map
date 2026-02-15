'use client'

import L from 'leaflet'
import { useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import { Station } from '@/features/station/type/station'
import { StationPopupContent } from '@/features/station/components/station-popup-content'

const pinIcon = new L.Icon({
    iconUrl: '/icons/pin.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
})

const FLY_TO_ZOOM = 14

function FlyTo({ position, zoom = FLY_TO_ZOOM }: { position: [number, number]; zoom?: number }) {
    const map = useMap()
    useEffect(() => {
        map.flyTo(position, zoom, { duration: 2 })
    }, [map, position[0], position[1], zoom])
    return null
}

type MapProps = {
    center?: [number, number]
    zoom?: number
    stations?: Station[]
    flyToPosition?: [number, number] | null
}
export function Map({ center, zoom, stations, flyToPosition }: MapProps) {
    return (
        <MapContainer center={center ?? [51.505, -0.09]} zoom={zoom ?? 5} className="h-dvh w-full">
            {flyToPosition != null && <FlyTo position={flyToPosition} />}
            <TileLayer
                url={`https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png?api_key=${process.env.NEXT_PUBLIC_STADIA_MAPS_API_KEY}`}
                attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                minZoom={0}
                maxZoom={20}
            />
            {stations?.map((station) => (
                <Marker key={station.id} position={[station.lat, station.lng]} icon={pinIcon}>
                    <Popup>
                        <StationPopupContent station={station} />
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}
