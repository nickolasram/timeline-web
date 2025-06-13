import {Dialog, DialogPanel, Transition, TransitionChild, Button} from "@headlessui/react";
import {Dispatch, Fragment, useEffect, SetStateAction, useState, useCallback} from "react";
import {useRef} from "react";
import {ILandmarkImage} from "@/types";

interface IImageModal {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    images: ILandmarkImage[];
    fullscreen: boolean;
    openParent?: () => void;
    startingIndex?: number;
}

const ImageModal =({isOpen, setIsOpen, images, fullscreen, openParent, startingIndex}: IImageModal)=>{
    const [imageIndex, setImageIndex] = useState(0);
    const fullScreenRef = useRef(null);
    const onKeyAction=useCallback((e) => {
        const key = e.code
        if ( key === 'ArrowRight'){
            e.preventDefault()
            if (imageIndex < images.length - 1) {
                setImageIndex(imageIndex+1);
            }
        }
        if (key === 'ArrowLeft') {
            e.preventDefault()
            if (imageIndex > 0) {
                setImageIndex(imageIndex-1);
            }
        }
    }, [imageIndex, images.length])
    useEffect(() => {
        if (typeof startingIndex === "number"){
            setImageIndex(startingIndex)
        }
    }, [startingIndex]);
    useEffect(()=>{
        if (window) {
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
    return(
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-90"
                    onClose={()=> {
                    setIsOpen(false)
                    if (fullscreen && openParent) {
                        openParent()
                    }
                }}
                ref={fullScreenRef}
                onLoad={()=>{
                    if (fullscreen) {
                        openFullScreen()
                    }
                }}
            >
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
                            <DialogPanel className={`h-[80dvh] w-[80dvw] overflow-y-auto bg-gray-950/70
                            flex backdrop-blur-lg`}>
                                <div className={`h-full w-[5%] flex flex-col justify-center`}>
                                    { imageIndex > 0 &&
                                        <Button className={'w-full cursor-pointer'}
                                        onClick={()=>setImageIndex(imageIndex-1)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth="1.5" stroke="currentColor" className={`w-full`}>
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                            d="M15 21 6 12l9-9"/>
                                            </svg>
                                        </Button>
                                    }
                                </div>
                                <div className={`h-full w-[90%]`}>
                                    <img src={images[imageIndex].image}
                                         className={'h-full w-full object-contain'}
                                         alt={images[imageIndex].alt}
                                    />
                                </div>
                                <div className={`h-full w-[5%] flex flex-col justify-center relative`}>
                                    <Button
                                        onClick={() => {
                                            setIsOpen(false)
                                            if (fullscreen && openParent) {
                                                openParent()
                                            }
                                        }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" className="size-6 stroke-gray-200 absolute cursor-pointer top-3 right-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
                                        </svg>
                                    </Button>
                                    { imageIndex < images.length - 1 &&
                                        <Button className={'w-full cursor-pointer'}
                                                onClick={()=>setImageIndex(imageIndex+1)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth="1.5" stroke="currentColor"
                                                 className={`w-full cursor-pointer`}>
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="m9 3 9 9-9 9"/>
                                            </svg>
                                        </Button>
                                    }
                                </div>
                                { images[imageIndex].description &&
                                    <div className={`absolute bottom-0 w-full min-h-24
                                                bg-linear-[90deg,#000000_3%,#00000000_5%,#00000000_95%,#000000_97%]
                                                `}>
                                        <div className={`opacity-0 hover:opacity-100 bg-[#000000cc] 
                                                    transition-all duration-200 ease-in-out min-h-24
                                                    border-t-4 border-black flex justify-center`}>
                                            <p className={'max-w-[80%]'}>{images[imageIndex].description}</p>
                                        </div>
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

export default ImageModal;