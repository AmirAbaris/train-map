'use client'

import L from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { Station } from '@/features/station/api/api/station'
import { StationPopupContent } from '@/features/station/components/station-popup-content'

const pinIcon = new L.Icon({
    iconUrl: '/icons/pin.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
})

type MapProps = {
    center?: [number, number]
    zoom?: number
    stations?: Station[]
}
export function Map({ center, zoom, stations }: MapProps) {
    return (
        <MapContainer center={center ?? [51.505, -0.09]} zoom={zoom ?? 5} className="h-dvh w-full">
            <TileLayer
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png"
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
