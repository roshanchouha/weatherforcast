import { useQuery } from "@tanstack/react-query";
import type { coordinates } from "../api/types";
import { weatherApi } from "../api/weather";

export const weatherQueryKey = {
    weather: (coords: coordinates) => ["weather", coords] as const,  
    forecast: (coords: coordinates) => ["forecast", coords] as const,
    reverseGeocoding: (coords: coordinates) => ["reverseGeocoding", coords] as const,
}
export function useWeatherQuery(coordinates: coordinates | null) {
  return  useQuery({
        queryKey: weatherQueryKey.weather(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: async () => coordinates ? weatherApi.getCurrentWeather(coordinates) : null, 
        enabled: coordinates !== null,
    
    })
}

export function useForecastQuery(coordinates: coordinates | null) {
  return  useQuery({
        queryKey: weatherQueryKey.forecast(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: async () => coordinates ? weatherApi.getForecast(coordinates) : null, 
        enabled: coordinates !== null,
    

    })
}


export function useReverseGeocodingQuery(coordinates: coordinates | null) {
  return  useQuery({
        queryKey: weatherQueryKey.reverseGeocoding(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: async () => coordinates ? weatherApi.getReverseGeocoding(coordinates) : null, 
        enabled: coordinates !== null,
    

    })
}
