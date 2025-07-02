import { RANK_TREND } from "@/constants/Game";

export default function TrendIcon({
  trend = RANK_TREND.DOWN,
  className = "",
}: {
  trend?: RANK_TREND;
  className?: string;
}) {
  const rotation = {
    [RANK_TREND.UP]: "rotate-180",
    [RANK_TREND.DOWN]: "",
    [RANK_TREND.SAME]: "",
  }[trend];
  const color = {
    [RANK_TREND.UP]: "#FF0000",
    [RANK_TREND.DOWN]: "#009245",
    [RANK_TREND.SAME]: "#898A8D",
  }[trend];

  return (
    <svg
      className={`h-4 w-4 ${rotation} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      {trend === RANK_TREND.SAME ? (
        <rect x="5.5" y="10" width="13" height="4" rx="1" fill={color} />
      ) : (
        <path
          d="M12.3704 15.8351L18.8001 9.20467C19.2013 8.79094 18.9581 8 18.4297 8H5.5703C5.04189 8 4.79869 8.79094 5.1999 9.20467L11.6296 15.8351C11.8427 16.0549 12.1573 16.0549 12.3704 15.8351Z"
          fill={color}
        />
      )}
    </svg>
  );
}
