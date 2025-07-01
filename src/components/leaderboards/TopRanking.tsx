import Image from "next/image";
import { useMemo } from "react";

import useLeaderboardStore from "@/stores/leaderboard";

export default function TopRanking() {
  const leaderboard = useLeaderboardStore(state => state.leaderboard);

  const topOne = useMemo(() => {
    return leaderboard.find(entry => entry.rank === 1);
  }, [leaderboard]);

  const topTwo = useMemo(() => {
    return leaderboard.find(entry => entry.rank === 2);
  }, [leaderboard]);

  const topThree = useMemo(() => {
    return leaderboard.find(entry => entry.rank === 3);
  }, [leaderboard]);

  return (
    <div className="mt-6 mb-4 flex items-end">
      <div className="flex flex-col items-center">
        <Image
          src="/assets/images/2nd.png"
          alt="2nd place"
          width={94}
          height={94}
        />
        <div className="flex h-[152px] w-[150px] flex-col items-center justify-center bg-[#FFEE9C] px-4 py-6 shadow-[inset_-16px_0px_0px_#FEDE8F]">
          <h3 className="text-4xl font-semibold">{topTwo?.totalMapScore}</h3>
          <h2 className="text-base font-semibold">{topTwo?.name}</h2>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Image
          src="/assets/images/1st.png"
          alt="1st place"
          width={94}
          height={94}
        />
        <div className="flex h-[208px] w-[150px] flex-col items-center justify-center bg-[#FFEE9C] px-4 py-6">
          <h3 className="text-4xl font-semibold">{topOne?.totalMapScore}</h3>
          <h2 className="text-base font-semibold">{topOne?.name}</h2>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Image
          src="/assets/images/3rd.png"
          alt="3rd place"
          width={94}
          height={94}
        />
        <div className="flex h-[114px] w-[150px] flex-col items-center justify-center bg-[#FFEE9C] px-4 py-6 shadow-[inset_16px_0px_0px_#FEDE8F]">
          <h3 className="text-4xl font-semibold">{topThree?.totalMapScore}</h3>
          <h2 className="text-base font-semibold">{topThree?.name}</h2>
        </div>
      </div>
    </div>
  );
}
