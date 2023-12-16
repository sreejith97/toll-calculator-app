import { NextResponse } from "next/server";

export const POST = async (req) => {
  const requestedData = await req.json();

  // const fromDestination = requestedData.from.address;
  // console.log(fromDestination);

  let res = await fetch(
    "https://apis.tollguru.com/toll/v2/origin-destination-waypoints",
    {
      method: "POST",
      body: JSON.stringify(requestedData),
      headers: {
        "content-type": "application/json",
        "x-api-key": "fPBqTtBpdqG8BHHh2LDtmpb8NHQBpnGd ",
      },
    }
  );

  if (!res.ok) {
    throw new Error(`HTTP error! Status: ${res.status}`);
  }

  // console.log(await res.json());
  // setMyData(await res.json());
  let data = await res.json();
  // console.log(data);
  return NextResponse.json({
    sucess: "POST Request",
    data: data,
  });
};
