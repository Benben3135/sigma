// AnimatedNumber.tsx
import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  target: number;
  duration?: number; // Duration of the animation in milliseconds
  className?: string; // Additional class names for styling
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  target,
  duration = 500,
  className = "",
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const progressRatio = Math.min(progress / duration, 1);
      setValue(Math.round(progressRatio * target));

      if (progressRatio < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return <span className={className}>{value}</span>;
};

export default AnimatedNumber;
