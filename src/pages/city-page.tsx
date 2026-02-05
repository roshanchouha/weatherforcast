import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useForecastQuery, useReverseGeocodingQuery, useWeatherQuery } from '../hooks/use-weather';
import { Alert, AlertDescription, AlertTitle } from '../components/ui/alert';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { WeatherSkeleton } from '../components/loading-skeleton';
import CurrentWeather from '../components/current-weather';
import HourlyTemprature from '../components/hourly-tempreturedata';
import WeatherDetails from '../components/weather-details';
import WeatherForecast from '../components/weather-forcast';
import FavoriteButton from '../components/favorite-button';

const CityPage = () => {
    const [searchParams] = useSearchParams();
    const params = useParams();

    const lat = parseFloat(searchParams.get('lat') || '0');
    const lon = parseFloat(searchParams.get('lon') || '0');

    const coordinates = { lat, lon };
    const locationData = useReverseGeocodingQuery(coordinates)
    const weatherQuery = useWeatherQuery(coordinates)
    const forecastQuery = useForecastQuery(coordinates)



    if (weatherQuery.error || forecastQuery.error) {
        return <>
            <Alert variant="destructive" className='my-4'>
                <AlertTriangle className='h-4 w-4'></AlertTriangle>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    <p>failed to fetch weather data. Please try again</p>
                </AlertDescription>
            </Alert>
        </>
    }

    console.log("locationDAta", locationData.data)



    if (weatherQuery.error || forecastQuery.error || !params?.cityName) {
        return <WeatherSkeleton />
    }

    return (
        <>
            <div className='space-y-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl font-bold tracking-tight'>
                        {params.cityName}, {weatherQuery?.data ? weatherQuery.data.sys.country : ''}
                    </h1>
                    {weatherQuery?.data && <FavoriteButton data={{ ...weatherQuery.data, name: params.cityName }} />}
                </div>
            </div>

            <div className='grid gap-6'>

                <div className=' flex flex-col   gap-4 mt-2'>
                    {/* current weather   */}
                    {weatherQuery?.data && locationData?.data!?.length > 0 && (
                        <CurrentWeather
                            data={weatherQuery.data}
                            locationName={locationData.data![0]}
                        />
                    )}

                    {/* hourly weather   */}
                    <HourlyTemprature data={forecastQuery?.data!} />
                </div>
                <div className='grid gap-6 md:grid-cols-2 items-start'>
                    {/* details */}
                    {weatherQuery?.data && <WeatherDetails data={weatherQuery.data} />}
                    {/* forecast */}
                    {forecastQuery?.data && <WeatherForecast data={forecastQuery.data} />}
                </div>

            </div>
        </>
    )
}

export default CityPage