import React, { useState, useEffect } from "react";
import { Window } from "@/components/ui/Window";
import { TitleBar } from "@/components/ui/TitleBar";
import { GrLocation } from "react-icons/gr";
import { BiLoaderCircle } from "react-icons/bi";

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface WeatherData {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  humidity: number;
  location: string;
}

type LoadingState = "idle" | "fetching" | "precise";

const STORAGE_KEY = "weather-coordinates";
const WEATHER_CACHE_KEY = "weather-cache";
const CACHE_DURATION = 10 * 60 * 1000; // 10分
const TOKYO_COORDINATES: Coordinates = { latitude: 35.6762, longitude: 139.6503 };

// 天気コードの説明マッピング（WMO天気解釈コード）
const WEATHER_DESCRIPTIONS: Record<number, string> = {
  0: "晴天",
  1: "ほぼ晴天",
  2: "部分曇り",
  3: "曇天",
  45: "霧",
  48: "霧氷",
  51: "軽い小雨",
  53: "適度な小雨",
  55: "激しい小雨",
  61: "軽い雨",
  63: "適度な雨",
  65: "激しい雨",
  71: "軽い雪",
  73: "適度な雪",
  75: "激しい雪",
  80: "軽いにわか雨",
  81: "適度なにわか雨",
  82: "激しいにわか雨",
  95: "雷雨",
  96: "軽い雹を伴う雷雨",
  99: "激しい雹を伴う雷雨",
};

// 天気コード対応の絵文字マッピング
const WEATHER_EMOJIS: Record<number, string> = {
  0: "☀️",
  1: "🌤️",
  2: "⛅",
  3: "☁️",
  45: "🌫️",
  48: "🌫️",
  51: "🌧️",
  53: "🌧️",
  55: "🌧️",
  61: "🌧️",
  63: "🌧️",
  65: "⛈️",
  71: "🌨️",
  73: "🌨️",
  75: "🌨️",
  80: "🌦️",
  81: "🌦️",
  82: "⛈️",
  95: "⛈️",
  96: "⛈️",
  99: "⛈️",
};

// Skeleton Loading Component
const WeatherSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
    <div className="h-12 bg-gray-300 rounded w-full mb-4"></div>
    <div className="grid grid-cols-2 gap-4">
      <div className="h-4 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300 rounded"></div>
    </div>
  </div>
);

