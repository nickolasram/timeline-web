'use client'
import data from '@/data.json'
import {ILandmark, IPresentation} from "@/types";
import {use, useEffect, useRef, useState} from "react";
import Link from "next/link";
import SimpleNavbar from "@/app/components/SimpleNavbar";
import {Button, Checkbox, Field, Label} from "@headlessui/react";

interface ISlideshowPage{
    timelineid: string;
    id: string;
}

const SlideshowPage = ({params}: {params: ISlideshowPage})=>{
    const {timelineid, id} = use(params)
    const timeline = data[timelineid]
    const slideshow = timeline.presentations.find((presentation: IPresentation) => presentation.meta.id === id);
    const [includeImages, setIncludeImages] = useState<boolean>(true);
    const [scrollPosition, setSrollPosition] = useState(0);
    const [showGoTop, setshowGoTop] = useState("hidden");
    const [printSettingHeight, setPrintSettingHeight] = useState(false);
    const refScrollUp = useRef();
    const handleVisibleButton = () => {
        const position = window.pageYOffset;
        setSrollPosition(position);

        if (scrollPosition > 50) {
            return setshowGoTop("");
        } else if (scrollPosition < 50) {
            return setshowGoTop("hidden");
        }
    };
    const handleScrollUp = () => {
        refScrollUp.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(() => {
        window.addEventListener("scroll", handleVisibleButton);
    });
    if(slideshow){
        return(
            <>
                <SimpleNavbar title={timeline.meta.timelineTitle} id={timeline.meta.id} />
                <main className={'bg-gray-100 min-h-[calc(100vh-4rem)] text-black flex'} ref={refScrollUp}>
                    <Button className={`fixed bottom-6 right-6 cursor-pointer ${showGoTop}`} onClick={handleScrollUp}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="size-7">
                            <path fillRule="evenodd"
                                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                                  clipRule="evenodd"/>
                        </svg>
                    </Button>
                    <div className={`ml-24 print:hidden py-6 w-[250px] mt-14`}>
                        <p className={`font-semibold text-lg pb-1 mx-3`}>
                            Jump to:
                        </p>
                        {
                            slideshow.landmarkIDs.map((id: string, index: number) => {
                                const landmark: ILandmark = timeline.landmarks.find((landmark: ILandmark) => landmark.id === id);
                                return(
                                    <div key={index} className={`mx-3 w-full pt-2 flex items hover:font-semibold`}>
                                        <svg
                                            height={'1.5rem'}
                                            width={'1.5rem'}
                                            viewBox={'0 0 100 100'}
                                            className={`mr-2`}>
                                            <circle r="35" cx="50" cy="50" fill={landmark.color} />
                                        </svg>
                                        <Link href={`#${landmark.id}`}
                                              className={`cursor-pointer`}>
                                            <p>{landmark.title}</p>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={`px-6 py-6 `}>
                        <h1 className={`text-3xl font-semibold pb-1 border-b-1 border-gray-500`}>Slideshow: {slideshow.meta.title}</h1>
                        <div className={`mt-6`}>
                            {
                                slideshow.landmarkIDs.map((id: string, index: number) => {
                                    const landmark: ILandmark = timeline.landmarks.find((landmark: ILandmark) => landmark.id === id);
                                    let yearString = `${landmark.year}`
                                    if (landmark.person) yearString = 'active: ' + yearString
                                    if (landmark.activeEndYear) yearString += ` - ${landmark.activeEndYear}`
                                    if (landmark.eraEndYear) yearString += ` - ${landmark.eraEndYear}`
                                    let lifeYearString = `${landmark.birthYear} -`
                                    if (landmark.deathYear) lifeYearString += ` ${landmark.deathYear}`
                                    if (landmark.endDate) yearString += ` - ${landmark.endDate}`
                                    return(
                                        <div key={index} className={`${landmark.borderColor} border-6 rounded-md p-3 mb-6 max-w-xl flex`}
                                            id={landmark.id}
                                        >
                                            { landmark.bgImage &&
                                                <div className={`size-24 min-w-24 grow-0 overflow-hidden ${includeImages? '':'print:hidden'}`}>
                                                        <img src={landmark.images[0].image} alt={landmark.images[0].alt}
                                                             className={'object-cover min-h-full object-center'}
                                                        />
                                                </div>
                                            }
                                            <div className={'pl-3 grow-1'}>
                                                <div className={'flex justify-between w-auto'}>
                                                    <Link href={`/landmark/${timelineid}/${landmark.id}`} target={'_blank'} className={`cursor-pointer`}><p className={`font-semibold text-xl`}>{landmark.title}</p></Link>
                                                    <p className={'text-sm'}>{index+1}/{slideshow.meta.highIndex+1}</p>
                                                </div>
                                                {
                                                    landmark.displayDate &&
                                                    <div className={`font-semibold`}>
                                                    {/* birth (and death) year(s) */}
                                                        {landmark.birthYear &&
                                                            <p className={`text-gray-900`}>{lifeYearString}</p>
                                                        }
                                                        {/* year(s) */}
                                                        <p className={`text-gray-900`}>{yearString}</p>
                                                    </div>
                                                }
                                                {landmark.keyPoints &&
                                                    <div className={`text-black p-3`}>
                                                        <ul className={'list-disc list-inside'}>
                                                            {landmark.keyPoints.map((point, index) => {
                                                                return (
                                                                    <li key={index} className={'pb-2 last:pb-0'}>{point}</li>
                                                                )
                                                            })
                                                            }
                                                        </ul>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={`print:hidden pt-6 ml-6`}>
                        <div>
                            <p className={`text-lg font-semibold`}>Contributors: </p>
                            <p>
                                {slideshow.meta.title === 'default' ? 'auto-generated': 'Site Developer'}
                            </p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="size-6 cursor-pointer mt-6"
                             onClick={() => {
                                 window.print()
                             }}>
                            <path fillRule="evenodd"
                                  d="M7.875 1.5C6.839 1.5 6 2.34 6 3.375v2.99c-.426.053-.851.11-1.274.174-1.454.218-2.476 1.483-2.476 2.917v6.294a3 3 0 0 0 3 3h.27l-.155 1.705A1.875 1.875 0 0 0 7.232 22.5h9.536a1.875 1.875 0 0 0 1.867-2.045l-.155-1.705h.27a3 3 0 0 0 3-3V9.456c0-1.434-1.022-2.7-2.476-2.917A48.716 48.716 0 0 0 18 6.366V3.375c0-1.036-.84-1.875-1.875-1.875h-8.25ZM16.5 6.205v-2.83A.375.375 0 0 0 16.125 3h-8.25a.375.375 0 0 0-.375.375v2.83a49.353 49.353 0 0 1 9 0Zm-.217 8.265c.178.018.317.16.333.337l.526 5.784a.375.375 0 0 1-.374.409H7.232a.375.375 0 0 1-.374-.409l.526-5.784a.373.373 0 0 1 .333-.337 41.741 41.741 0 0 1 8.566 0Zm.967-3.97a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75H18a.75.75 0 0 1-.75-.75V10.5ZM15 9.75a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75V10.5a.75.75 0 0 0-.75-.75H15Z"
                                  clipRule="evenodd"/>
                        </svg>
                        <p className={'cursor-pointer mt-1 text-gray-800'}
                           onClick={()=>{setPrintSettingHeight(!printSettingHeight)}
                           }>print settings {printSettingHeight?'-':'+'}</p>
                        <div className={`${printSettingHeight?'h-50':'h-0'} 
                                        max-h-min overflow-hidden transition-all ease-in-out duration-200
                                        text-gray-800 text-sm`}>
                            <Field className="flex items-center gap-2 pt-2">
                                <Checkbox
                                    checked={includeImages}
                                    onChange={setIncludeImages}
                                    className="group block size-4 rounded border bg-white data-checked:bg-gray-800"
                                >
                                    <svg className="stroke-white opacity-0 group-data-checked:opacity-100"
                                         viewBox="0 0 14 14" fill="none">
                                        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                    </svg>
                                </Checkbox>
                                <Label>Include images on print</Label>
                            </Field>
                        </div>


                    </div>
                </main>
            </>
        )
    }
}

export default SlideshowPage