package com.weather.weatherapp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    @Value("${weather.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    // 🌤 Current Weather
    public String getWeather(String city) {

        String url = "https://api.openweathermap.org/data/2.5/weather"
                + "?q=" + city
                + "&appid=" + apiKey
                + "&units=metric";

        return restTemplate.getForObject(url, String.class);
    }

    // 📅 5-Day Forecast
    public String getForecast(String city) {

        String url = "https://api.openweathermap.org/data/2.5/forecast"
                + "?q=" + city
                + "&appid=" + apiKey
                + "&units=metric";

        return restTemplate.getForObject(url, String.class);
    }

    // 📍 Weather by Location (Latitude & Longitude)
    public String getWeatherByLocation(double lat, double lon) {

        String url = "https://api.openweathermap.org/data/2.5/weather"
                + "?lat=" + lat
                + "&lon=" + lon
                + "&appid=" + apiKey
                + "&units=metric";

        return restTemplate.getForObject(url, String.class);
    }
}
