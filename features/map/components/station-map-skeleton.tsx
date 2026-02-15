import { Skeleton } from '@/components/ui/skeleton'

export function StationMapSkeleton() {
    return (
        <div className="flex h-dvh w-full">
            <aside className="flex w-[280px] shrink-0 flex-col border-r border-border bg-card">
                <div className="border-b border-border p-3">
                    <Skeleton className="mb-2 h-4 w-48" />
                    <Skeleton className="h-9 w-full rounded-md" />
                </div>
                <ul className="flex-1 space-y-2 overflow-y-auto p-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <li key={i}>
                            <Skeleton className="h-10 w-full rounded-md" />
                        </li>
                    ))}
                </ul>
            </aside>
            <div className="min-w-0 flex-1">
                <Skeleton className="h-full w-full" />
            </div>
        </div>
    )
}
