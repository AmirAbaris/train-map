import { useQuery } from '@tanstack/react-query'
import { getStations } from '../api/get-stations'

export function useStation() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['stations'],
        queryFn: async () => {
            const response = await getStations()
            if (!response.success) throw new Error(response.error)
            return response.data
        },
    })

    return {
        stations: data,
        isLoading,
        error,
    }
}
