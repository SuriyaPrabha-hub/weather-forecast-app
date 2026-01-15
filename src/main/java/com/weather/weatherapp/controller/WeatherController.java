package com.weather.weatherapp.controller;

import com.weather.weatherapp.service.WeatherService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/weather")
@CrossOrigin // allows frontend JS to call backend
public class WeatherController {

    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    // 🌤 Current Weather by City
    @GetMapping("/{city}")
    public String getWeather(@PathVariable String city) {
        return weatherService.getWeather(city);
    }

    // 📅 5-Day Forecast by City
    @GetMapping("/forecast/{city}")
    public String getForecast(@PathVariable String city) {
        return weatherService.getForecast(city);
    }

    // 📍 Weather by GPS location
    @GetMapping("/location")
    public String getWeatherByLocation(
            @RequestParam double lat,
            @RequestParam double lon) {

        return weatherService.getWeatherByLocation(lat, lon);
    }
}
