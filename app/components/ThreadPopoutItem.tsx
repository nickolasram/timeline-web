import { ILandmark } from "@/types"
import { useState } from "react";
import {useTimelineContext} from "@/app/hooks/contexts";

interface IThreadPopoutItem {
    landmark: ILandmark
}

const ThreadPopoutItem =({landmark}: IThreadPopoutItem)=>{
    const [expanded, setExpanded] = useState<boolean>(true);
    const timelineContext = useTimelineContext();
    const expandedString = 'grid-rows-[1fr]';
    const collapsedString = 'grid-rows-[0fr]';
    const isTerminal=(thread: IThread, id: string)=>{
        return thread.terminalA == id || thread.terminalB == id;
    }
    return (
        <div className={`overflow-x-hidden pt-6`}>
            <div className="flex justify-end gap-2 invisible group-hover:visible pb-1">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="2" 
                    stroke="#aaa" 
                    className="w-[1ch] h-[1ch] cursor-pointer"
                    onClick={()=>{
                        setExpanded(!expanded);
                    }}
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M0 13L24 13" />
                </svg>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth="2" 
                    stroke="#aaa" 
                    className="w-[1ch] h-[1ch] cursor-pointer"
                    onClick={()=>{
                        const filteredLandmarks = timelineContext.toggledLandmarks.filter((obj)=>{obj != landmark})
                        timelineContext.setToggledLandmarks(filteredLandmarks)
                        const unrelatedThreads=timelineContext.visibleThreads.filter(obj=>!isTerminal(obj, landmark.id))
                        timelineContext.setVisibleThreads(unrelatedThreads)
                    }}
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M0 0L 24 24M0 24L 24 0" />
                </svg>
            </div>

{/* ONCLICK NAVIGATE TO LANDMARK */}

            <p className={`whitespace-nowrap
                ${landmark.title.length > 14 ? 'scroll-to-show hover:mask-none group-hover:mask-r-from-30%' : ''}
            `}>
                {landmark.title}
            </p>
            <div className={`border-t-1 grid border-white ${expanded? expandedString : collapsedString} transition-all duration-200`}>
                <div className="overflow-hidden">
            {
                timelineContext.visibleThreads.filter(obj=>isTerminal(obj, landmark.id)).map((thread, i) =>{
                    const titleInUse = landmark.id == thread.terminalA ? thread.titleB : thread.titleA
                    const terminalInUse = landmark.id == thread.terminalA ? thread.terminalB : thread.terminalA
                    return (
                        <div  key={i} 
                            className="flex justify-between items-center"
                        >
                            <div className={`border-l-[1ch] 
                                            ${landmark.id == thread.terminalA ? thread.borderColorB : thread.borderColorA} 
                                            group-hover:w-[11ch] overflow-hidden`}>
                                <p  
                                className={`whitespace-nowrap text-gray-300 pl-[1ch] cursor-pointer 
                                    
                                ${titleInUse.length > 11 ? ' small-scroll-to-show hover:mask-none group-hover:mask-r-from-70%' : ''}
                                `}
                                onClick={()=>{
                                    const element = document!.getElementById(terminalInUse)!
                                    element.scrollIntoView({ behavior: "smooth", block: "end", inline: "center" })
                                    element.classList.add('animate-[blinker_500ms_linear_5]')
                                    setTimeout(function () {
                                        element.classList.remove('animate-[blinker_500ms_linear_5]')
                                    }, 5000);
                                }}>
                                    {titleInUse}
                                </p>
                            </div>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth="2" 
                                stroke="#aaa" 
                                className="w-[1ch] h-[1ch] invisible group-hover:visible cursor-pointer"
                                onClick={()=>{
                                    const filteredThreads = timelineContext.visibleThreads.filter(obj=>obj!=thread)
                                    timelineContext.setVisibleThreads(filteredThreads)
                                }}
                                >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M0 0L 24 24M0 24L 24 0" />
                            </svg>
                        </div>
                    )
                })
            }
            </div>
            </div>
        </div>
    )
}

export default ThreadPopoutItem;