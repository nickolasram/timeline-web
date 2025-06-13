import {ILandmark} from "@/types";
import {useState} from "react";
import RelationshipModal from "@/app/components/RelationshipModal";
import {useTimelineContext} from "@/app/hooks/contexts";

interface INodeLandmark {
    landmark: ILandmark;
}

const NodeLandmark =({landmark}:INodeLandmark)=>{
    const [isOpen, setIsOpen] = useState(false)
    const timelineContext = useTimelineContext();
    return(
        <div className={`${landmark.column} ${landmark.row}
            transition-all duration-300 ease-in-out group hover:z-70 z-5
            grid grid-cols-1 grid-rows-1 justify-items-center items-center
            ${landmark.relationshipGroups ? 'cursor-pointer' : ''}`}>
                {/* inner circle */}
                <div id={landmark.id}
                     onClick={() => {
                         timelineContext.setDragScroll(false);
                         setIsOpen(true)
                     }}
                     className={`${landmark.bgColor} w-full h-full 
                    rounded-full flex flex-col 
                    justify-center items-center
                    `}>
                    <p className={`text-[.75rem] hover:text-[.9rem] transition-all text-center line-clamp-3 hover:line-clamp-none
                    text-shadow-[1px_0_2px_rgb(0_0_0_/_1)_,_-1px_0_2px_rgb(0_0_0_/_1)_,_0_-1px_2px_rgb(0_0_0_/_1)_,_0_1px_2px_rgb(0_0_0_/_1)]
                    `}>{landmark.title}</p>
                </div>
            {/* modal */}
            { landmark.relationshipGroups &&
                <RelationshipModal landmark={landmark} isOpen={isOpen} setIsOpen={setIsOpen}/>
            }
        </div>
    )
}
export default NodeLandmark;