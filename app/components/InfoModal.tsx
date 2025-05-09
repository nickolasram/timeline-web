import {ILandmark} from "@/types";
import {Dispatch, Fragment, SetStateAction} from "react";
import {Dialog, DialogPanel, DialogTitle, Transition, TransitionChild} from "@headlessui/react";
import {useTimelineContext} from "@/app/hooks/contexts";
import Link from 'next/link'

interface IInfoModal{
    landmark : ILandmark;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    timelineId: string;
}

const InfoModal =({landmark, isOpen, setIsOpen}: IInfoModal)=>{
    let yearString = `${landmark.year}`
    if (landmark.person) yearString = 'active: ' + yearString
    if (landmark.activeEndYear) yearString += ` - ${landmark.activeEndYear}`
    if (landmark.eraEndYear) yearString += ` - ${landmark.eraEndYear}`
    let lifeYearString = `${landmark.birthYear} -`
    if (landmark.deathYear) lifeYearString += ` ${landmark.deathYear}`
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
                            <DialogPanel className={`${landmark.borderColor} border-6 min-w-sm max-w-[70dvw] transform 
                                overflow-y-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all
                                max-h-[calc(95vh-4rem)]`}>
                                <div>
                                    <Link href={`../landmark/${timelineContext.timelineID}/${landmark.id}`} target={'_blank'}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth={1.5}
                                             stroke="black"
                                             className="size-5 cursor-pointer">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                        </svg>
                                    </Link>

                                    <div className={'flex'}>
                                        { landmark.image &&
                                            <div className={`max-w-2xs mr-4 mb-4`}>
                                                <img src={landmark.image} alt="Logo"
                                                     className={''}
                                                />
                                            </div>
                                        }
                                        <div className={''}>
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
                                        </div>
                                    </div>
                                    <div>
                                        {landmark.intro &&
                                            <p className={'italic pt-1 text-gray-700 '}>{landmark.intro}</p>
                                        }
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
                                        <p className="text-md text-gray-900">
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