// ヘルパー関数: 座標から位置名を取得
async function getReverseLocation(lat: number, lng: number): Promise<string> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&accept-language=ja`,
    );
    const data = await response.json();
    return (
      data.address?.city || data.address?.town || data.address?.county || data.address?.country || "現在地"
    );
  } catch {
    return "現在地";
  }
}

export const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState<LoadingState>("fetching");
  const [error, setError] = useState<string | null>(null);
  const [isPrecise, setIsPrecise] = useState(false);

  // Open-Meteo API から天気データを取得
  const fetchWeatherData = async (lat: number, lng: number, precise: boolean = false) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&timezone=Asia/Tokyo`,
      );

      if (!response.ok) throw new Error("天気データの取得に失敗しました");

      const data = await response.json();
      const current = data.current;

      // 座標から位置名を取得
      const locationName = await getReverseLocation(lat, lng);

      const weatherData: WeatherData = {
        temperature: Math.round(current.temperature_2m),
        weatherCode: current.weather_code,
        windSpeed: Math.round(current.wind_speed_10m * 10) / 10,
        humidity: current.relative_humidity_2m,
        location: locationName,
      };

      setWeather(weatherData);
      setIsPrecise(precise);
      setLoading("idle");
      setError(null);

      // 天気データをキャッシュ保存
      localStorage.setItem(
        WEATHER_CACHE_KEY,
        JSON.stringify({
          data: weatherData,
          timestamp: Date.now(),
        }),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "エラーが発生しました");
      setLoading("idle");
    }
  };

  // IP から位置情報を取得 (初期ロード時)
  const fetchLocationFromIP = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      if (!response.ok) throw new Error("位置情報の取得に失敗しました");

      const data = await response.json();
      const coords: Coordinates = {
        latitude: data.latitude,
        longitude: data.longitude,
      };

      setCoordinates(coords);
      await fetchWeatherData(coords.latitude, coords.longitude, false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "位置情報の取得に失敗しました");
      setLoading("idle");
      // フォールバック: 東京に設定
      setCoordinates(TOKYO_COORDINATES);
      await fetchWeatherData(TOKYO_COORDINATES.latitude, TOKYO_COORDINATES.longitude, false);
    }
  };

  // ブラウザの Geolocation API を使用して正確な位置を取得
  const fetchPreciseLocation = () => {
    if (!navigator.geolocation) {
      setError("お使いのブラウザは位置情報取得に対応していません");
      return;
    }

    setLoading("precise");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: Coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setCoordinates(coords);
        // 正確な座標を localStorage に保存
        localStorage.setItem(STORAGE_KEY, JSON.stringify(coords));
        fetchWeatherData(coords.latitude, coords.longitude, true);
      },
      (err) => {
        let errorMessage = "位置情報の取得に失敗しました";
        if (err.code === 1) {
          errorMessage = "位置情報へのアクセスが拒否されました";
        } else if (err.code === 2) {
          errorMessage = "位置情報が利用できません";
        }
        setError(errorMessage);
        setLoading("idle");
      },
    );
  };

  // コンポーネント初期化: localStorage または IP から読み込み
  useEffect(() => {
    const initializeLocation = async () => {
      // localStorage にキャッシュされた座標を確認
      const storedCoords = localStorage.getItem(STORAGE_KEY);
      if (storedCoords) {
        try {
          const coords: Coordinates = JSON.parse(storedCoords);
          setCoordinates(coords);
          await fetchWeatherData(coords.latitude, coords.longitude, true);
          return;
        } catch {
          localStorage.removeItem(STORAGE_KEY);
        }
      }

      // キャッシュされた天気データを確認
      const cachedWeather = localStorage.getItem(WEATHER_CACHE_KEY);
      if (cachedWeather) {
        try {
          const { data, timestamp } = JSON.parse(cachedWeather);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setWeather(data);
            setLoading("idle");
            return;
          }
        } catch {
          localStorage.removeItem(WEATHER_CACHE_KEY);
        }
      }

      // フォールバック処理 (IP geolocation)
      await fetchLocationFromIP();
    };

    initializeLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Window>
      <TitleBar icon="Weather">Weather</TitleBar>

      {loading !== "idle" ? (
        <WeatherSkeleton />
      ) : error ? (
        <div className="text-red-500 text-sm mb-4">
          <p>{error}</p>
          <button
            onClick={() => {
              setError(null);
              if (coordinates) {
                fetchWeatherData(coordinates.latitude, coordinates.longitude);
              }
            }}
            className="mt-2 px-3 py-1 bg-red-200 text-red-700 rounded text-xs hover:bg-red-300"
          >
            再試行
          </button>
        </div>
      ) : weather ? (
        <div className="space-y-4">
          {/* 位置情報および位置情報の取得状態 */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-700">{weather.location}</h3>
              <p className="text-xs text-gray-500">
                {isPrecise ? "✓ 位置情報を取得済み" : "IPアドレスより取得"}
              </p>
            </div>
            <button
              onClick={fetchPreciseLocation}
              disabled={loading !== "idle"}
              className="flex items-center gap-1 px-3 py-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              title="現在地を取得"
            >
              {loading !== "idle" ? (
                <BiLoaderCircle className="animate-spin" size={20} />
              ) : (
                <GrLocation size={20} />
              )}
              <span className="pe-1 text-sm font-medium">現在地を取得</span>
            </button>
          </div>

          {/* 天気表示 */}
          <div className="flex items-start justify-between">
            <div>
              <div className="text-5xl font-bold text-slate-700 tracking-wider">{weather.temperature}°C</div>
              <p className="text-slate-600 mt-1 tracking-wider">
                {WEATHER_DESCRIPTIONS[weather.weatherCode] || "不明"}
              </p>
            </div>
            <div className="text-6xl">{WEATHER_EMOJIS[weather.weatherCode] || "🌐"}</div>
          </div>

          {/* 天気詳細情報 */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 uppercase tracking-wider">湿度</span>
              <span className="text-lg font-semibold text-slate-700">{weather.humidity}%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 uppercase tracking-wider">風速</span>
              <span className="text-lg font-semibold text-slate-700">{weather.windSpeed} m/s</span>
            </div>
          </div>
        </div>
      ) : null}
    </Window>
  );
};
