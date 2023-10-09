"use client";
import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  publishDate: string;
}
export const Countdown: React.FC<CountdownProps> = ({ publishDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date();
      const target = new Date(publishDate);
      const difference = target.getTime() - now.getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      } else {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [publishDate]);
  return (
    <div className="bg-teal py-[15px] text-white flex flex-col items-center gap-[10px] sm:gap-[5px]">
      <span>Apertura del proyecto </span>
      <div className="grid grid-cols-2 flex-col sm:grid-cols-4 gap-[30px]">
        <div className="border-r-[2px] border-white pr-[30px] flex flex-col items-center">
          <span className="text-xl lg:text-3xl">{timeLeft.days}</span>
          <p>Días</p>
        </div>
        <div className="border-r-[2px] border-white pr-[30px] flex flex-col items-center">
          <span className="text-xl lg:text-3xl">{timeLeft.hours}</span>
          <p>Horas</p>
        </div>
        <div className="border-r-[2px] border-white pr-[30px] flex flex-col items-center">
          <span className="text-xl lg:text-3xl">{timeLeft.minutes}</span>
          <p>Min</p>
        </div>
        <div className="flex flex-col items-center border-r-[2px] border-white pr-[30px] sm:border-0">
          <span className="text-xl lg:text-3xl">{timeLeft.seconds}</span>
          <p>Seg</p>
        </div>
      </div>
    </div>
  );
};
