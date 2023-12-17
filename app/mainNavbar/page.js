import React from "react";

export default function MainNavBar() {
  return (
    <nav className="w-full  flex  flex-row justify-between py-4">
      <div className="font-bold text-[24px] sm:text-[18px] md:text-[19px] lg:text-[24px] xl:text-[25px]  text-blue-600">
        Toll Expert
      </div>
      <div className="flex  flex-row justify-between w-[70px] max-w-[70px]">
        <div className="border-transparent rounded-full bg-amber-300 broder w-8 h-8 flex justify-center items-center font-bold">
          ?
        </div>
        <div className="border-transparent rounded-full bg-blue-300 broder w-8 h-8 flex justify-center items-center font-bold">
          P
        </div>
      </div>
    </nav>
  );
}
