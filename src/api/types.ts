export interface coordinates {
    lat: number;
    lon: number;
}

export interface WeatherConditions {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface weatherData { 
    coord: coordinates;
    weather: WeatherConditions[];
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level?: number;
        grnd_level?: number;
    };
    visibility: number;
    wind: {
        speed: number;
        deg: number;
        gust?: number;
    }
    clouds: {
        all: number;
    }
    dt: number;
    sys: {
        type: number;
        id: number;
        country: string;
        sunrise: number;
        sunset: number;
    }
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface ForecastData { 
    cod: string;
    message: number;
    cnt: number;
    list: Array<{
        dt: number;
        main: weatherData['main'];
        weather: weatherData['weather'];
        clouds: weatherData['clouds'];
        wind: weatherData['wind'];
        dt_txt: string;
    }>;
    city: {
        name: string;     
        country: string;
        timezone: number;
        sunrise: number;
        sunset: number;
    }

}

export interface GeocodingData {
    name: string;
    local_names?: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}