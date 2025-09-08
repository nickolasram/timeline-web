import { IThread } from "@/types";
import { useState, useRef, useEffect } from "react";
import {useTimelineContext} from "@/app/hooks/contexts";

interface ThreadGroupProps{
    thread: IThread;
} 

const ThreadGroup=({thread}: ThreadGroupProps)=>{
    const [cxyToggle, setCxyToggle] = useState(false);
    const [cycleToggle, setCycleToggle] = useState(false);
    const timelineContext = useTimelineContext();
    const leftParticleRef = useRef<SVGAnimateMotionElement>(null)
    const rightParticleRef = useRef<SVGAnimateMotionElement>(null)
    useEffect(()=>{
        if (timelineContext.visibleThreads.includes(thread)){
            setCxyToggle(true);
            setCycleToggle(true);
        } else {
            setCxyToggle(false);
            setCycleToggle(false);
            if (leftParticleRef.current){
                leftParticleRef.current!.beginElement();
                rightParticleRef.current!.beginElement();
            }
        }
        
    }, [timelineContext.visibleThreads])
    return(
        <g className={' z-4 '}>
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
            { timelineContext.visibleThreads.includes(thread) &&
                <g>
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
            }
            {/* HAVE TO INCLUDE A RADIUS TO SCALE*/}
            <circle 
                // cx={cxyToggle? thread.particleA.xDAP : 0}
                cx = {cxyToggle? thread.particleA.xDAP : thread.particleA.x}
                // cy={cxyToggle? thread.particleA.yDAP : 0}
                cy = {cxyToggle? thread.particleA.yDAP : thread.particleA.y}
                r={1}
                fill={thread.colorB}
                opacity={cxyToggle ? 0 : .75}
                className="transition-all duration-500"
                >
                {/* <animateMotion 
                    ref={leftParticleRef}
                    dur={'2s'}
                    repeatCount={cycleToggle ? '1' : 'indefinite'}
                    fill='freeze'
                    path={thread.particleA.path}
                /> */}
            </circle>
            <circle 
                // cx={cxyToggle? thread.particleB.xDAP : 0}
                cx = {cxyToggle? thread.particleB.xDAP : thread.particleB.x}
                // cy={cxyToggle? thread.particleB.yDAP : 0}
                cy = {cxyToggle? thread.particleB.yDAP : thread.particleB.y}
                r={1}
                fill={thread.colorA}
                opacity={cxyToggle ? 0 : .75}
                className="transition-all duration-500"
                >
                {/* <animateMotion 
                    ref={rightParticleRef}
                    dur={'2s'}
                    repeatCount={cycleToggle ? '1' : 'indefinite'}
                    fill='freeze'
                    path={thread.particleB.path}
                /> */}
            </circle>
        </g>
    )
}

export default ThreadGroup;