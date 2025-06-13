import {createContext, Dispatch, SetStateAction, useContext} from "react";

export const TimelineContext = createContext({
    timelineId: 0,
    year: 0,
    setYear: {} as Dispatch<SetStateAction<number>>,
    scrollbar: false,
    setScrollbar: {} as Dispatch<SetStateAction<boolean>>,
    dragScroll: true,
    setDragScroll: {} as Dispatch<SetStateAction<boolean>>,
    showTitles: false,
    setShowTitles: {} as Dispatch<SetStateAction<boolean>>,
    timelineID: '',
    presentationTitle: 'default',
    setPresentationTitle: {} as Dispatch<SetStateAction<string>>,
    presentationIndex: 0,
    setPresentationIndex: {} as Dispatch<SetStateAction<number>>,
    infoModalOpen: false,
    setInfoModalOpen: {} as Dispatch<SetStateAction<boolean>>,
    presentationHighIndex: 0,
    setPresentationHighIndex: {} as Dispatch<SetStateAction<number>>,
    presentationsSummary: [{}],
});

export const useTimelineContext = () => useContext(TimelineContext);