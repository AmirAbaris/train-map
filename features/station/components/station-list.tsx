'use client'

import { Input } from '@/components/ui/input'
import { Station } from '../type/station'
import { CircleX } from 'lucide-react'
import { Button } from '@/components/ui/button'

type StationListProps = {
    stations: Station[]
    search: string
    onSearchChange: (value: string) => void
    onStationSelect?: (station: Station) => void
}
export function StationList({ stations, search, onSearchChange, onStationSelect }: StationListProps) {
    return (
        <aside className="flex w-[280px] shrink-0 flex-col border-r border-border bg-card">
            <div className="border-b border-border p-3">
                <h2 className="mb-2 text-sm font-medium">Train Stations around Germany</h2>
                <div className="relative">
                    <Input
                        placeholder="Search cities..."
                        className="h-9"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                    {search.length > 0 && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2"
                            onClick={() => onSearchChange('')}
                        >
                            <CircleX size={16} />
                        </Button>
                    )}
                </div>
            </div>
            <ul className="flex-1 overflow-y-auto p-2">
                {stations.length > 0 ? (
                    stations.map((station) => (
                        <li key={station.id}>
                            <button
                                type="button"
                                className="w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
                                onClick={() => onStationSelect?.(station)}
                            >
                                {station.name} - {station.city}
                            </button>
                        </li>
                    ))
                ) : (
                    <li className="text-sm text-muted-foreground p-2">No stations found</li>
                )}
            </ul>
        </aside>
    )
}
