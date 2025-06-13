import {Dispatch, Fragment, SetStateAction} from "react";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
    Checkbox,
    Field,
    Label,
    Button
} from "@headlessui/react";
import {useTimelineContext} from "@/app/hooks/contexts";

interface ISettingsModal{
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SettingsModal =({isOpen, setIsOpen}: ISettingsModal)=>{
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
                                <DialogTitle>
                                    Settings
                                </DialogTitle>
                                <Field className="flex items-center gap-2">
                                    <Checkbox
                                        checked={timelineContext.scrollbar}
                                        onChange={() => timelineContext.setScrollbar(!timelineContext.scrollbar)}
                                        className="group block size-4 rounded border bg-white data-checked:bg-blue-500"
                                    >
                                        <svg className="stroke-white opacity-0 group-data-checked:opacity-100"
                                             viewBox="0 0 14 14" fill="none">
                                            <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                        </svg>
                                    </Checkbox>
                                    <Label>Horizontal Scrollbar</Label>
                                </Field>
                                <Field className="flex items-center gap-2">
                                    <Checkbox
                                        checked={timelineContext.dragScroll}
                                        onChange={() => timelineContext.setDragScroll(!timelineContext.dragScroll)}
                                        className="group block size-4 rounded border bg-white data-checked:bg-blue-500"
                                    >
                                        <svg className="stroke-white opacity-0 group-data-checked:opacity-100"
                                             viewBox="0 0 14 14" fill="none">
                                            <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                        </svg>
                                    </Checkbox>
                                    <Label>Click and Drag</Label>
                                </Field>
                                <Field className="flex items-center gap-2">
                                    <Checkbox
                                        checked={timelineContext.showTitles}
                                        onChange={() => timelineContext.setShowTitles(!timelineContext.showTitles)}
                                        className="group block size-4 rounded border bg-white data-checked:bg-blue-500"
                                    >
                                        <svg className="stroke-white opacity-0 group-data-checked:opacity-100"
                                             viewBox="0 0 14 14" fill="none">
                                            <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round"
                                                  strokeLinejoin="round"/>
                                        </svg>
                                    </Checkbox>
                                    <Label>Always Show Labels</Label>
                                </Field>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default SettingsModal;