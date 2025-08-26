import { useState, useEffect } from 'react';
import { SearchBar } from './SearchBar';
import { TimeCard } from './TimeCard';

export interface TimeZoneData {
  city: string;
  country: string;
  timezone: string;
  flag: string;
}

// Extensive list of world capitals and major cities
const WORLD_CITIES: TimeZoneData[] = [
  // Europe
  { city: 'Москва', country: 'Россия', timezone: 'Europe/Moscow', flag: '🇷🇺' },
  { city: 'Лондон', country: 'Великобритания', timezone: 'Europe/London', flag: '🇬🇧' },
  { city: 'Париж', country: 'Франция', timezone: 'Europe/Paris', flag: '🇫🇷' },
  { city: 'Берлин', country: 'Германия', timezone: 'Europe/Berlin', flag: '🇩🇪' },
  { city: 'Мадрид', country: 'Испания', timezone: 'Europe/Madrid', flag: '🇪🇸' },
  { city: 'Рим', country: 'Италия', timezone: 'Europe/Rome', flag: '🇮🇹' },
  { city: 'Амстердам', country: 'Нидерланды', timezone: 'Europe/Amsterdam', flag: '🇳🇱' },
  { city: 'Стокгольм', country: 'Швеция', timezone: 'Europe/Stockholm', flag: '🇸🇪' },
  { city: 'Варшава', country: 'Польша', timezone: 'Europe/Warsaw', flag: '🇵🇱' },
  { city: 'Прага', country: 'Чехия', timezone: 'Europe/Prague', flag: '🇨🇿' },
  
  // Asia
  { city: 'Токио', country: 'Япония', timezone: 'Asia/Tokyo', flag: '🇯🇵' },
  { city: 'Пекин', country: 'Китай', timezone: 'Asia/Shanghai', flag: '🇨🇳' },
  { city: 'Сеул', country: 'Южная Корея', timezone: 'Asia/Seoul', flag: '🇰🇷' },
  { city: 'Мумбаи', country: 'Индия', timezone: 'Asia/Kolkata', flag: '🇮🇳' },
  { city: 'Дубай', country: 'ОАЭ', timezone: 'Asia/Dubai', flag: '🇦🇪' },
  { city: 'Бангкок', country: 'Таиланд', timezone: 'Asia/Bangkok', flag: '🇹🇭' },
  { city: 'Сингапур', country: 'Сингапур', timezone: 'Asia/Singapore', flag: '🇸🇬' },
  { city: 'Гонконг', country: 'Гонконг', timezone: 'Asia/Hong_Kong', flag: '🇭🇰' },
  { city: 'Алматы', country: 'Казахстан', timezone: 'Asia/Almaty', flag: '🇰🇿' },
  { city: 'Ташкент', country: 'Узбекistan', timezone: 'Asia/Tashkent', flag: '🇺🇿' },
  
  // Americas
  { city: 'Нью-Йорк', country: 'США', timezone: 'America/New_York', flag: '🇺🇸' },
  { city: 'Лос-Анджелес', country: 'США', timezone: 'America/Los_Angeles', flag: '🇺🇸' },
  { city: 'Чикаго', country: 'США', timezone: 'America/Chicago', flag: '🇺🇸' },
  { city: 'Торонто', country: 'Канада', timezone: 'America/Toronto', flag: '🇨🇦' },
  { city: 'Мехико', country: 'Мексика', timezone: 'America/Mexico_City', flag: '🇲🇽' },
  { city: 'Сан-Паулу', country: 'Бразилия', timezone: 'America/Sao_Paulo', flag: '🇧🇷' },
  { city: 'Буэнос-Айрес', country: 'Аргентина', timezone: 'America/Argentina/Buenos_Aires', flag: '🇦🇷' },
  { city: 'Лима', country: 'Перу', timezone: 'America/Lima', flag: '🇵🇪' },
  { city: 'Богота', country: 'Колумбия', timezone: 'America/Bogota', flag: '🇨🇴' },
  { city: 'Каракас', country: 'Венесуэла', timezone: 'America/Caracas', flag: '🇻🇪' },
  
  // Africa & Oceania
  { city: 'Каир', country: 'Египет', timezone: 'Africa/Cairo', flag: '🇪🇬' },
  { city: 'Кейптаун', country: 'ЮАР', timezone: 'Africa/Johannesburg', flag: '🇿🇦' },
  { city: 'Найроби', country: 'Кения', timezone: 'Africa/Nairobi', flag: '🇰🇪' },
  { city: 'Лагос', country: 'Нигерия', timezone: 'Africa/Lagos', flag: '🇳🇬' },
  { city: 'Сидней', country: 'Австралия', timezone: 'Australia/Sydney', flag: '🇦🇺' },
  { city: 'Мельбурн', country: 'Австралия', timezone: 'Australia/Melbourne', flag: '🇦🇺' },
  { city: 'Окленд', country: 'Новая Зеландия', timezone: 'Pacific/Auckland', flag: '🇳🇿' },
];

export const WorldClock = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const filteredCities = WORLD_CITIES.filter(
    city =>
      city.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-primary p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4 drop-shadow-glow">
            🌍 Мировое Время
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Точное время в столицах и крупных городах мира. Следите за временем в любой точке планеты.
          </p>
        </header>

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {filteredCities.map((city) => (
            <TimeCard
              key={`${city.city}-${city.timezone}`}
              city={city}
              currentTime={currentTime}
            />
          ))}
        </div>

        {filteredCities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Город не найден. Попробуйте другой поисковый запрос.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};