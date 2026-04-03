import Masthead from "@/components/Masthead";
import Marquee from "@/components/Marquee";
import Pulse from "@/components/Pulse";
import Arsenal from "@/components/Arsenal";
import Ledger from "@/components/Ledger";
import Blueprint from "@/components/Blueprint";
import Acclaim from "@/components/Acclaim";
import Engage from "@/components/Engage";
import Baseline from "@/components/Baseline";
import ScrollDirector from "@/components/ScrollDirector";

export default function Page() {
  return (
    <>
      <ScrollDirector />
      <Masthead />
      <main>
        <Marquee />
        <Pulse />
        <Arsenal />
        <Ledger />
        <Blueprint />
        <Acclaim />
        <Engage />
      </main>
      <Baseline />
    </>
  );
}
