'use client'

import L from 'leaflet'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

const pinIcon = new L.Icon({
    iconUrl: '/icons/pin.svg',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
})

type MapProps = {
    center?: [number, number]
    zoom?: number
}
export function Map({ center, zoom }: MapProps) {
    return (
        <MapContainer center={center ?? [51.505, -0.09]} zoom={zoom ?? 13} className="h-dvh w-full">
            <TileLayer
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                minZoom={0}
                maxZoom={20}
            />
            <Marker position={center ?? [51.505, -0.09]} icon={pinIcon} />
        </MapContainer>
    )
}
