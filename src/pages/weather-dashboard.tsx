import React from 'react'
import { Button } from '../components/ui/button'
import { AlertTriangle, InfoIcon, MapPin, RefreshCcw } from 'lucide-react'
import { useGeolocation } from '../hooks/use-geolocation'
import { WeatherSkeleton } from '../components/loading-skeleton'
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert'
import { useForecastQuery, useReverseGeocodingQuery, useWeatherQuery } from '../hooks/use-weather'
import CurrentWeather from '../components/current-weather'
import HourlyTemprature from '../components/hourly-tempreturedata'
import WeatherDetails from '../components/weather-details'
import WeatherForecast from '../components/weather-forcast'

const WeatherDashboard = () => {
    const { coordinates, error: locationError, isLoading: locationLoading, geoLocation } = useGeolocation()

    // console.log(coordinates, locationError, locationLoading);

    const locationData = useReverseGeocodingQuery(coordinates)
    const forecastData = useForecastQuery(coordinates)
    const weatherData = useWeatherQuery(coordinates)
    console.log("locationData", locationData, forecastData, weatherData);

    const locationName = locationData.data?.length ? locationData.data[0].name : 'Unknown Location';
    console.log("locationName", locationName);



    const handleRefresh = () => {
        if (coordinates) {
            geoLocation()
            locationData.refetch()
            forecastData.refetch()
            weatherData.refetch()
        }
    }


    if (locationLoading) {
        return <WeatherSkeleton />
    }


    if (locationError) {
        return <>
            <Alert variant="destructive" className='my-4'>

                <AlertTriangle className='h-4 w-4'></AlertTriangle>
                <AlertTitle>Location error</AlertTitle>
                <AlertDescription>
                    <p>{locationError}</p>
                    <Button onClick={() => geoLocation()} className='flex' variant='outline' >
                        <MapPin className='mr-2 h-4 w-4' />
                        Enable Location
                    </Button>
                </AlertDescription>

            </Alert>
        </>

    }

    if (weatherData.error || forecastData.error) {
        return <>
            <Alert variant="destructive" className='my-4'>
                <AlertTriangle className='h-4 w-4'></AlertTriangle>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    <p>failed to fetch weather data. Please try again</p>
                    <Button onClick={handleRefresh} className='flex' variant='outline' >
                        <RefreshCcw className='mr-2 h-4 w-4' />
                        retry
                    </Button>
                </AlertDescription>
            </Alert>
        </>
    }

    return (
        <>
            <div className='flex justify-between items-center'>
                <h1 className='text-xl font-bold tracking-tight'> My Location</h1>
                <Button
                    variant="outline"
                    size="icon"
                    className='rotate-0 transition-transform cursor-pointer  '
                    onClick={() => handleRefresh()}
                    disabled={weatherData.isFetching || forecastData.isFetching || locationData.isFetching}
                >
                    <RefreshCcw className={`h-4 w-4 ${weatherData.isFetching || forecastData.isFetching || locationData.isFetching ? 'animate-spin' : ''}`} />
                </Button>
            </div>

            <div className='grid gap-6'>

                <div className=' flex flex-col lg:flex-row gap-4 mt-2'>
                    {/* current weather   */}
                    {weatherData?.data && locationData?.data!?.length > 0 && (
                        <CurrentWeather
                            data={weatherData.data}
                            locationName={locationData.data![0]}
                        />
                    )}

                    {/* hourly weather   */}
                    <HourlyTemprature data={forecastData?.data!} />
                </div>
                <div className='grid gap-6 md:grid-cols-2 items-start'>
                    {/* details */}
                    {weatherData?.data && <WeatherDetails data={weatherData.data} />}
                    {/* forecast */}
                    {forecastData?.data && <WeatherForecast data={forecastData.data} />}
                </div>

            </div>
        </>
    )
}

export default WeatherDashboard