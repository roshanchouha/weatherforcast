import React from 'react'
import type { weatherData } from '../api/types'
import { format, formatDate } from 'date-fns'
import { Compass, Gauge, Sunrise, Sunset } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'


interface weatherDetailsProps {
    data: weatherData
}
const WeatherDetails = ({ data }: weatherDetailsProps) => {
    console.log("data in weather details", data);
    const { wind, main, sys } = data

    const formateDate = (timestamp: number) => {
        return format(new Date(timestamp * 1000), "h:mm a")
    }

    const getWindDirection = (degree: number) => {
        const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]

        const index = Math.round(((degree %= 360) ? degree : degree + 360) / 45) % 8
        return directions[index]
    }
    const details = [
        {
            title: 'Sunrise',
            value: formateDate(sys.sunrise),
            icon: Sunrise,
            color: "text-orange-500"
        },
        {
            title: 'Sunset',
            value: formateDate(sys.sunset),
            icon: Sunset,
            color: "text-blue-500"
        },
        {
            title: 'Wind Direction',
            value: `${getWindDirection(wind.deg)} ${wind.deg}°`,
            icon: Compass,
            color: "text-green-500"
        },
        {
            title: 'Pressure',
            value: `${main.pressure} hPa`,
            icon: Gauge,
            color: "text-purple-500"
        },



    ]
    return (
        <Card>
            <CardHeader>
                <CardTitle>Weather Details</CardTitle>

            </CardHeader>
            <CardContent>
                <div className='grid gap-6 md:grid-cols-2'>
                    {
                        details.map((item) => {
                            return (
                                <div key={item.title} className='flex items-center  rounded-lg border p-4 gap-3'>
                                    <item.icon className={`h-5 w-5 ${item.color}`} />
                                    <div className=' '>
                                        <p className='text-sm font-medium leading-none'>{item.title}</p>
                                        <p className='text-sm text-muted-foreground'>{item.value}</p>
                                    </div>

                                </div>

                            )
                        })
                    }
                </div>
            </CardContent>

        </Card>
    )
}

export default WeatherDetails