"use client";
import React, { useEffect, useMemo } from "react";

import SearchForm from "@/components/searchForm/page";
import { useDispatch, useSelector } from "react-redux";
import TollDetailsTable from "@/components/tollDetailsTable/page";
import RouteMap from "@/components/routeMap/page";
import dynamic from "next/dynamic";
import LoadingComponenet from "@/components/loadingComponent/page";

export const MapComponent = dynamic(
  () => import("@/components/routeMap/page"),
  {
    ssr: false,
  }
);
function Page() {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.toll.value);
  const isLoading = useSelector((state) => state.toll.isLoading);
  const isNull = useSelector((state) => state.toll.isNull);
  const reduxValue = useSelector((state) => state.toll.value);

  // console.log(value);

  return (
    <div className="pb-11">
      <SearchForm />

      {!value ? (
        <div className="mt-8">{!isLoading ? "" : <LoadingComponenet />}</div>
      ) : (
        <div className="px-[20px]">
          <h1 className="w-full mt-8 text-center text-[18px] font-semibold uppercase">
            Toll Details
          </h1>
          <MapComponent polyline={value.data.data} />
          <TollDetailsTable data={value.data.data} />
        </div>
      )}
    </div>
  );
}

export default Page;
