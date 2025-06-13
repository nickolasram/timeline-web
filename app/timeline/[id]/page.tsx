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
    const [scrollbarVisible, setScrollbarVisible] = useState(true);
    const [dragScroll, setDragScroll] = useState(false);
    const [showTitles, setShowTitles] = useState<boolean>(false);
    const [presentationTitle, setPresentationTitle] = useState<string>('default');
    const [presentationIndex, setPresentationIndex] = useState<number>(0);
    const [infoModalOpen, setInfoModalOpen] = useState(false);
    const presentationObject = timeline.presentations.find(obj => obj.meta.title == presentationTitle)
    const [presentationHighIndex, setPresentationHighIndex] = useState<number>(presentationObject!.meta.highIndex);
    const value ={year: yearValue, setYear: setYearValue, scrollbar: scrollbarVisible, setScrollbar: setScrollbarVisible,
        dragScroll: dragScroll, setDragScroll: setDragScroll, showTitles: showTitles, setShowTitles: setShowTitles,
        timelineID: params.id, presentationTitle: presentationTitle, setPresentationTitle: setPresentationTitle,
        presentationIndex: presentationIndex, setPresentationIndex: setPresentationIndex, timelineId: timeline,
        infoModalOpen: infoModalOpen, setInfoModalOpen: setInfoModalOpen, presentationHighIndex: presentationHighIndex,
        setPresentationHighIndex: setPresentationHighIndex, presentationsSummary: timeline.presentationsSummary
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