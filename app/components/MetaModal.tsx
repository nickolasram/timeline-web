import {Dispatch, Fragment, SetStateAction} from "react";
import {Dialog, DialogPanel, Transition, TransitionChild} from "@headlessui/react";
import {IMetaData} from "@/types";

interface IMetaModal {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    metaData: IMetaData;
}

const MetaModal =({isOpen, setIsOpen, metaData}: IMetaModal)=>{
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
                            <DialogPanel className={`min-w-sm w-[45ch] transform overflow-y-auto bg-white/50
                                                    backdrop-blur-[2px] p-6 text-left align-middle shadow-xl transition-all
                                                    h-[calc(98dvh-4rem)] dropdownElement text-black text-lg`}
                            >
                                <p className={'pb-3 font-semibold'}>Author{metaData.authors.length > 1 ? 's':''}:
                                    {
                                        metaData.authors.map((author, index) => {
                                            return (<span key={index}> {author}
                                                    {index == metaData.authors.length - 1 ? "" : ", "}
                                                    </span>)
                                        })
                                    }
                                </p>
                                { metaData.note &&
                                    <p className={'bg-white/25 p-3'}>{metaData.note}</p>
                                }
                                <p className={'pt-3 font-semibold'}>Sources:</p>
                                { metaData.citations &&
                                    <div className={'bg-white/25 p-3'}>
                                        { metaData.citations.map((citation, index) => {
                                            return (<p key={index}> {citation} </p>)
                                        }) }
                                    </div>
                                }
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default MetaModal;