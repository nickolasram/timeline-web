import {ILandmark} from "@/types";
import {Dispatch, Fragment, SetStateAction, useCallback} from "react";
import {Dialog, DialogPanel, DialogTitle, Transition, TransitionChild, Menu, MenuButton, MenuItem, MenuItems, Button} from "@headlessui/react";
import {useTimelineContext} from "@/app/hooks/contexts";
import Link from 'next/link'
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import ImageModal from "@/app/components/ImageModal";
import {useUpdatePresentation} from "@/app/hooks/PresentationHook";

interface IInfoModal{
    initialLandmark : ILandmark;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    openInPresentation?: boolean;
}

const shimmer = () => `
<svg width="250" height="250" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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

const InfoModal =({initialLandmark, isOpen, setIsOpen, openInPresentation}: IInfoModal)=>{
    const [landmark, setLandmark] = useState<ILandmark>(initialLandmark);
    const [imgWidth, setImgWidth] = useState(250)
    const [loaded, setLoaded] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [presentation, setPresentation] = useState(false)
    const [imageModalOpen, setImageModalOpen] = useState(false)
    const [opacityValue, setOpacityValue] = useState('');
    const [expandDropdown, setExpandDropdown] = useState<boolean>(false)
    const [blinkerAnimation, setBlinkerAnimation] = useState<boolean|undefined>(openInPresentation)
    const updatePresentation = useUpdatePresentation(false)
    let yearString = `${landmark.year}`
    if (landmark.person) yearString = 'active: ' + yearString
    if (landmark.activeEndYear) yearString += ` - ${landmark.activeEndYear}`
    if (landmark.eraEndYear) yearString += ` - ${landmark.eraEndYear}`
    let lifeYearString = `${landmark.birthYear} -`
    if (landmark.deathYear) lifeYearString += ` ${landmark.deathYear}`
    if (landmark.endDate) yearString += ` - ${landmark.endDate}`
    const timelineContext = useTimelineContext();
    const fullScreenRef = useRef(null);
    const landmarkRef = useRef(landmark);
    useEffect(() => {
        const fullscreenHandler= () => {
            setPresentation(Boolean(document.fullscreenElement));
        }
        document.addEventListener('fullscreenchange', fullscreenHandler);
        document.addEventListener('mozfullscreenchange', fullscreenHandler);
        document.addEventListener('MSFullscreenChange', fullscreenHandler);
        document.addEventListener('webkitfullscreenchange', fullscreenHandler);
    }, [])
    useEffect(()=>{
        if (landmark.images && !loaded && isOpen){
            const img = document.createElement('img');
            img.src = landmark.images[0].image;
            img.onload = () => setImgWidth(250 * (img.naturalWidth/img.naturalHeight));
            setLoaded(true)
        }
    }, [isOpen, landmark, loaded])

    const updateLandmark = useCallback((adjustment: number)=>{
        setOpacityValue('opacity-0')
        setTimeout(()=>setOpacityValue('opacity-100'), 500)
        const newLandmark = updatePresentation(adjustment)
        setLandmark(newLandmark)
        if (newLandmark.images){
            const img = document.createElement('img');
            img.src = newLandmark.images[0].image;
            img.onload = () => setImgWidth(250 * (img.naturalWidth/img.naturalHeight));
        }
        fullScreenRef.current.scrollTo(0,0)
    }, [timelineContext.presentationIndex, updatePresentation])
    const onKeyAction = useCallback((e) => {
        const key = e.code
            if ((presentation && key === 'Space') || key === 'ArrowRight'){
                e.preventDefault()
                if(!imageModalOpen) {
                    updateLandmark(1)
                }
            }
            if (key === 'ArrowLeft') {
                e.preventDefault()
                if(!imageModalOpen) {
                    updateLandmark(-1)
                }
            }
    }, [imageModalOpen, presentation, updateLandmark])
    useEffect(()=>{
        if (!isOpen){
            setTimeout(()=>setLandmark(landmarkRef.current), 420)
        }
    }, [isOpen])
    useEffect(()=>{
        if (isOpen){
            const currentPresentationTitle = timelineContext.presentationTitle
            const currentPresentationInfo = landmark.presentations.find(obj => obj.title === currentPresentationTitle)
            const landmarkIndexInPresentation = currentPresentationInfo.index
            timelineContext.setPresentationIndex(landmarkIndexInPresentation)
        }
    }, [isOpen, landmark.presentations, timelineContext])
    useEffect(()=>{
        if (fullScreenRef.current) {
            window.addEventListener('keydown', onKeyAction)
        }
        return () => {
            window.removeEventListener('keydown', onKeyAction)
        };
    }, [onKeyAction])
    const openFullScreen = () => {
        if (fullScreenRef.current.requestFullscreen) {
            fullScreenRef.current.requestFullscreen()
        } else if (fullScreenRef.current.webkitRequestFullscreen) { /* Safari */
            fullScreenRef.current.webkitRequestFullscreen()
        } else if (fullScreenRef.current.msRequestFullscreen) { /* IE11 */
            fullScreenRef.current.msRequestFullscreen()
        }}
    const exitFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen()
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen()
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen()
        }
    }
    const isCurrentPresentation =(givenString: string)=>{
        return  givenString === timelineContext.presentationTitle
    }
    const isInCurrentPresentation =()=>{
        const currentPresentation = timelineContext.presentationTitle;
        return landmark.presentations.find(obj => obj.title == currentPresentation)
    }
    const DropdownMenu = () => {
        return (
            <Menu>
                {({open})=>(
                    <div className={''}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox={expandDropdown ? "0 0 120 24":"0 0 24 24"}
                                 strokeWidth="1.5" stroke={'black'} preserveAspectRatio="none"
                                 className={`border-y-2 border-l-2 rounded-l-sm border-gray-300
                                                  stroke-gray-500 cursor-pointer ${expandDropdown?'aspect-5/1 h-5': 'size-5 '}
                                                  transition-all duration-200`}
                                 onClick={() => {
                                     if (!expandDropdown) {
                                         setExpandDropdown(true)
                                     }
                                 }}
                            >
                                <title>Select slideshow to follow</title>
                                { expandDropdown &&
                                        <MenuButton as={'g'}
                                        onClick={() =>{
                                            if (open) {
                                            setExpandDropdown(false)
                                            }
                                        }}
                                        >
                                            <svg x={0} y={0} width={120} height={24} fill={'none'}>
                                                <rect x={0} y={0} width={120} height={24} fill={'white'} />
                                                <text
                                                    x="5" y="20" fontSize="18"
                                                    className={'fill-gray-500'}
                                                    textAnchor={'start'}
                                                    letterSpacing={1}
                                                >Slideshow</text>
                                                <path
                                                    className={'transition-all duration-200'}
                                                    strokeLinecap="round"
                                                    transform={open?"rotate(-90 108.5 12.5)":''}
                                                    strokeLinejoin="round" d="m102 11 6 6 6-6"
                                                />
                                            </svg>
                                        </MenuButton>
                                }
                                { !expandDropdown &&
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"/>
                                }
                            </svg>
                        { open &&
                            <MenuItems anchor="bottom">
                                {   landmark.presentations.map((presentation, index)=>{
                                    return(
                                        <MenuItem key={index} disabled={isCurrentPresentation(presentation.title)}>
                                            <p className={` block min-h-5  px-1 overflow-x-hidden text-sm text-ellipsis max-w-25
                                                    ${isCurrentPresentation(presentation.title)? 
                                                    'bg-gray-600 text-gray-900':
                                                    'bg-gray-300 text-black cursor-pointer data-focus:bg-gray-400'}`}
                                               onClick={()=> {
                                                   setExpandDropdown(false)
                                                   timelineContext.setPresentationTitle(presentation.title)
                                                   const presentationObject = landmark.presentations.find(obj => obj.title === presentation.title)
                                                   const presentationIndex = presentationObject!.index
                                                   timelineContext.setPresentationIndex(presentationIndex)
                                                   const presentationMeta = timelineContext.presentationsSummary.find(obj => obj.title === presentation.title)
                                                   timelineContext.setPresentationHighIndex(presentationMeta.highIndex)
                                               }}
                                            >
                                                {presentation.title}
                                            </p>
                                        </MenuItem>
                                    )
                                })
                                }
                            </MenuItems>
                        }
                    </div>
                )}
            </Menu>
        )
    }

    return(
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className={`relative z-90 ${opacityValue}`} onClose={()=> {
                timelineContext.setDragScroll(true);
                setIsOpen(false)
                setLoaded(false)
                setExpandDropdown(false)
                window.removeEventListener('keydown', onKeyAction)
            }}>
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
                    <div className={`flex min-h-full items-center justify-center text-center ${expanded?'':'p-4'}`}>
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className={`${landmark.borderColor} border-6
                                ${expanded? 'h-screen w-[80dvw]' : `min-w-lg max-w-[70dvw] ${presentation?'':'max-h-[calc(95vh-4rem)]'}`} 
                                overflow-y-auto rounded-2xl bg-white px-6 text-left align-middle shadow-xl transition-all
                                min-scrollbar  pb-6
                                `}
                                ref={fullScreenRef}>
                                <div className={`h-[36px] flex items-center justify-end sticky right-0 top-0`}>
                                    <div className={`h-full flex items-center borderBL  gap-3 w-fit bg-white px-3 shadow-sm`}>
                                        {isInCurrentPresentation() && timelineContext.presentationIndex > 0 &&
                                            <Button
                                                className={'cursor-pointer'}
                                                onClick={()=> {
                                                    updateLandmark(-1)
                                                }}
                                                title={`Previous slide in ${timelineContext.presentationTitle}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth="1.5" stroke="black" className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M15.75 19.5 8.25 12l7.5-7.5"/>
                                                </svg>
                                            </Button>
                                        }
                                        <div className={`flex items-center`}>
                                            { !presentation &&
                                                <DropdownMenu />
                                            }
                                            <Button
                                                className={`active:text-gray-500 cursor-pointer 
                                                        ${blinkerAnimation?'animate-[blinker_500ms_linear_5]':''}`}
                                                onClick={() => {
                                                    if (!presentation) {
                                                        openFullScreen();
                                                        setBlinkerAnimation(false);
                                                    } else {
                                                        exitFullScreen();
                                                    }
                                                }}
                                                title={'Enter Presentation Mode'}
                                            >
                                                {!presentation &&
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                         fill="none"
                                                         viewBox="0 0 24 24"
                                                         strokeWidth="1.5"
                                                         stroke="black"
                                                         className="size-5 border-2 border-black rounded-r-sm">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/>
                                                    </svg>
                                                }
                                                {presentation &&
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                         fill="black" className="size-6">
                                                        <path fillRule="evenodd"
                                                              d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5Z"
                                                              clipRule="evenodd"/>
                                                    </svg>

                                                }
                                            </Button>
                                        </div>
                                        { isInCurrentPresentation() && timelineContext.presentationIndex < timelineContext.presentationHighIndex &&
                                            <Button
                                                className={`cursor-pointer`}
                                                onClick={()=> {
                                                    updateLandmark(1)
                                                }}
                                                title={`Next slide in ${timelineContext.presentationTitle}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                     strokeWidth="1.5" stroke="black" className={`size-6`}>
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                                                </svg>
                                            </Button>
                                        }
                                        <Button
                                            className={`active:text-gray-500 cursor-pointer`}
                                            onClick={(e) => {
                                                fullScreenRef.current!.focus()
                                                setExpanded(!expanded)
                                            }}
                                            title={expanded?'Shrink Landmark':'Expand Landmark'}
                                        >
                                            {expanded && !presentation &&
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 24 24"
                                                     strokeWidth="1.5"
                                                     stroke="black"
                                                     className="size-6">
                                                    <path strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                          d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"/>
                                                </svg>
                                            }
                                            {!expanded && !presentation &&
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 24 24"
                                                     strokeWidth="1.5"
                                                     stroke="black"
                                                     className="size-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/>
                                                </svg>
                                            }
                                        </Button>
                                        <Link href={`../landmark/${timelineContext.timelineID}/${landmark.id}`}
                                              target={'_blank'}
                                              className={``}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                 viewBox="0 0 24 24"
                                                 strokeWidth={1.5}
                                                 stroke="black"
                                                 className="size-6 cursor-pointer">
                                                <title>Open Landmark in new tab
                                                </title>
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                                <div className={`${expanded? 'w-full flex justify-center': ''}`}>
                                    <div className={`${presentation? opacityValue:''}`}>
                                        <div
                                            className={`${landmark.images ? 'min-h-[250px]' : ''} ${presentation ? '' : 'mb-7'} mr-4`}>
                                            {landmark.images &&
                                                <div className={'relative float-left mb-6 mr-6'}>
                                                    <Image
                                                        src={landmark.images[0].image}
                                                        height={250}
                                                        width={imgWidth}
                                                        alt=""
                                                        className={'transition-all cursor-pointer'}
                                                        loading="lazy"
                                                        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer())}`}
                                                        onClick={() => setImageModalOpen(true)}
                                                    />
                                                    <div className={`absolute top-2 right-2 cursor-pointer`}
                                                         onClick={() => setImageModalOpen(true)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                                             className="size-6 animate-[reverseBlinker_1s_linear_3] opacity-0 hover:opacity-80 transition-all ease-in-out duration-200">

                                                            <path strokeLinecap="round" strokeLinejoin="round" stroke="#444"
                                                                  fill="#ddd"
                                                                  strokeWidth="1.75"
                                                                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6"
                                                            />
                                                        </svg>
                                                    </div>
                                                </div>
                                            }
                                            <div className={`mt-2 ${presentation ? 'flex flex-col min-h-[90dvh]' : ''}`}>
                                                <div className={`w-max inline-block`}>
                                                    <DialogTitle
                                                        as="h3"
                                                        className={`font-medium leading-6 mr-0
                                                                    text-gray-900 ${presentation ? 'text-4xl pb-8' : 'text-2xl pb-2'}`}>
                                                        {landmark.title}
                                                    </DialogTitle>
                                                </div>
                                                {
                                                    landmark.displayDate &&
                                                    <div className={`${presentation ? 'text-4xl' : ''} pb-1`}>
                                                        {/* birth (and death) year(s) */}
                                                        {landmark.birthYear &&
                                                            <p className={`text-gray-900`}>{lifeYearString}</p>
                                                        }
                                                        {/* year(s) */}
                                                        <p className={`text-gray-900`}>{yearString}</p>
                                                    </div>
                                                }
                                                {landmark.intro && !presentation &&
                                                    <p className={`italic text-gray-700 ${expanded? 'max-w-5xl':'max-w-xl'}`}
                                                    >
                                                        {landmark.intro}
                                                    </p>
                                                }
                                                {landmark.keyPoints && presentation &&
                                                    <div className={`${landmark.bgColor} text-black p-3 grow`}>
                                                        <ul className={'list-disc list-inside'}>
                                                            {landmark.keyPoints.map((point, index) => {
                                                                return (
                                                                    <li key={index} className={'pb-8 text-4xl'}>{point}</li>
                                                                )
                                                            })
                                                            }
                                                        </ul>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            {landmark.keyPoints && !presentation &&
                                                <div className={`${landmark.bgColor} text-black p-3 ${expanded?'max-w-5xl':'max-w-xl'}`}>
                                                    <ul className={'list-disc list-inside'}>
                                                        {landmark.keyPoints.map((point, index) => {
                                                            return (
                                                                <li key={index} className={'pb-2'}>{point}</li>
                                                            )
                                                        })
                                                        }
                                                    </ul>
                                                </div>
                                            }
                                        </div>
                                        {!presentation &&
                                            <div className="mt-2">
                                                <p className={`text-md text-gray-900 ${expanded?'max-w-5xl pt-5':'max-w-xl'}`}>
                                                    {landmark.description}
                                                </p>
                                            </div>
                                        }
                                        <div>
                                            {landmark.links && !presentation &&
                                                <section>
                                                    <h4 className={'text-black pt-5 font-bold'}>Links:</h4>
                                                    { landmark.links.map((link, index) => {
                                                        return(
                                                            <p key={index} >
                                                                <a href={link.link} target={'_blank'}
                                                                   className={'text-gray-900 underline'}>{link.display}</a>
                                                            </p>)
                                                    })
                                                    }
                                                </section>
                                            }
                                        </div>
                                        <div>
                                            {landmark.files && !presentation &&
                                                <section>
                                                    <h4 className={'text-black pt-5 font-bold'}>Files:</h4>
                                                    { landmark.files.map((file, index) => {
                                                        return(
                                                            <div className={'flex gap-2'} key={index}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                     viewBox="0 0 24 24" strokeWidth="1.5"
                                                                     stroke="black" className="size-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                                          d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
                                                                </svg>
                                                                <p>
                                                                    <a href={file.link} target={'_blank'}
                                                                       className={'text-gray-900 underline'}>{file.display}</a>
                                                                </p>
                                                            </div>
                                                    )
                                                    })
                                                    }
                                                </section>
                                            }
                                        </div>
                                        { landmark.relationshipGroups && !presentation &&
                                            <div>
                                                <p className={`text-black text-lg font-bold pt-3`}>Related:</p>
                                                { landmark.relationshipGroups.map((relationshipGroup, index) => {
                                                    return (
                                                        <Fragment key={index}>
                                                            {relationshipGroup.relationships.map((relationship, index2) => {
                                                                return (
                                                                    <Fragment key={index2}>
                                                                        { index == landmark.relativeTimePosition[0] && index2 == landmark.relativeTimePosition[1] &&
                                                                            <div className={`flex items-center`}>
                                                                                <svg className={`mr-2`} height="1em" viewBox={'0 0 100 100'} xmlns="http://www.w3.org/2000/svg"
                                                                                     overflow={'visible'}>
                                                                                    <circle r="45" cx="50" cy="50" fill={landmark.color} opacity={'0.5'} />
                                                                                    <path d="M50 100 V150" stroke={'black'} strokeWidth={5}  strokeDasharray="4"/>
                                                                                </svg>
                                                                                <p className={`text-black/60`}>{landmark.title}</p>
                                                                            </div>
                                                                        }
                                                                        <div className={`flex items-center`}
                                                                            // onClick={()=>{
                                                                            //     setTimeout(()=>setOpacityValue('opacity-0'), 500)
                                                                            //     setTimeout(()=>setOpacityValue('opacity-100'), 2000)
                                                                            //     const element = document!.getElementById(relationship.targetId)!
                                                                            //     element.scrollIntoView({ behavior: "smooth", block: "end", inline: "center" })
                                                                            //     element.classList.add('animate-[blinker_500ms_linear_5]')
                                                                            //     setTimeout(function () {
                                                                            //         element.classList.remove('animate-[blinker_500ms_linear_5]')
                                                                            //     }, 5000);
                                                                            // }}
                                                                        >
                                                                            <svg className={`mr-2`} height="1em" viewBox={'0 0 100 100'} xmlns="http://www.w3.org/2000/svg"
                                                                                 overflow={'visible'}>
                                                                                <circle r="45" cx="50" cy="50" fill={relationship.color} />
                                                                                {
                                                                                    (landmark.relationshipGroups!.length - 1 != index
                                                                                        || landmark.relativeTimePosition[0] == -1 ||
                                                                                        (landmark.relationshipGroups!.length - 1 == index &&
                                                                                            landmark.relationshipGroups![index].relationships.length - 1 != index2))
                                                                                    &&
                                                                                    <path d="M50 100 V150" stroke={'black'} strokeWidth={5} strokeDasharray="4"/>
                                                                                }
                                                                            </svg>
                                                                            <p className={`text-black`}>
                                                                                {relationship.displayDate? relationship.date+': ':''}{relationship.title} {relationship.context? '- '+relationship.context: ''}
                                                                            </p>
                                                                        </div>
                                                                        { landmark.relativeTimePosition[0] == -1 && landmark.relationshipGroups!.length - 1 == index && landmark.relationshipGroups![index].relationships.length - 1 == index2 &&
                                                                            <div className={`flex items-center `}>
                                                                                <svg className={`mr-2`} height="1em" viewBox={'0 0 100 100'} xmlns="http://www.w3.org/2000/svg">
                                                                                    <circle r="45" cx="50" cy="50" fill={landmark.color} opacity={'0.5'} />
                                                                                </svg>
                                                                                <p className={`text-gray-600`}>{landmark.title}</p>
                                                                            </div>
                                                                        }
                                                                    </Fragment>
                                                                )
                                                            })}
                                                        </Fragment>
                                                    )
                                                })

                                                }
                                            </div>
                                        }
                                        { landmark.sources && !presentation &&
                                            <div>
                                                <p className={`text-black text-lg font-bold pt-3`}>
                                                    Sources:
                                                </p>
                                                { landmark.sources.map((source, index) => {
                                                    return (
                                                        <p key={index} className={`text-black`}>{source}</p>
                                                    )
                                                })

                                                }
                                            </div>

                                        }
                                    </div>
                                </div>

                                {landmark.images &&
                                    <ImageModal isOpen={imageModalOpen} setIsOpen={setImageModalOpen}
                                                images={landmark.images}
                                                fullscreen={presentation} openParent={openFullScreen}
                                    />
                                }
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default InfoModal;