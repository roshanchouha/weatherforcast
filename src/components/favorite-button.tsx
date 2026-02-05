import React from 'react'
import type { weatherData } from '../api/types'
import { useFavorite } from '../hooks/use-favorite'
import { Button } from './ui/button'
import { Star } from 'lucide-react'
import { toast } from 'sonner'


interface FavoriteButtonProps {
    data: weatherData
}

const FavoriteButton = ({ data }: FavoriteButtonProps) => {
    const { addFavorites, removeFavorite, isFavorite } = useFavorite()
    const isCurrentlyFavorites = isFavorite(data.coord.lat, data.coord.lon)

    const handleToggleFavorite = () => {
        if (isCurrentlyFavorites) {
            removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`)
            toast.error(`Removed ${data.name} Form favorite`)
        } else {
            addFavorites.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country

            })
            toast.success(`Add ${data.name} to Favorites`)
        }
    }

    return (
        <Button variant={isCurrentlyFavorites ? "default" : "outline"}
            size="icon"
            onClick={handleToggleFavorite}
            className={` ${isCurrentlyFavorites ? "bg-yellow-500  hove:bg-yellow-600" : ""}`}
        >
            <Star className={`h-4 w-4  ${isCurrentlyFavorites ? "fill-current" : ""}  `} />
        </Button>
    )
}

export default FavoriteButton