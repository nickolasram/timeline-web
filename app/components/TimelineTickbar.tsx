import {IYear} from "@/types";
import {useEffect, useState} from "react";
import {useTimelineContext} from "@/app/hooks/contexts";

interface ITick{
    year: IYear;
}

interface ITimelineTickbar{
    years: IYear[];
}

const Tick =({year}: ITick)=>{
    const [isRendered, setRendered] = useState(false);
    const [yearHighlight, setYearHighlight] = useState<boolean>(false);
    const timelineContext = useTimelineContext();
    useEffect(() => {
        setRendered(true);

        return () => {
            setRendered(false);
        }
    }, []);
    useEffect(() => {
        if(timelineContext.year == year.year){
            setYearHighlight(true);
        }
        else setYearHighlight(false);
    }, [timelineContext.year, year.year]);
    let color = 'text-white';
    let hoverSize = 'hover:text-2xl'
    let beforeHoverSize = 'before:text-sm'
    let label = year.hoverContent
    if (year.placeholder){
        color = 'text-gray-500'
        hoverSize = 'hover:text-lg'
        beforeHoverSize = 'before:text-2xs'
    }
    if (year.span){
        label = ''
    }
    if(year.span){
        return(
            <div className={`
            w-[1ch]
            bg-conic-[#55555500_10%,#55555522_50%,#55555522_60%,#55555500_90%]
            `}>
                <p className={`invisible`}>s</p>
            </div>
        )
    }
    let element: HTMLElement;
    if (typeof year.firstId === "string" && isRendered) {
        element = document!.getElementById(year.firstId)!
    }
    let tickStyle = `cursor-pointer ${color} ${hoverSize}
                            relative 
                            hover:w-[1ch] hover:rounded-t-4xl 
                            before:absolute before:-top-4
                            before:left-0 before:text-sm
                            bg-gradient-to-t 
                            from-[#55555522] from-25%
                            to-[#55555500] to-75%
                            ${label} ${beforeHoverSize} w-[0.75ch] text-center`
    if (yearHighlight){
        tickStyle = `cursor-pointer text-white text-2xl
                    relative 
                    rounded-t-4xl 
                    before:absolute before:-top-4
                    before:left-0 before:text-sm
                    bg-gradient-to-t 
                    from-[#55555522] from-25%
                    to-[#55555500] to-75%
                    ${year.setContent} before:text-sm w-[1ch] text-center`
    }
    return(
        <p className={tickStyle}
            onClick={()=>{
                if(!year.placeholder){
                    timelineContext.setYear(year.year)
                    element.scrollIntoView({ behavior: "smooth", block: "end", inline: "center" })
                }
            }}
        >|</p>
    )
}

const TimelineTickbar =({years}: ITimelineTickbar)=>{
    const timelineContext = useTimelineContext();
    return(
        <div className={`width-dvw min-w-dvw h-[2.5dvh] bg-[#0b030f] flex
         justify-center items-end sticky left-0 ${timelineContext.scrollbar ? 'top-[96dvh]' : 'top-[97.5dvh]'}`}>
            <div className={`
            w-[1ch] h-4/5
            bg-radial-[at_0%_10%] 
            from-[#00000000] from-50%
            via-[#55555506] via-60%
            to-[#5555552f] to-70%
            `}>
                <p className={`invisible`}>s</p>
            </div>
            {
                years.map((year, index)=>{
                    return (<Tick year={year} key={index}/>)
                })
            }
            <div className={`
            w-[1ch] h-4/5
            bg-radial-[at_100%_10%] 
            from-[#00000000] from-50%
            via-[#55555518] via-60% 
            to-[#5555552f] to-70% 
            `}>
                <p className={`invisible`}>s</p>
            </div>
        </div>
    )
}

export default TimelineTickbar;