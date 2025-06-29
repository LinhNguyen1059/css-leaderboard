import Image from "next/image";

export default function TopRanking() {
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
          <h3 className="text-4xl font-semibold">-5</h3>
          <h2 className="text-base font-semibold">Danh</h2>
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
          <h3 className="text-4xl font-semibold">-18</h3>
          <h2 className="text-base font-semibold">SunOfTheBeach</h2>
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
          <h3 className="text-4xl font-semibold">-5</h3>
          <h2 className="text-base font-semibold">haha</h2>
        </div>
      </div>
    </div>
  );
}
