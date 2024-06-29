import { Inter } from "next/font/google";
import Cal2Text from "./components/Cal2Text";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-12 ${inter.className}`}
    >
      cal2text
      <Cal2Text/>
    </main>
  );
}
