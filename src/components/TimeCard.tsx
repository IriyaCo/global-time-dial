import { Card } from '@/components/ui/card';
import { TimeZoneData } from './WorldClock';

interface TimeCardProps {
  city: TimeZoneData;
  currentTime: Date;
}

export const TimeCard = ({ city, currentTime }: TimeCardProps) => {
  const getLocalTime = (timezone: string) => {
    return new Intl.DateTimeFormat('ru-RU', {
      timeZone: timezone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(currentTime);
  };

  const getLocalDate = (timezone: string) => {
    return new Intl.DateTimeFormat('ru-RU', {
      timeZone: timezone,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(currentTime);
  };

  const getTimeDifference = (timezone: string) => {
    const now = new Date();
    const localOffset = now.getTimezoneOffset();
    const targetTime = new Intl.DateTimeFormat('en-CA', {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(now);
    
    const targetDate = new Date(targetTime.replace(',', ''));
    const targetOffset = (now.getTime() - targetDate.getTime()) / (1000 * 60);
    const diffHours = Math.round((localOffset + targetOffset) / 60);
    
    if (diffHours === 0) return 'UTC+0';
    return diffHours > 0 ? `UTC+${diffHours}` : `UTC${diffHours}`;
  };

  return (
    <Card className="relative overflow-hidden bg-gradient-card backdrop-blur-sm border-border/50 shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 group">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{city.flag}</span>
            <div>
              <h3 className="font-bold text-foreground text-lg leading-tight">
                {city.city}
              </h3>
              <p className="text-muted-foreground text-sm">
                {city.country}
              </p>
            </div>
          </div>
          <div className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-full">
            {getTimeDifference(city.timezone)}
          </div>
        </div>

        <div className="text-center space-y-2">
          <div className="bg-gradient-time bg-clip-text text-transparent">
            <div className="text-4xl font-mono font-bold tracking-wider drop-shadow-time">
              {getLocalTime(city.timezone)}
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground capitalize">
            {getLocalDate(city.timezone)}
          </div>
        </div>

        {/* Animated background glow */}
        <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg" />
        
        {/* Pulse animation for seconds */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full animate-pulse" />
      </div>
    </Card>
  );
};