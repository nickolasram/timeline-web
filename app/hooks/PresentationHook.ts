import data from '@/data.json'
import {ITimeline} from "@/types";
import {useTimelineContext} from "@/app/hooks/contexts";

export const useUpdatePresentation = () => {
    const timelineContext = useTimelineContext();
    const updatePresentation =(adjustment:number)=>{
        const timelineID = timelineContext.timelineID;
        const timelineData: ITimeline = data[timelineID];
        const presentations = timelineData.presentations;
        const presentation = presentations.find(object => object.meta.title === timelineContext.presentationTitle)
        const newIndex = Math.min(Math.max(timelineContext.presentationIndex+adjustment, 0), timelineContext.presentationHighIndex);
        timelineContext.setPresentationIndex(newIndex)
        const landmarkId = presentation!.landmarkIDs[newIndex]
        return timelineData.landmarks.find(object => object.id === landmarkId)
    }
    return updatePresentation
}