import React from "react";

function LoadingComponenet() {
  return (
    <div className="w-full">
      <div className="animate-pulse w-full h-[300px] bg-slate-200 rounded-2xl p-5 mt-6 flex items-center justify-center">
        Map Loading...
      </div>
      <div className="w-full animate-pulse bg-slate-200 mt-6 rounded-2xl h-16 p-2">
        {/* <div className="w-full h-[100%] bg-slate-300"></div> */}
      </div>
    </div>
  );
}

export default LoadingComponenet;
