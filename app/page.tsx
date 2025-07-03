'use client'
import data from '@/data.json';
import {ITimeline} from "@/types";
import {useState, useEffect} from "react";
import TourPopout from "@/app/components/TourPopout";
import {Button} from '@headlessui/react'
import Tour from "@/app/components/Tour";

const getTimelineName =(id: string)=>{
    // @ts-ignore
    const timeline: ITimeline = data[id];
    return timeline.meta.timelineTitle;
}

export default function Home() {
    const [showTour, setShowTour] = useState(false);
    const keys = Object.keys(data);

    useEffect(() => {
        window.addEventListener('beforeunload', () => {
           setShowTour(false);
        });
    }, []);

    return (
        <div>
            <main className={'ml-2 mt-2'}>
                <h1 className={'text-2xl font-bold mb-4'}>
                    Educational Timeline platform
                </h1>
                <h2 className={'text-xl font-bold'}>
                    Check out this platform&apos;s features with The Tour:
                </h2>
                <Button className={'mb-4'} onClick={() => setShowTour(!showTour)}>
                    Open Tour
                </Button>
                <h2 className={'text-xl font-bold'}>
                    Or select a demo timeline to view:
                </h2>
                {keys.map((key, index) => {
                    return (
                        <p key={index}>
                            <a href={`timeline/${key}`} target={`_blank`}>
                                {getTimelineName(key)}
                            </a>
                        </p>
                    )
                })}
                { showTour &&
                    <TourPopout closeWindow={()=>{setShowTour(false)}}>
                        <Tour />
                    </TourPopout>
                }
            </main>
        </div>
  );
}