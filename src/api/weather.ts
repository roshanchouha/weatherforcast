import { API_CONFIG } from "./config";
import type { coordinates, ForecastData, GeocodingData, weatherData } from "./types";

class WeatherAPI {
    private createURl(endPoint: string , queryParams: Record<string , string | number>) {
        const searchParmas = new URLSearchParams({
            appid: API_CONFIG.API_KEY,
            ...queryParams
        })

        return `${endPoint}?${searchParmas.toString()}`
    }
    
    private async fetchData<T>(url: string): Promise<T> {
        const result = await fetch(url);
        if(!result.ok) {
            throw new Error('Failed to fetch data from weather API');
        }

        return await result.json() as T;
    }

    async getCurrentWeather({ lat , lon}: coordinates) : Promise<weatherData> {
        const url = this.createURl(`${API_CONFIG.BASE_URL}/weather`,
            {
                lat : lat.toString(),
                lon : lon.toString(),
                units: API_CONFIG.DEFAULT_PARAMS.units
            });   
        
        return this.fetchData<weatherData>(url);
    }
 
   async getForecast({ lat , lon}: coordinates) : Promise<ForecastData> {
        const url = this.createURl(`${API_CONFIG.BASE_URL}/forecast`,
            {
                lat : lat.toString(),
                lon : lon.toString(),
                units: API_CONFIG.DEFAULT_PARAMS.units
            });   
        
        return this.fetchData<ForecastData>(url);
    }


     
     async getReverseGeocoding({ lat , lon}: coordinates) : Promise<GeocodingData[]> {
        const url = this.createURl(`${API_CONFIG.GEO}/reverse`,
            {
                lat : lat.toString(),
                lon : lon.toString(),
                limit: 1,
            });   
         
        return this.fetchData<GeocodingData[]>(url);
    }
  
}

export const weatherApi = new WeatherAPI();  