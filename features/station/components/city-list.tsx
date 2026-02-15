'use client'

import { Input } from '@/components/ui/input'
import { Station } from '../api/api/station'
import { useState } from 'react'

type CityListProps = {
    stations: Station[]
}
export function CityList({ stations }: CityListProps) {
    const [search, setSearch] = useState('')
    const filteredStations = stations.filter((station) => station.city.toLowerCase().includes(search.toLowerCase()))
    return (
        <aside className="flex w-[280px] shrink-0 flex-col border-r border-border bg-card">
            <div className="border-b border-border p-3">
                <h2 className="mb-2 text-sm font-medium">Train Stations around Germany</h2>
                <Input
                    placeholder="Search cities..."
                    className="h-9"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <ul className="flex-1 overflow-y-auto p-2">
                {filteredStations.map((station) => (
                    <li key={station.id}>
                        <button type="button" className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted">
                            {station.name} - {station.city}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    )
}
