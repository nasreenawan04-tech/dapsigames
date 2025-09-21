import { useEffect, useState, useRef } from "react";

interface StatsCounterProps {
  target: number;
  label: string;
  suffix?: string;
  color?: "primary" | "secondary" | "accent";
}

export function StatsCounter({ target, label, suffix = "", color = "primary" }: StatsCounterProps) {
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  const getColorClass = (color: string) => {
    switch (color) {
      case "secondary":
        return "text-secondary";
      case "accent":
        return "text-accent";
      default:
        return "text-primary";
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5, rootMargin: "0px 0px -100px 0px" }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const animationDuration = 2000; // 2 seconds
    const startTime = performance.now();

    function updateCounter(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(target * easeOutQuart);

      setCurrent(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCurrent(target);
      }
    }

    requestAnimationFrame(updateCounter);
  }, [isVisible, target]);

  return (
    <div ref={counterRef} className="counter text-center" data-testid={`stats-counter-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className={`text-3xl md:text-4xl font-bold mb-2 ${getColorClass(color)}`} data-testid={`stats-value-${label.toLowerCase().replace(/\s+/g, '-')}`}>
        {current}{suffix}
      </div>
      <div className="text-muted-foreground" data-testid={`stats-label-${label.toLowerCase().replace(/\s+/g, '-')}`}>
        {label}
      </div>
    </div>
  );
}
