import localFont from "next/font/local";
import ReportLoanUser from "@/components/custom-ui/ReportLoanUser";
import UserCredit from "@/components/custom-ui/UserCredit";
import WorkingPaper from "@/components/custom-ui/WorkingPaper";

const geistMono = localFont({
  src: '../fonts/Geist_Mono/GeistMono-VariableFont_wght.ttf',
  variable: "--font-geist-mono",
  weight: '100 900',
});

export default function Home() {
  return (
      <div className={`${geistMono.variable} font-sans`}>
        <ReportLoanUser/>
        <UserCredit/>
        <WorkingPaper/>
      </div>
  );
}