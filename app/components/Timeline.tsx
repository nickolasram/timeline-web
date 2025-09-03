import Landmark from "@/app/components/Landmark";
import {useHorizontalScroll} from "@/app/hooks/HorizontalScrollHook";
import TimelineTickbar from "@/app/components/TimelineTickbar";
import Navbar from "@/app/components/Navbar";
import React from "react";
import { useDraggable } from "react-use-draggable-scroll";
import {useTimelineContext} from "@/app/hooks/contexts";
import {IThread, ITimeline} from "@/types";

interface ITimelineProps {
    timelineData: ITimeline;
}


const Timeline = ({timelineData}: ITimelineProps) => {
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
    const isTerminal=(thread: IThread, id: string)=>{
        return thread.terminalA == id || thread.terminalB == id;
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
                { timelineContext.visibleThreads.map((thread, i) =>{
                  //   TODO: Make sure colors A and B always relate to the earlier and later landmark
                  //   TODO: Tooltip should show both terminals
                  //   TODO: Fix terminal marker point on 1x1 nodes
                  return (
                      <g key={i} className={' z-4 '}>
                          <defs>
                              {/*Only need gradient if multiple colors*/}
                              <linearGradient id={thread.gradientId}
                              >
                                  <stop offset="0%" stopColor={thread.colorB} />
                                  <stop offset="100%" stopColor={thread.colorA} />
                              </linearGradient>
                              <marker
                                  id={thread.markerA}
                                  viewBox="0 0 10 10"
                                  refX="5"
                                  refY="5"
                                  markerUnits="strokeWidth"
                                  markerWidth="10"
                                  markerHeight="10"
                                  orient="auto">
                                  <circle
                                    r={2}
                                    cx={5}
                                    cy={5}
                                    fill={thread.colorA}
                                  />
                              </marker>
                              <marker
                                  id={thread.markerB}
                                  viewBox="0 0 10 10"
                                  refX="5"
                                  refY="5"
                                  markerUnits="strokeWidth"
                                  markerWidth="10"
                                  markerHeight="10"
                                  orient="auto">
                                  <circle
                                      r={2}
                                      cx={5}
                                      cy={5}
                                      fill={thread.colorB}
                                  />
                              </marker>
                          </defs>
                          <path
                              d={thread.d}
                              stroke={`url(#${thread.gradientId})`}
                              strokeWidth={0.25}
                              filter={`url(#threadGlow)`}
                              markerEnd={`url(#${thread.markerA})`}
                              markerStart={`url(#${thread.markerB})`}
                              opacity={0.75}
                          >
                          </path>
                          <path
                              d={thread.d}
                              stroke={'url(#shuttle)'}
                              strokeWidth={0.25}
                              filter={`url(#threadGlow)`}
                          />
                          <path
                              d={thread.d}
                              stroke={'#00000000'}
                              strokeWidth={1}
                              className={'cursor-help'}
                          >
                              <title>
                                  {thread.title}
                              </title>
                          </path>
                      </g>
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
            { timelineContext.visibleThreads.length > 0 &&
                <div className={'absolute w-screen top-0'}>
                    <div className={'sticky left-0 h-full w-full'}>
                        <div className={`relative`}>
                            <div className={`h-[calc(97.5dvh-4rem)] mt-[4rem] w-[6ch] hover:w-[16ch] absolute right-0 bg-blue-950 z-6
                                            transition-all duration-200 pl-[1ch] hover:pr-[1ch]`}>
                                {
                                    timelineContext.toggledLandmarks.map((landmark, i) =>{
                                        return (
                                            <div key={i} className={'overflow-x-hidden'}>
                                                {/*TODO: DEFINE HOVER ANIMATION*/}
                                                <p className={`whitespace-nowrap border-1 border-orange-50
                                                    ${landmark.title.length > 14 ? 'scroll-to-show' : ''}
                                                `}>
                                                    {landmark.title}
                                                </p>
                                                {
                                                    timelineContext.visibleThreads.filter(obj=>isTerminal(obj, landmark.id)).map((thread, i) =>{
                                                        return (
                                                            <p key={i}  className={'whitespace-nowrap'}>
                                                                {thread.title}
                                                            </p>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    })

                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            <TimelineTickbar years={years} />
        </div>
    )
}

export default Timeline;