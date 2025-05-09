'use client'
import data from '@/data.json';
import {ITimeline} from "@/types";
import React, {useState} from "react";
import Timeline from "@/app/components/Timeline";
import {TimelineContext} from "@/app/hooks/contexts";

interface ITimelinePage{
    id: string;
}

export default function TimelinePage(
    {params}: {params: ITimelinePage}){
    params = React.use(params)
    const timeline: ITimeline = data[params.id];
    const [yearValue, setYearValue] = useState<number>(1900);
    const [scrollbarVisible, setScrollbarVisible] = useState(false);
    const [dragScroll, setDragScroll] = useState(true);
    const [showTitles, setShowTitles] = useState<boolean>(false);
    const value ={year: yearValue, setYear: setYearValue, scrollbar: scrollbarVisible, setScrollbar: setScrollbarVisible,
        dragScroll: dragScroll, setDragScroll: setDragScroll, showTitles: showTitles, setShowTitles: setShowTitles,
        timelineID: params.id,
    }
    if(timeline){
        return(
            <TimelineContext.Provider value={value}>
                <div>
                    <main>
                        <Timeline timelineData={timeline} />
                    </main>
                </div>
            </TimelineContext.Provider>
        )
    }
}