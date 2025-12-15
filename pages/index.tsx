import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import ReportLoanUser from "@/components/custom-ui/ReportLoanUser";
import UserCredit from "@/components/custom-ui/UserCredit";
import WorkingPaper from "@/components/custom-ui/WorkingPaper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} ${geistMono.className}`}
    >
      <ReportLoanUser/>
      <UserCredit/>
      <WorkingPaper/>
    </div>
  );
}
