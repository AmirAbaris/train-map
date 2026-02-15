'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

type StationMapErrorProps = {
    message?: string
}

export function StationMapError({ message }: StationMapErrorProps) {
    return (
        <div className="flex h-dvh w-full items-center justify-center max-w-md mx-auto">
            <Alert variant="destructive" className="mx-4 mt-4">
                <AlertTitle>Failed to load stations</AlertTitle>
                <AlertDescription>{message ?? 'Something went wrong.'}</AlertDescription>
            </Alert>
        </div>
    )
}
