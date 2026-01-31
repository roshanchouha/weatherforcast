
import React from 'react'
import type { GeocodingData, weatherData } from '../api/types'
import { Card, CardContent, CardHeader } from './ui/card'
import { ArrowDown, ArrowUp } from 'lucide-react'

interface CurrentWeatherProps {
    data: weatherData,
    locationName: GeocodingData
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {

    const {
        weather: [currentWeather],
        main: { temp, feels_like, humidity, temp_max, temp_min },
        wind: { speed: windSpeed },

    } = data


    const formatTemp = (temperature: number) => {
        return `${Math.round(temperature)}°C`
    }
    return (
        <>
            <Card className='overflow-hidden'>

                <CardContent className='p-6'>
                    <div className='grid gap-6 md:grid-cols-2'>
                        <div className='space-y-4'>
                            <div className='space-y-2'>
                                <div className='flex items-end gap-2'>
                                    <h2 className='text-2xl font-bold tracking-tight'>{locationName.name}</h2>
                                    {locationName.state ? <span className='text-sm text-gray-500 ml-2'>, {locationName.state}</span> : null}
                                </div>
                                <p className='text-sm text-muted-foreground'>
                                    {locationName.country}
                                </p>
                            </div>

                            <div className='flex items-center gap-2'>
                                <p className='text-7xl font-bold tracking-tighter'>
                                    {formatTemp(temp)}
                                </p>

                                <div className='space-y-1'>
                                    <p className='text-sm font-medium text-muted-foreground '>
                                        Feels like {formatTemp(feels_like)}
                                    </p>
                                    <div className='flex gap-2  text-sm font-medium'>
                                        <span className='flex item-center gap-1 text-blue-500'>
                                            <ArrowDown className='h-4 w-4' /> {formatTemp(temp_min)}
                                        </span>
                                        <span className='flex item-center gap-1 text-red-500'>
                                            <ArrowUp className='h-4 w-4' /> {formatTemp(temp_max)}
                                        </span>
                                        <span>

                                        </span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>

            </Card>
        </>
    )
}

export default CurrentWeather