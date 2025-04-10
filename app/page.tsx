'use client'

// import Image from "next/image";
import TimelineTickbar from "@/app/components/TimelineTickbar";
import Timeline from "@/app/components/Timeline";

export default function Home() {
        return (
    <div className="">
      <main>
          <Timeline />
        {/*<Image*/}
        {/*  className="dark:invert"*/}
        {/*  src="/next.svg"*/}
        {/*  alt="Next.js logo"*/}
        {/*  width={180}*/}
        {/*  height={38}*/}
        {/*  priority*/}
        {/*/>*/}
      </main>
      {/*<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">*/}
      {/*</footer>*/}
        <TimelineTickbar/>
    </div>
  );
}
