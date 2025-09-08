import Landmark from "@/app/components/Landmark";
import {useHorizontalScroll} from "@/app/hooks/HorizontalScrollHook";
import TimelineTickbar from "@/app/components/TimelineTickbar";
import Navbar from "@/app/components/Navbar";
import React, { useState } from "react";
import { useDraggable } from "react-use-draggable-scroll";
import {useTimelineContext} from "@/app/hooks/contexts";
import {IThread, ITimeline} from "@/types";
import ThreadPopoutItem from "@/app/components/ThreadPopoutItem";
import ThreadGroup from "./ThreadGroup";

interface ITimelineProps {
    timelineData: ITimeline;
}


const Timeline = ({timelineData}: ITimelineProps) => {
    const [threadsPopOutVisible, setThreadsPopOutVisible] = useState<boolean>(true);
    const landmarks = timelineData.landmarks;
    const meta = timelineData.meta;
    const years = timelineData.years;
    const scrollRef = useHorizontalScroll();
    const presentations = timelineData.presentations;
    const presentationsMeta = presentations.map(a => a.meta)
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
            <Navbar meta={meta} landmarks={landmarks} presentationsMeta={presentationsMeta} />
            <section  id='timelineId' className={`bg-[#0b030f] grid grid-rows-12 w-fit min-w-screen sticky top-[4rem]
                                                ${heightValues}`}>
                <svg
                    className={`col-start-1 ${timelineContext.svgColumns} row-start-1 row-end-13`}
                    viewBox={`0 0 ${timelineContext.columns*10} 120`}
                >
                    <defs>
                        <linearGradient id={'shuttle'}
                        >
                            <stop offset="0%" stopColor="#bd791900" />
                            <stop offset="10%" stopColor="#aaa" />
                            <stop offset="20%" stopColor="#bd791900" />
                            <animateTransform
                                attributeName={'gradientTransform'}
                                attributeType="XML"
                                type={'translate'}
                                from={'-0.75, 0'}
                                to={'1, 0'}
                                dur="1.5s"
                                repeatCount="indefinite"
                            />
                        </linearGradient>
                        <filter id="threadGlow">
                            <feDropShadow dx="0" dy="0" stdDeviation="0.5" floodColor={'white'} />
                        </filter>
                    </defs>
                { timelineContext.threads.map((thread, i) =>{
                  //   TODO: Tooltip should show both terminals
                  //   TODO: Fix terminal marker point on 1x1 nodes
                  return (
                      <ThreadGroup key={i} thread={thread} />
                  )
                })
                }
                </svg>
                {
                    landmarks.map((landmark, index) => {
                        return (
                            <Landmark landmark={landmark} key={index}/>
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
            { timelineContext.toggledLandmarks.length > 0 &&
                <div className={'absolute w-screen top-0'}>
                    <div className={'sticky left-0 h-full w-full'}>
                        <div className={`relative`}>
                            <div className={`h-[calc(97.5dvh-4rem)] mt-[4rem] w-[6ch] hover:w-[16ch] absolute right-0 bg-gray-600/50 z-6
                                            transition-all duration-200 pl-[1ch] hover:pr-[1ch] group hover:mask-none mask-l-from-30%
                                            mask-b-from-30% hover:backdrop-blur-[2px] pt-3 ${threadsPopOutVisible?'':'invisible'}`}>
                                {
                                    timelineContext.toggledLandmarks.map((landmark, i) =>{
                                        return (
                                            <ThreadPopoutItem landmark={landmark} key={i}/>
                                        )
                                    })

                                }
                            </div>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth="1.5" 
                                stroke="currentColor" 
                                className="size-6 absolute right-5 mt-[4rem] top-1 z-7 cursor-pointer"
                                onClick={()=>{setThreadsPopOutVisible(!threadsPopOutVisible)}}
                                >
                                    { threadsPopOutVisible &&
                                    <g>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </g>
                                    }
                                    { !threadsPopOutVisible &&
                                    <g>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                    </g>
                                    }
                            </svg>

                        </div>
                    </div>
                </div>
            }
            <TimelineTickbar years={years} />
        </div>
    )
}

export default Timeline;