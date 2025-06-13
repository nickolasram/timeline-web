import {Dispatch, Fragment, SetStateAction, useState} from "react";
import {Button, Dialog, DialogPanel, Transition, TransitionChild} from "@headlessui/react";
import {IMetaData, IPresentationMetadata} from "@/types";
import {useTimelineContext} from "@/app/hooks/contexts";
import data from '@/data.json';
import Link from "next/link";

interface IMetaModal {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    metaData: IMetaData;
    presentationsMeta: IPresentationMetadata[];
    setInfoModalState: Dispatch<SetStateAction<{}>>;
}

const MetaModal =({isOpen, setIsOpen, metaData, presentationsMeta, setInfoModalState}: IMetaModal)=>{
    const timelineContext = useTimelineContext();
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
                    <div className="flex min-h-full items-start justify-end pt-[2rem] text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className={`min-w-sm w-[45ch] transform overflow-y-auto bg-white/50
                                                    backdrop-blur-[2px] p-6 text-left align-middle shadow-xl transition-all
                                                    h-[calc(98dvh-2rem)] dropdownElement text-black text-lg relative`}
                            >
                                <Button className={` absolute top-2 right-2 cursor-pointer`} onClick={()=>setIsOpen(false)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth="1.5" stroke="black" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                                    </svg>
                                </Button>
                                <p className={'pb-3 font-semibold text-2xl'}>Information</p>
                                <div className={`bg-white/25 px-3 `}>
                                    <p className={`text-sm pt-3`}>Author{metaData.authors.length > 1 ? 's':''}:
                                        {
                                            metaData.authors.map((author, index) => {
                                                return (<span key={index}> {author}
                                                    {index == metaData.authors.length - 1 ? "" : ", "}
                                                    </span>)
                                            })
                                        }
                                    </p>
                                    <p className={`text-sm pt-3`}>Landmarks: {metaData.landmarkCount}</p>
                                    { metaData.note &&
                                        <p className={'text-sm py-3'}>{metaData.note}</p>
                                    }
                                </div>
                                <p className={'pt-3 font-semibold'}>Sources:</p>
                                { metaData.citations &&
                                    <div className={'bg-white/25 p-3'}>
                                        { metaData.citations.map((citation, index) => {
                                            return (<p key={index}
                                                       className={`py-2 text-sm`}>
                                                        {citation}
                                                    </p>)
                                        }) }
                                    </div>
                                }
                                <p className={'pt-3 font-semibold'}>Slide Shows:</p>
                                    <div className={'bg-white/25 px-3'}>
                                        { presentationsMeta.map((pmd, index) => {
                                            return (
                                                <div key={index} className={`pt-3 last:pb-3`}>
                                                    <div className={`flex items-baseline cursor-pointer`}
                                                         onClick={() => {
                                                             setIsOpen(false);
                                                             timelineContext.setPresentationTitle(pmd.title)
                                                             timelineContext.setPresentationIndex(0)
                                                             const presentationMeta = timelineContext.presentationsSummary.find(obj => obj.title === pmd.title)
                                                             timelineContext.setPresentationHighIndex(presentationMeta.highIndex)
                                                             const landmarkID = presentationMeta.firstLandmarkID
                                                             const timeline = data[timelineContext.timelineID]
                                                             const landmarks = timeline.landmarks
                                                             const firstLandmark = landmarks.find(obj => obj.id === landmarkID)
                                                             setInfoModalState({open: true, landmark: firstLandmark})
                                                         }}>
                                                        <p> {pmd.title} </p>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                                             viewBox="-4 -4 24 24" strokeWidth="1.5"
                                                             stroke="currentColor" className="size-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"/>
                                                        </svg>

                                                    </div>
                                                    <p className={`text-sm`}>Authors: site developer</p>
                                                    <p className={`text-sm`}>Landmarks: {pmd.highIndex - 1}</p>
                                                    <Link
                                                          href={`../slideshow/${timelineContext.timelineID}/${pmd.id}`}
                                                          target={'_blank'}
                                                          className={`text-sm`}>More info</Link>
                                                </div>
                                            )
                                        }) }
                                    </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default MetaModal;