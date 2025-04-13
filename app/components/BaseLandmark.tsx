import { ITimelineArrow } from "@/types";
import { useState, Fragment, act } from "react";
import { Dialog, DialogPanel, DialogTitle, Description, Transition, TransitionChild,
    Popover, PopoverPanel, PopoverButton
 } from "@headlessui/react";

interface IBaseLandmark {
    column: string;
    row: string;
    relationAngles: ITimelineArrow[];
    title: string;
    children?: React.ReactNode;
    innerStyle?: string;
    image?: string;
    bgColor: string;
    borderColor: string;
    activeEndYear?: number;
    birthyear?: number;
    deathyear?: number;
    year?: number;
    description?: string;
}

const svgBaseWidth= 250

const TimelineArrow=({startpoint, endpoint}: ITimelineArrow)=>{
    return(
        <Popover as="g">
                {({ open }) => (
                    <>
                    <PopoverButton as="path"
                        d={`M ${startpoint} A 100 100 45 0 1 ${endpoint}`}
                        fill="none"
                        stroke="#B2C063"
                        strokeWidth="4"
                        transform={`rotate(15)`}
                        className={`group-hover:scale-105 transition-all duration-300 ease-in-out
                            group-hover:stroke-5 cursor-pointer`}
                    ></PopoverButton>

                    {open && (
                        <div>
                            <PopoverPanel static className={`fixed top-1 right-1`}><p>asadsd</p></PopoverPanel>
                        </div>
                    )}
                    </>
                )}
                </Popover>
    //    <path
    //        d={`M ${startpoint} A 100 100 45 0 1 ${endpoint}`}
    //        fill="none"
    //        stroke="#B2C063"
    //        strokeWidth="4"
    //        transform={`rotate(15)`}
    //        className={`group-hover:scale-105 transition-all duration-300 ease-in-out
    //            group-hover:stroke-5`}
    //    />
   )
}

const BaseLandmark=({column, row, relationAngles, title, children, innerStyle, image,
    bgColor, borderColor, activeEndYear, birthyear, deathyear, year, description
}: IBaseLandmark)=>{
    let [isOpen, setIsOpen] = useState(false)
    let [popoverOpen, setPopoverOpen] = useState(false)
    let bgRules = '';
    if(image){bgRules = 'opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out'}
    return(
        <div className={` ${column} ${row}
            transition-all duration-300 ease-in-out group
            grid grid-cols-1 grid-rows-1 justify-items-center items-center`}>
            <svg height={'100%'} width={'100%'} fill={'red'}
                 viewBox={`${-svgBaseWidth / 2} ${-svgBaseWidth / 2} ${svgBaseWidth} ${svgBaseWidth}`}
                 className={`col-1 row-1`}>
                <circle r={svgBaseWidth / 2 } cx='0' cy='0' fill="none"
                        strokeWidth={'1'} stroke={'none'}/>
                <g>
                    {
                        relationAngles.map((angle, index) => {
                            return(
                                <TimelineArrow startpoint={angle.startpoint} endpoint={angle.endpoint} key={index}/>
                            )
                        })
                    }
                </g>
            </svg>
            {/* <Popover>
                {({ open }) => (
                    <>
                    <PopoverButton as="b">Solutions</PopoverButton>

                    {open && (
                        <div>
                            <PopoverPanel static><p>asadsd</p></PopoverPanel>
                        </div>
                    )}
                    </>
                )}
                </Popover> */}
            <div className={`col-1 row-1 border-4 ${borderColor} w-[75%] h-[75%] rounded-full ${image} 
            bg-cover bg-center cursor-pointer`}
            onClick={() => setIsOpen(true)}>
                <div className={`${bgColor} w-full h-full rounded-full flex flex-col justify-center items-center`}>
                    <div className={`h-[71%] w-[71%]  
                        ${bgRules} ${innerStyle}`}>
                        <p>{title}</p>
                        {children}
                    </div>
                </div>
            </div>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={()=>setIsOpen(false)}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <DialogPanel className={`${borderColor} border-6 w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}>
                        <div>
                            <DialogTitle
                                as="h3"
                                className="text-2xl font-medium leading-6 text-gray-900"
                            >
                                {title}
                            </DialogTitle>
                            {birthyear &&
                                <p className={`text-gray-500`}>{birthyear}-{deathyear}</p>
                            }
                            {activeEndYear &&
                                <p className={`text-gray-500`}>Active {year}-{activeEndYear}</p>
                            }
                        </div>
                        <div className="mt-2">
                            <p className="text-md text-gray-500">
                                {description}
                            </p>
                        </div>
                        </DialogPanel>
                    </TransitionChild>
                    </div>
                </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default BaseLandmark;