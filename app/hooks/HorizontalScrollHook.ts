import {useEffect, useRef} from "react";
import {useTimelineContext} from "@/app/hooks/contexts";
import data from '@/data.json'

export const useHorizontalScroll = () => {
    const scrollRef = useRef();
    const timelineContext = useTimelineContext();
    const timelineID = timelineContext.timelineID
    const yearsIndex = data[timelineID].yearsIndex;
    const onScroll = (e) => {
        const refValueHolder = scrollRef.current;
        refValueHolder.removeEventListener('scroll', onScroll);
        setTimeout(()=>{
            refValueHolder.addEventListener('scroll', onScroll);
            const width = document!.getElementById('timelineId')!.offsetWidth - window.screen.width
            const percentage = Math.round((refValueHolder.scrollLeft / width) * 100)
            timelineContext.setYear(yearsIndex[percentage])
        }, 1500)
    };
    useEffect(() => {
        // Store the ref value to unsubscribe from event during componentWillUnmount
        let refValueHolder = null;
        if (scrollRef) {
            refValueHolder = scrollRef.current;
            const width = document!.getElementById('timelineId')!.offsetWidth - window.screen.width
            const percentage = Math.round((refValueHolder.scrollLeft / width) * 100)
            timelineContext.setYear(yearsIndex[percentage])
            refValueHolder.addEventListener('scroll', onScroll);
        }
        return () => {
            refValueHolder.removeEventListener('scroll', onScroll);
        };
    }, []);

    return scrollRef;
};