import {Dispatch, Fragment, SetStateAction, useState} from "react";
import {Dialog, DialogPanel, Transition, TransitionChild} from "@headlessui/react";
import { Input } from '@headlessui/react'
import stringComparison from 'string-comparison'
import {ILandmark} from "@/types";
import Link from "next/link";

interface ISearchModal{
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    landmarks: ILandmark[];
    timelineId: string;
}
interface ISearchResult {
    landmark: ILandmark;
    timelineId: string;
}

const SearchResult =({landmark, timelineId}: ISearchResult)=>{
    return(
        <div className={'p-3 bg-white/25 rounded-sm'}>
            <div className={'flex gap-2 items-center'}>
                <svg height="1rem" width="1rem">
                    <circle r="50%" cx="50%" cy="50%" fill={landmark.borderColor.slice(8, 15)} />
                </svg>
                <p className={'text-md text-black w-[40ch] text-ellipsis text-nowrap overflow-hidden'}>{landmark.title}</p>
            </div>
            <div className={'flex gap-2 text-gray-800 text-sm pl-[1.7rem]'}>
                <p className={''}>{landmark.year}</p>
                <p className={'max-w-[13ch] text-ellipsis text-nowrap overflow-hidden'}>{landmark.intro}</p>
            </div>
            <div className={'flex gap-4 pl-[1.7rem] pt-1'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22"
                     strokeWidth="1.5"
                     stroke="black"
                     className="size-5 cursor-pointer"
                    onClick={()=>{
                                const element = document!.getElementById(landmark.id)!
                                element.scrollIntoView({ behavior: "smooth", block: "end", inline: "center" })
                                element.classList.add('animate-[blinker_500ms_linear_5]')
                                setTimeout(function () {
                                    element.classList.remove('animate-[blinker_500ms_linear_5]')
                                }, 5000);
                            }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    <title>Find on Timeline</title>
                </svg>

                <Link href={`../landmark/${timelineId}/${landmark.id}`} target={'_blank'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         strokeWidth={1.5}
                         stroke="black"
                         className="size-5 cursor-pointer">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
                        <title>Open Page</title>
                    </svg>
                </Link>
            </div>
        </div>
    )
}

const SearchModal =({isOpen, setIsOpen, landmarks, timelineId}: ISearchModal)=>{
    const [searchValue, setSearchValue] = useState('');
    // search algorithm
    // if similarity over .5 insert into sorted list
    // add all related into a set
    // in future: will also need to attach to each landmark the landmarks that point to it but it doesn't point to
    const getSearchResults = (searchValue: string) => {
        const cos = stringComparison.cosine
        const results = [];
        for (const landmark of landmarks){
            if (cos.similarity(searchValue, landmark.title) >= 0.5){
                results.push(landmark)
            }
        }
        results.sort((a, b) => cos.similarity(b.title, searchValue) - cos.similarity(a.title, searchValue))
        for (const landmark of results.slice(0)){
            if (landmark.relationshipGroups){
                for (const relatedGroup of landmark.relationshipGroups){
                    for(const relatedLandmark of relatedGroup.relationships){
                        const foundLandmark = landmarks.find(obj => obj.id === relatedLandmark.targetId)
                        if(!results.includes(foundLandmark)){
                            results.push(foundLandmark)
                        }
                    }
                }
            }
        }
        return results;
    }

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
                    <div className="flex min-h-full items-start justify-end pt-[4rem] text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className={`min-w-sm max-w-[70dvw] transform overflow-y-auto bg-white/50
                                                    backdrop-blur-[2px] p-6 text-left align-middle shadow-xl transition-all
                                                    h-[calc(98dvh-4rem)] dropdownElement`}
                            >
                                <Input name="full_name" type="text" placeholder="Search..."
                                className={`border px-[1rem] w-full h-[2.5rem] mb-5  rounded-sm`}
                                onInput={(e)=>setSearchValue(e.target.value)}
                                />
                                <div className={'flex flex-col gap-5'}>
                                    {getSearchResults(searchValue).map((landmark, index) => {
                                        return (
                                            <SearchResult landmark={landmark} key={index} timelineId={timelineId}/>
                                        )
                                    })}
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default SearchModal;