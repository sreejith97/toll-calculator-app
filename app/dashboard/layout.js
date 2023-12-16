"use client";
import store from "@/redux/store";
import MainNavBar from "../mainNavbar/page";
import { Provider } from "react-redux";

// export const metadata = {
//   title: "Dashboard",
//   description: "Toll Calculator Dashboard",
// };

export default function DashLayout({ children }) {
  return (
    <Provider store={store}>
      <div className="w-full max-w-[1600px] px-6 sm:px-7 md:px-8 lg:px-9 xl:px-24  mx-auto">
        <MainNavBar />

        <main>{children}</main>
      </div>
    </Provider>
  );
}
