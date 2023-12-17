import LandingPage from "@/components/landingPage/page";
import Image from "next/image";
import Link from "next/link";
// import { store } from "../redux/store";
// import { Provider } from "react-redux";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24 p-6">
      <LandingPage />
    </main>
  );
}
