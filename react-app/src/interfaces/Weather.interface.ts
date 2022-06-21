export interface Weather {
    temperature: string;
    city: string;
    icon: string;
  }

export interface IWeeklyWeather {
  temperature: string,
  description: string,
  icon: string
}

export interface ICity {
  country: string,
  lat: number,
  lon: number,
  city: string
}