import React from 'react'
import type { weatherData } from '../api/types'
import { format, formatDate } from 'date-fns'
import { Sunrise, Sunset } from 'lucide-react'


interface weatherDetailsProps {
    data: weatherData
}
const WeatherDetails = ({data}: weatherDetailsProps ) => {
    const {wind , main , sys} = data

    const formateDate = (timestamp:number) =>  {
        return format( new Date(timestamp*1000), "h:mm a")
    }

  const getWindDirection = (degree:number)=> {
    const directions =["N", "NE", "E", "SE" ,"S" , "SW" ,"W" ,"NW"]

    const index = Math.round((degree%=360))
  }
    const details = [
        {
            title: 'Sunrise',
            value:formateDate(sys.sunrise),
            icon: Sunrise,
            color: "text-orange-500"
        },
        {
            title: 'Sunset',
            value:formateDate(sys.sunset),
            icon: Sunset,
            color: "text-blue-500"
        },
        {
            title: 'Sunrise',
            value:formateDate(sys.sunrise),
            icon: Sunrise,
            color: "text-orange-500"
        },
        {
            title: 'Sunrise',
            value:formateDate(sys.sunrise),
            icon: Sunrise,
            color: "text-orange-500"
        }
    ]
  return (
    <div>WeatherDetails</div>
  )
}

export default WeatherDetails