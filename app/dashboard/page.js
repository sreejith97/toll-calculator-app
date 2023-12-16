"use client";
import React, { useEffect, useMemo } from "react";

import SearchForm from "@/components/searchForm/page";
import { useDispatch, useSelector } from "react-redux";
import TollDetailsTable from "@/components/tollDetailsTable/page";
import RouteMap from "@/components/routeMap/page";
import dynamic from "next/dynamic";

export const MapComponent = dynamic(
  () => import("@/components/routeMap/page"),
  {
    ssr: false,
  }
);
function Page() {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.toll.value);
  const isNull = useSelector((state) => state.toll.isNull);
  const reduxValue = useSelector((state) => state.toll.value);

  // console.log(value);

  return (
    <div>
      <SearchForm />
      {!value ? (
        <div>No data Fount</div>
      ) : (
        <div>
          <TollDetailsTable data={value.data.data} />
          <MapComponent polyline={value.data.data} />
        </div>
      )}
    </div>
  );
}

export default Page;
