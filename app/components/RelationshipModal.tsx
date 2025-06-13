import {ILandmark} from "@/types";
import {Dialog, DialogPanel, DialogTitle, Transition, TransitionChild} from "@headlessui/react";
import {Dispatch, Fragment, SetStateAction} from "react";
import {useTimelineContext} from "@/app/hooks/contexts";

interface IRelationshipModal {
    landmark : ILandmark,
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const RelationshipModal =({landmark, isOpen, setIsOpen}: IRelationshipModal)=>{
    const timelineContext = useTimelineContext();
    return(
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-90" onClose={()=> {
                timelineContext.setDragScroll(true);
                setIsOpen(false)
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
                            <DialogPanel className={`${landmark.borderColor} border-6 min-w-fit max-w-[70dvw] transform
                        overflow-y-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all
                        max-h-[calc(95vh-4rem)]`}>
                                <DialogTitle className={`text-black`}>
                                    {landmark.title}
                                </DialogTitle>
                                <p className={'text-gray-900'}>Navigate to related:</p>
                                {landmark.relationshipGroups?.map((relationshipGroup, index) => {
                                    return(
                                        <div key={index}>
                                            {
                                                relationshipGroup.relationships.map((relationship, index2)=>{
                                                    return(
                                                        <p key={index2}
                                                           className={'text-gray-700 cursor-pointer'}
                                                           onMouseDown={(event)=>{
                                                               if (event.button == 0){
                                                                   setIsOpen(false)
                                                                   const element = document!.getElementById(relationship.targetId)!
                                                                   element.scrollIntoView({ behavior: "smooth", block: "end", inline: "center" })
                                                                   element.classList.add('animate-[blinker_500ms_linear_5]')
                                                                   setTimeout(function () {
                                                                       element.classList.remove('animate-[blinker_500ms_linear_5]')
                                                                   }, 5000);
                                                               }
                                                           }}
                                                        >{relationship.title}</p>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                    })
                                }
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )

}

export default RelationshipModal;