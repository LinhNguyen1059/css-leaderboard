import { useMemo } from "react";

import useLeaderboardStore from "@/stores/leaderboard";
import { Skeleton } from "@/components/ui/skeleton";

export default function TopRanking({
  isLoading = false,
}: {
  isLoading?: boolean;
}) {
  const leaderboard = useLeaderboardStore(state => state.leaderboard);

  const topRankings = useMemo(() => {
    const rankings = {
      first: leaderboard.find(entry => entry.rank === 1),
      second: leaderboard.find(entry => entry.rank === 2),
      third: leaderboard.find(entry => entry.rank === 3),
    };
    return rankings;
  }, [leaderboard]);

  const { first: topOne, second: topTwo, third: topThree } = topRankings;

  const podiumConfig = [
    {
      rank: 2,
      data: topTwo,
      image: "/assets/images/2nd.png",
      height: "h-[152px]",
      shadow: "shadow-[inset_-16px_0px_0px_#FEDE8F]",
      order: "order-1",
    },
    {
      rank: 1,
      data: topOne,
      image: "/assets/images/1st.png",
      height: "h-[208px]",
      shadow: "",
      order: "order-2",
    },
    {
      rank: 3,
      data: topThree,
      image: "/assets/images/3rd.png",
      height: "h-[114px]",
      shadow: "shadow-[inset_16px_0px_0px_#FEDE8F]",
      order: "order-3",
    },
  ];

  const PodiumPlace = ({
    rank,
    data,
    image,
    height,
    shadow,
    order,
  }: (typeof podiumConfig)[0]) => (
    <div className={`flex flex-col items-center ${order} sm:order-none`}>
      <img
        src={image}
        alt={`${rank === 1 ? "1st" : rank === 2 ? "2nd" : "3rd"} place trophy`}
        width={94}
        height={94}
        className="mb-0"
      />
      <div
        className={`flex ${height} w-[150px] flex-col items-center justify-center bg-[#FFEE9C] px-4 py-6 ${shadow}`}
        role="article"
        aria-label={`${rank === 1 ? "First" : rank === 2 ? "Second" : "Third"} place ranking`}
      >
        {isLoading ? (
          <div className="w-full space-y-2">
            <Skeleton className="mx-auto h-8 w-16 bg-[#FEDE8F]" />
            <Skeleton className="mx-auto h-4 w-20 bg-[#FEDE8F]" />
          </div>
        ) : data ? (
          <>
            <h3
              className="text-4xl font-semibold text-gray-800"
              aria-label={`Score: ${data.totalMapScore}`}
            >
              {data.totalMapScore}
            </h3>
            <h2
              className="w-full truncate text-center text-base font-semibold text-gray-700"
              title={data.name}
            >
              {data.name}
            </h2>
          </>
        ) : (
          <div className="text-center text-gray-500">
            <div className="text-2xl font-semibold">-</div>
            <div className="text-sm">No data</div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="mb-4" aria-label="Top 3 Rankings" role="region">
      <div className="flex flex-col items-end justify-center gap-2 sm:flex-row sm:gap-0">
        {podiumConfig.map(config => (
          <PodiumPlace key={config.rank} {...config} />
        ))}
      </div>
      {!isLoading && !topOne && !topTwo && !topThree && (
        <div className="mt-4 text-center text-gray-500">
          <p>No ranking data available</p>
        </div>
      )}
    </section>
  );
}
