import {createContext, Dispatch, SetStateAction, useContext} from "react";

export const TimelineContext = createContext({
    year: 0,
    setYear: {} as Dispatch<SetStateAction<number>>,
    scrollbar: false,
    setScrollbar: {} as Dispatch<SetStateAction<boolean>>,
    dragScroll: true,
    setDragScroll: {} as Dispatch<SetStateAction<boolean>>,
    showTitles: false,
    setShowTitles: {} as Dispatch<SetStateAction<boolean>>,
    timelineID: ''
});

export const useTimelineContext = () => useContext(TimelineContext);