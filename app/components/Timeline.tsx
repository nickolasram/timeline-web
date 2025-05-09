import Landmark from "@/app/components/Landmark";
import {useHorizontalScroll} from "@/app/hooks/HorizontalScrollHook";
import TimelineTickbar from "@/app/components/TimelineTickbar";
import Navbar from "@/app/components/Navbar";
import React from "react";
import { useDraggable } from "react-use-draggable-scroll";
import {useTimelineContext} from "@/app/hooks/contexts";
import {ITimeline} from "@/types";

interface ITimelineProps {
    timelineData: ITimeline;
}


const Timeline = ({timelineData}: ITimelineProps) => {
    const landmarks = timelineData.landmarks;
    const meta = timelineData.meta;
    const years = timelineData.years;
    const scrollRef = useHorizontalScroll();
    const timelineContext = useTimelineContext();
    let { events } = useDraggable(scrollRef);
    if (!timelineContext.dragScroll){
        events = {}
    }
    const heightValues =  timelineContext.scrollbar ? 'h-[calc(96dvh-4rem)] auto-cols-[calc((96dvh-4rem)/12)]' :
            'h-[calc(97.5dvh-4rem)] auto-cols-[calc((97.5dvh-4rem)/12)]'
    return(
        <div ref={scrollRef}
             {...events}
             className={`max-w-screen timeline-scrollbar overflow-y-hidden 
                        ${timelineContext.scrollbar ? 'overflow-x-scroll' : 'overflow-x-hidden'}
                        `}>
            <Navbar meta={meta} landmarks={landmarks} />
            <section id='timelineId' className={`bg-[#0b030f] grid grid-rows-12 w-fit min-w-screen sticky top-[4rem]
                                                ${heightValues}`}>
                {
                    landmarks.map((landmark, index) => {
                        return (
                            <Landmark landmark={landmark} key={index} />
                        )
                    })
                }
                {
                    years.map((year, index) => {
                        if(!year.placeholder){
                            return (
                                <div className={`${year.bgYearColumn} row-start-3 row-end-10`} key={index}>
                                    <p className={`[writing-mode:vertical-rl] [text-orientation:upright]
                                                bg-red-50 select-none bg-radial
                                                from-gray-900 from-0% via-[#2b232f] via-30% to-gray-950 to-85%
                                                text-7xl bg-clip-text text-transparent font-black
                                                ${year.firstEra ? '' : 'hover:brightness-200'} transition-all`}>
                                        {year.year}</p>
                                </div>
                            )
                        }
                    })
                }
            </section>
            <TimelineTickbar years={years} />
        </div>
    )
}

export default Timeline;