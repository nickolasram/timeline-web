import {ILandmark} from "@/types";
import {Dispatch, Fragment, ReactNode, SetStateAction} from "react";
import {Dialog, DialogPanel, DialogTitle, Transition, TransitionChild} from "@headlessui/react";
import {useTimelineContext} from "@/app/hooks/contexts";
import Link from 'next/link'
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Button } from '@headlessui/react'

interface IInfoModal{
    landmark : ILandmark;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    timelineId: string;
}

const shimmer = () => `
<svg width="250" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#bbb" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#bbb" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="250" height="250" fill="#bbb" />
  <rect id="r" width="250" height="250" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-250" to="250" dur="500ms" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const InfoModal =({landmark, isOpen, setIsOpen}: IInfoModal)=>{
    const [imgWidth, setImgWidth] = useState(250)
    const [loaded, setLoaded] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [presentation, setPresentation] = useState(false)
    let yearString = `${landmark.year}`
    if (landmark.person) yearString = 'active: ' + yearString
    if (landmark.activeEndYear) yearString += ` - ${landmark.activeEndYear}`
    if (landmark.eraEndYear) yearString += ` - ${landmark.eraEndYear}`
    let lifeYearString = `${landmark.birthYear} -`
    if (landmark.deathYear) lifeYearString += ` ${landmark.deathYear}`
    const timelineContext = useTimelineContext();
    const fullScreenRef = useRef(null);
    useEffect(() => {
        const exitHandler= (e:any) => {
            // if (presentation){
                setPresentation(!presentation);
            // }
            
        }
        document.addEventListener('fullscreenchange', exitHandler);
        document.addEventListener('mozfullscreenchange', exitHandler);
        document.addEventListener('MSFullscreenChange', exitHandler);
        document.addEventListener('webkitfullscreenchange', exitHandler);
    }, [])
    useEffect(()=>{
        if (landmark.image && !loaded && isOpen){
            const img = document.createElement('img');
            img.src = landmark.image;
            img.onload = () => setImgWidth(250 * (img.naturalWidth/img.naturalHeight));
            setLoaded(true)
        }
    }, [isOpen])
    return(
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-90" onClose={()=>setIsOpen(false)}>
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
                            <DialogPanel className={`${landmark.borderColor} border-6 transform
                                ${expanded? 'h-screen w-screen' : 'min-w-lg max-w-[70dvw] max-h-[calc(95vh-4rem)]'} 
                                overflow-y-auto rounded-2xl bg-white px-6 pb-6 text-left align-middle shadow-xl transition-all
                                `}
                                ref={fullScreenRef}>
                                <div>                                    
                                    <div className={`${landmark.image? 'min-h-[282px]':''} mb-7`}>
                                        { landmark.image &&
                                            <Image 
                                                src={landmark.image}
                                                height = {250}
                                                width = {imgWidth}
                                                alt = ""
                                                className={'float-left mt-[32px] mb-6 mr-6'}
                                                loading="lazy"
                                                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer())}`}
                                            />
                                        }
                                        <div className={''}>
                                            <div className="h-[32px] flex items-center justify-end gap-3">
                                                <p className={`text-black`}>{presentation ? 'a' : 'b'}</p>
                                            <Button
                                                className={`active:text-gray-500 cursor-pointer`}
                                                onClick={()=>{
                                                    if(!presentation){
                                                        // setPresentation(true)
                                                        if (fullScreenRef.current.requestFullscreen) {
                                                            fullScreenRef.current.requestFullscreen();
                                                        } else if (fullScreenRef.current.webkitRequestFullscreen) { /* Safari */
                                                            fullScreenRef.current.webkitRequestFullscreen();
                                                        } else if (fullScreenRef.current.msRequestFullscreen) { /* IE11 */
                                                            fullScreenRef.current.msRequestFullscreen();
                                                        }
                                                    } else {
                                                        if (document.exitFullscreen) {
                                                            document.exitFullscreen();
                                                        } else if (document.webkitExitFullscreen) { /* Safari */
                                                            document.webkitExitFullscreen();
                                                        } else if (document.msExitFullscreen) { /* IE11 */
                                                            document.msExitFullscreen();
                                                        }
                                                    }
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    strokeWidth="1.5" 
                                                    stroke="black" 
                                                    className="size-6">
                                                    <path strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    transform="scale(0.75) translate(3,3)"
                                                    d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                    <rect 
                                                    width="21" 
                                                    height="21" 
                                                    x="1.5" 
                                                    y="2" 
                                                    rx="2" 
                                                    ry="2" 
                                                    fill="none" 
                                                    stroke='black' 
                                                    // strokeLinecap="round" 
                                                    // strokeLinejoin="round"
                                                    strokeWidth="1.5"
                                                    />
                                                </svg>

                                            </Button>
                                            <Button
                                                className={`active:text-gray-500 cursor-pointer`}
                                                onClick={()=>setExpanded(!expanded)}
                                            >
                                                { expanded &&
                                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                                        fill="none" 
                                                        viewBox="0 0 24 24" 
                                                        strokeWidth="1.5" 
                                                        stroke="black" 
                                                        className="size-6">
                                                        <path strokeLinecap="round" 
                                                            strokeLinejoin="round" 
                                                            d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
                                                    </svg>
                                                }
                                                { !expanded &&
                                                    <svg xmlns="http://www.w3.org/2000/svg" 
                                                        fill="none" 
                                                        viewBox="0 0 24 24" 
                                                        strokeWidth="1.5" 
                                                        stroke="black" 
                                                        className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                                                    </svg>
                                                }
                                            </Button>
                                                
                                                
                                                <Link href={`../landmark/${timelineContext.timelineID}/${landmark.id}`} target={'_blank'}
                                                            className={``}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                        strokeWidth={1.5}
                                                        stroke="black"
                                                        className="size-6 cursor-pointer">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                                    </svg>
                                                </Link>
                                            </div>
                                            <DialogTitle
                                                as="h3"
                                                className="text-2xl font-medium leading-6 pb-2 text-gray-900">
                                                {landmark.title}
                                            </DialogTitle>
                                                {
                                                    landmark.displayDate &&
                                                    <div className={''}>
                                                        {/* birth (and death) year(s) */}
                                                        {landmark.birthYear &&
                                                            <p  className={`text-gray-900`}>{lifeYearString}</p>
                                                        }
                                                        {/* year(s) */}
                                                        <p className={`text-gray-900`}>{yearString}</p>
                                                    </div>
                                                }
                                                {landmark.intro &&
                                                    <p className={'italic pt-1 text-gray-700 max-w-xl'}>{landmark.intro}</p>
                                                }
                                        </div>
                                    </div>
                                    <div>
                                        {landmark.keyPoints &&
                                            <div className={`${landmark.bgColor} text-black p-3`}>
                                                <ul className={'list-disc list-inside'}>
                                                    {landmark.keyPoints.map((point, index)=>{
                                                        return(
                                                            <li key={index} className={'pb-2'}>{point}</li>
                                                        )
                                                    })
                                                    }
                                                </ul>
                                            </div>
                                        }
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-md text-gray-900  max-w-xl">
                                            {landmark.description}
                                        </p>
                                    </div>
                                    <div>
                                        {landmark.link &&
                                            <section>
                                                <h4 className={'text-gray-900 pt-1 font-bold'}>Links:</h4>
                                                <a href={landmark.link} target={'_blank'} className={'text-gray-900'}>{landmark.link}</a>
                                            </section>
                                        }
                                    </div>
                                {/*related*/}
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default InfoModal;