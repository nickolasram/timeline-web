import {ILandmark} from "@/types";
import {Dispatch, Fragment, SetStateAction} from "react";
import {Dialog, DialogPanel, DialogTitle, Transition, TransitionChild} from "@headlessui/react";

interface IInfoModal{
    landmark : ILandmark,
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

const InfoModal =({landmark, isOpen, setIsOpen}: IInfoModal)=>{
    return(
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
                            <DialogPanel className={`${landmark.borderColor} border-6 w-full max-w-md transform 
                        overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}>
                                <div>
                                    <DialogTitle
                                        as="h3"
                                        className="text-2xl font-medium leading-6 text-gray-900"
                                    >
                                        {landmark.title}
                                    </DialogTitle>
                                    {landmark.birthYear &&
                                        <p className={`text-gray-500`}>{landmark.birthYear}-{landmark.deathYear}</p>
                                    }
                                    {landmark.activeEndYear &&
                                        <p className={`text-gray-500`}>Active {landmark.year}-{landmark.activeEndYear}</p>
                                    }
                                </div>
                                <div className="mt-2">
                                    <p className="text-md text-gray-500">
                                        {landmark.description}
                                    </p>
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