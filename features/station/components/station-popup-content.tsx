import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Station } from '../api/api/station'

type StationPopupContentProps = {
    station: Station
}

export function StationPopupContent({ station }: StationPopupContentProps) {
    return (
        <Card size="sm" className="min-w-[200px] ring-0">
            <CardHeader className="p-0 pb-1">
                <CardTitle className="text-sm font-medium">{station.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <Badge variant="secondary" className="text-xs font-normal">
                    {station.city}
                </Badge>
            </CardContent>
        </Card>
    )
}
