import { NextResponse } from "next/server";

export const POST = async (req) => {
  const requestedData = await req.json();
  // console.log(requestedData);

  // const fromDestination = requestedData.from.address;
  // console.log(fromDestination);

  let res = await fetch(
    "https://apis.tollguru.com/toll/v2/origin-destination-waypoints",
    {
      method: "POST",
      body: JSON.stringify(requestedData),
      headers: {
        "content-type": "application/json",
        "x-api-key": process.env.API_KEY,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
    return NextResponse.json({
      status: res.status,
      error: res.value,
    });
  }

  // console.log(await res.json());
  // setMyData(await res.json());
  let data = await res.json();
  // console.log(data);
  return NextResponse.json({
    sucess: "POST Request",
    data: data,
    status: res.status,
    error: res.error,
  });
};
