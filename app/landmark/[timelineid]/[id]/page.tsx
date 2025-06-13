'use client'
import data from '@/data.json'
import {ILandmark, ILandmarkImage} from "@/types";
import SimpleNavbar from "@/app/components/SimpleNavbar";
import ImageModal from "@/app/components/ImageModal";
import {useState, use, Fragment, useRef, useEffect} from "react";
import {Button, Checkbox, Field, Label} from "@headlessui/react";
import Link from "next/link";

interface ILandmarkPage{
    id: string;
    timelineid: string;
}

const LandMarkPage = ({params}: {params: ILandmarkPage})=>{
    const {timelineid, id} = use(params)
    const [includeAuthors, setIncludeAuthors] = useState<boolean>(true)
    const [includeDates, setIncludeDates] = useState<boolean>(true)
    const [includeKeyPoints, setIncludeKeyPoints] = useState<boolean>(true)
    const [includeSources, setIncludeSources] = useState<boolean>(true)
    const [includeIntroduction, setIncludeIntroduction] = useState<boolean>(true)
    const [printSettingHeight, setPrintSettingHeight] = useState<boolean>(false)
    const [scrollPosition, setSrollPosition] = useState(0);
    const [showGoTop, setshowGoTop] = useState("hidden");
    const refScrollUp = useRef();
    const timeline = data[timelineid]
    const landmark: ILandmark = timeline.landmarks.find((landmark: ILandmark) => landmark.id === id);
    const [dummy, setDummy] = useState<boolean>();
    const [imageModalOpen, setImageModalOpen] = useState({open: false, index: 0});
    let yearString = `${landmark.year}`
    if (landmark.person) yearString = 'active: ' + yearString
    if (landmark.activeEndYear) yearString += ` - ${landmark.activeEndYear}`
    if (landmark.eraEndYear) yearString += ` - ${landmark.eraEndYear}`
    let lifeYearString = `${landmark.birthYear} -`
    if (landmark.deathYear) lifeYearString += ` ${landmark.deathYear}`
    if (landmark.endDate) yearString += ` - ${landmark.endDate}`
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
    const ccc =()=>{
        setImageModalOpen({open: false, index: imageModalOpen.index})
    }

    if(landmark){
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
                    {/*LEFT COLUMN*/}
                    <div className={`w-[250px] ml-24 flex flex-col items-center print:hidden mr-6`}>
                        {landmark.images &&
                            <div className={`w-9/10 aspect-9/12 pt-6`}>
                                <img src={landmark.images[0].image} alt={landmark.images[0].alt}
                                     onClick={()=>setImageModalOpen({open: true, index: 0})}
                                     className={'h-auto w-full object-contain object-top mb-2 cursor-pointer'}
                                />
                                { landmark.images[0].description &&
                                    <p className={`text-center text-sm`}>
                                        {landmark.images[0].description}
                                    </p>
                                }
                            </div>
                        }
                        {/* RELATIONSHIPS */}
                        { landmark.relationshipGroups &&
                            <div className={`border-2 mt-6  rounded-xs`}>
                                <p className={`text-black text-lg font-bold px-3 pt-3 ${landmark.bgColor}`}>Related:</p>
                                <div className={`py-3 px-3 bg-gray-150`}>
                                { landmark.relationshipGroups.map((relationshipGroup, index) => {
                                    return (
                                        <Fragment key={index}>
                                            {relationshipGroup.relationships.map((relationship, index2) => {
                                                return (
                                                    <Fragment key={index2}>
                                                        { index == landmark.relativeTimePosition[0] && index2 == landmark.relativeTimePosition[1] &&
                                                            <div className={`flex items-stretch`}>
                                                                <div className={`self-stretch grid w-[1.5rem]`}>
                                                                    {
                                                                        (landmark.relationshipGroups!.length - 1 != index
                                                                            || landmark.relativeTimePosition[0] == -1 ||
                                                                            (landmark.relationshipGroups!.length - 1 == index &&
                                                                                landmark.relationshipGroups![index].relationships.length - 1 != index2))
                                                                        &&
                                                                        <div className={`h-full mt-[0.75rem] dashedbg
                                                                                 w-[1.5rem]
                                                                                 row-start-1 col-span-1 col-start-1 row-span-1`}>
                                                                        </div>
                                                                    }
                                                                    <svg
                                                                        height={'1.5rem'}
                                                                        width={'1.5rem'}
                                                                        viewBox={'0 0 100 100'}
                                                                        className={`mr-2 row-start-1 col-span-1 col-start-1 row-span-1`}>
                                                                        <circle r="35" cx="50" cy="50" fill={relationship.color}/>
                                                                    </svg>
                                                                </div>
                                                                <p className={`text-black/60`}>{landmark.title}</p>
                                                            </div>
                                                        }
                                                        <div className={`flex items-stretch`}>
                                                            <div className={`self-stretch grid w-[1.5rem]`}>
                                                                {
                                                                    (landmark.relationshipGroups!.length - 1 != index
                                                                        || landmark.relativeTimePosition[0] == -1 ||
                                                                        (landmark.relationshipGroups!.length - 1 == index &&
                                                                            landmark.relationshipGroups![index].relationships.length - 1 != index2))
                                                                    &&
                                                                    <div className={`h-full mt-[0.75rem] dashedbg
                                                                                 w-[1.5rem]
                                                                                 row-start-1 col-span-1 col-start-1 row-span-1`}>
                                                                    </div>
                                                                }
                                                                <svg
                                                                    height={'1.5rem'}
                                                                    width={'1.5rem'}
                                                                    viewBox={'0 0 100 100'}
                                                                    className={`mr-2 row-start-1 col-span-1 col-start-1 row-span-1`}>
                                                                    <circle r="35" cx="50" cy="50" fill={relationship.color} />
                                                                </svg>
                                                            </div>
                                                            <Link href={`/landmark/${timelineid}/${relationship.targetId}`} target={'_blank'} className={`cursor-pointer`}>
                                                                <p className={`text-black leading-[1.5rem]`}>
                                                                    {relationship.displayDate? relationship.date+': ':''}{relationship.title} {relationship.context? '- '+relationship.context: ''}
                                                                </p>
                                                            </Link>
                                                        </div>
                                                        { landmark.relativeTimePosition[0] == -1 && landmark.relationshipGroups!.length - 1 == index && landmark.relationshipGroups![index].relationships.length - 1 == index2 &&
                                                            <div className={`flex items-center `}>
                                                                <div className={`self-stretch grid w-[1.5rem]`}>
                                                                    {
                                                                        (landmark.relationshipGroups!.length - 1 != index
                                                                            || landmark.relativeTimePosition[0] == -1 ||
                                                                            (landmark.relationshipGroups!.length - 1 == index &&
                                                                                landmark.relationshipGroups![index].relationships.length - 1 != index2))
                                                                        &&
                                                                        <div className={`h-full mt-[0.75rem]
                                                                                 w-[1.5rem]
                                                                                 row-start-1 col-span-1 col-start-1 row-span-1`}>
                                                                        </div>
                                                                    }
                                                                    <svg
                                                                        height={'1.5rem'}
                                                                        width={'1.5rem'}
                                                                        viewBox={'0 0 100 100'}
                                                                        className={`mr-2 row-start-1 col-span-1 col-start-1 row-span-1`}>
                                                                        <circle r="35" cx="50" cy="50" fill={relationship.color} />
                                                                    </svg>
                                                                </div>
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
                            </div>
                        }
                        {/*/!* LINKS *!/*/}
                        {/*{ landmark.links &&*/}
                        {/*    <div className={`w-full`}>*/}
                        {/*        <p className={`text-black text-lg font-bold pt-3  border-b-1 border-gray-500 pb-1`}>Links:</p>*/}
                        {/*        {landmark.links.map((link, index) => {*/}
                        {/*            return (*/}
                        {/*                <Link key={index} href={link.link} className={`block`}>{link.display}</Link>*/}
                        {/*            )*/}
                        {/*        })}*/}
                        {/*    </div>*/}
                        {/*}*/}
                    </div>
                    {/* MIDDLE COLUMN */}
                    <div className={`max-w-[800px] px-6 py-6`}>
                        {/* AUTHORS (DISPLAYS ON PRINT)  */}
                        <div className={`hidden ${includeAuthors?'print:inline-block':''} mb-6`}>
                            {
                                timeline.meta.authors.map((author, index) => {
                                    return <p key={index}>{author}</p>;
                                })
                            }
                        </div>
                        {/* TITLE */}
                        <h1 className={`text-3xl font-semibold border-b-1 border-gray-500 pb-1`}>{landmark.title}</h1>
                        {/* DATES */}
                        {
                            landmark.displayDate &&
                            <div className={`pt-3 w-full font-semibold text-xl ${includeDates?'':'print:hidden'}`}>
                                {/* birth (and death) year(s) */}
                                {landmark.birthYear &&
                                    <p className={`text-gray-900`}>{lifeYearString}</p>
                                }
                                {/* year(s) */}
                                <p className={`text-gray-900`}>{yearString}</p>
                            </div>
                        }
                        {/* INTRO */}
                        { landmark.intro &&
                            <p className={`italic text-gray-700 mt-3 text-xl ${includeIntroduction? '': 'print:hidden'}`}>{landmark.intro}</p>
                        }
                        {/* KEY POINTS */}
                        {landmark.keyPoints &&
                            <div className={`${landmark.bgColor} text-black p-3 mb-6 mt-6 ${includeKeyPoints?'':'print:hidden'}`}>
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
                        {/* DESCRIPTION */}
                        {landmark.description &&
                            <p className={`mt-6`}>{landmark.description}</p>
                        }
                        {/* FILES */}
                        {landmark.files &&
                            <div className={`print:hidden`}>
                                <h4 className={'text-gray-900 mt-6 font-bold text-2xl  border-b-1 border-gray-500 pb-1'}>Files:</h4>
                                { landmark.files.map((file, index) => {
                                    return(
                                        <div key={index} className={'flex gap-2 my-3 items-center'}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                 viewBox="0 0 24 24" strokeWidth="1.5"
                                                 stroke="black" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/>
                                            </svg>
                                            <p className={'my-2'}>
                                                <a href={file.link} target={'_blank'}
                                                   className={'text-gray-900 underline text-md'}>{file.display}</a>
                                            </p>
                                        </div>
                                        )
                                })
                                }
                            </div>
                        }
                        {/* LINKS */}
                        {landmark.links &&
                            <div className={`print:hidden`}>
                                <h4 className={'text-gray-900 mt-6 font-bold text-2xl  border-b-1 border-gray-500 pb-1'}>Links:</h4>
                                { landmark.links.map((link, index) => {
                                    return(
                                        <p key={index} className={'my-2'}>
                                            <a href={link.link} target={'_blank'}
                                               className={'text-gray-900 underline text-md'}>{link.display}</a>
                                        </p>)
                                })
                                }
                            </div>
                        }
                        {/* GALLERY */}
                        { landmark.images &&
                            <div className={`w-full print:hidden`}>
                                <h4 className={'text-gray-900 mt-6 font-bold text-2xl  border-b-1 border-gray-500 pb-1'}>Gallery:</h4>
                                <div className={`flex flex-wrap gap-3`}>
                                    { landmark.images.map((image: ILandmarkImage, index: number) => {
                                        return(
                                            <div  key={index} className={'cursor-pointer'}
                                                onClick={()=>{
                                                    setImageModalOpen({open:true, index:index});
                                                    console.log(index)
                                                }}
                                            >
                                                <div className={`size-36 mt-3`}>
                                                    <img src={image.image}
                                                         className={'h-full w-full object-contain'}
                                                         alt={image.alt}
                                                    />
                                                </div>
                                                <p className={`line-clamp-2 w-36 h-[3rem] mt-1 text-center`}>{image.description}</p>
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                        }
                        {/* SOURCES */}
                        { landmark.sources &&
                            <div className={`${includeSources?'':'print:hidden'}`}>
                                <h4 className={`text-gray-900 mt-6 font-bold text-2xl  border-b-1 border-gray-500 pb-1`}>Sources:</h4>
                                <div>
                                    { landmark.sources.map((source, index) => {
                                        return (
                                            <p key={index} className={`text-black my-2 text-md`}>{source}</p>
                                        )
                                    })
                                    }
                                </div>
                            </div>

                        }
                    </div>
                    {/* RIGHT COLUMN*/}
                    <div className={`print:hidden pl-6`}>
                        <div>
                            <p className={`pt-3 text-lg mt-3 font-semibold`}>Contributors:</p>
                            {
                                timeline.meta.authors.map((author, index) => {
                                    return (<p key={index}> {author}</p>)
                                })
                            }
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
                        {/* PRINT SETTINGS */}
                        <p className={'cursor-pointer mt-1 text-gray-800'}
                            onClick={()=>{setPrintSettingHeight(!printSettingHeight)}
                        }>print settings {printSettingHeight?'-':'+'}</p>
                        <div className={`${printSettingHeight?'h-50':'h-0'} 
                                        max-h-min overflow-hidden transition-all ease-in-out duration-200
                                        text-gray-800 text-sm`}>
                            <Field className="flex items-center gap-2">
                                <Checkbox
                                    checked={includeAuthors}
                                    onChange={setIncludeAuthors}
                                    className="group block size-4 rounded border bg-white data-checked:bg-gray-800"
                                >
                                    <svg className="stroke-white opacity-0 group-data-checked:opacity-100"
                                         viewBox="0 0 14 14" fill="none">
                                        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                    </svg>
                                </Checkbox>
                                <Label>Include authors</Label>
                            </Field>
                            <Field className="flex items-center gap-2">
                                <Checkbox
                                    checked={includeDates}
                                    onChange={setIncludeDates}
                                    className="group block size-4 rounded border bg-white data-checked:bg-gray-800"
                                >
                                    <svg className="stroke-white opacity-0 group-data-checked:opacity-100"
                                         viewBox="0 0 14 14" fill="none">
                                        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                    </svg>
                                </Checkbox>
                                <Label>Include dates</Label>
                            </Field>
                            <Field className="flex items-center gap-2">
                                <Checkbox
                                    checked={includeIntroduction}
                                    onChange={setIncludeIntroduction}
                                    className="group block size-4 rounded border bg-white data-checked:bg-gray-800"
                                >
                                    <svg className="stroke-white opacity-0 group-data-checked:opacity-100"
                                         viewBox="0 0 14 14" fill="none">
                                        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                    </svg>
                                </Checkbox>
                                <Label>Include introduction</Label>
                            </Field>
                            <Field className="flex items-center gap-2">
                                <Checkbox
                                    checked={includeKeyPoints}
                                    onChange={setIncludeKeyPoints}
                                    className="group block size-4 rounded border bg-white data-checked:bg-gray-800"
                                >
                                    <svg className="stroke-white opacity-0 group-data-checked:opacity-100"
                                         viewBox="0 0 14 14" fill="none">
                                        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                    </svg>
                                </Checkbox>
                                <Label>Include keypoints</Label>
                            </Field>
                            <Field className="flex items-center gap-2">
                                <Checkbox
                                    checked={includeSources}
                                    onChange={setIncludeSources}
                                    className="group block size-4 rounded border bg-white data-checked:bg-gray-800"
                                >
                                    <svg className="stroke-white opacity-0 group-data-checked:opacity-100"
                                         viewBox="0 0 14 14" fill="none">
                                        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                    </svg>
                                </Checkbox>
                                <Label>Include sources</Label>
                            </Field>
                        </div>

                    </div>
                </main>
                {landmark.images &&
                    <ImageModal isOpen={imageModalOpen.open} setIsOpen={ccc}
                                images={landmark.images}
                                fullscreen={false} startingIndex={imageModalOpen.index}
                    />
                }
            </>
        )
    }
}

export default LandMarkPage