import Image from "next/image";
import Link from "next/link";
// import { store } from "../redux/store";
// import { Provider } from "react-redux";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/dashboard">Link to about page</Link>
    </main>
  );
}
