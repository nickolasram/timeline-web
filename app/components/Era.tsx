import {ILandmark} from "@/types";
import InfoModal from "@/app/components/InfoModal";
import { useState } from "react";

interface IEraProp {
    landmark: ILandmark;
}

const Era=({landmark}: IEraProp)=>{
    const [isOpen, setIsOpen] = useState(false)
    const textShadow = `text-shadow-[1px_0_2px_rgb(0_0_0_/_1)_,_-1px_0_2px_rgb(0_0_0_/_1)_,_0_-1px_2px_rgb(0_0_0_/_1)_,_0_1px_2px_rgb(0_0_0_/_1)]`
    return(
        <div id={landmark.id} className={`${landmark.column} ${landmark.row}  w-full h-full bg-cover bg-center ${textShadow} 
        ${landmark.bgImage}`}
        >
            <div className={`${landmark.bgColor} w-full h-full overflow-y-clip`}
                 onClick={() => setIsOpen(true)}>
                <h2 className={`text-3xl pt-3 px-3 pb-2`
                }>{landmark.title}</h2>
                {landmark.displayDate &&
                    <p className={`px-3 pb-2`}>{landmark.year} - {landmark.eraEndYear}</p>
                }
                {landmark.intro &&
                    <p className={`px-2 pt-1 mx-1 max-h-3/4 overflow-y-auto min-scrollbar`}>{landmark.intro}</p>
                }
            </div>
            <InfoModal landmark={landmark} isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
    )
}

export default Era;