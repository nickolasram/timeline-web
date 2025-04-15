import RelationshipGroup from "@/app/components/RelationshipGroup";
import InfoModal from "@/app/components/InfoModal";
import {ILandmark} from "@/types";
import { useState } from "react";

const svgBaseWidth= 250

interface IBaseLandmarkProp {
    landmark: ILandmark
}

const BaseLandmark=({landmark}: IBaseLandmarkProp) => {
    const [isOpen, setIsOpen] = useState(false)
    let bgRules = '';
    if(landmark.image){bgRules = 'opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out'}
    const innerStyle = landmark.size == 3 ? `flex justify-center items-center text-center` : '';
    return(
        <div
            className={`${landmark.column} ${landmark.row}
            transition-all duration-300 ease-in-out group
            grid grid-cols-1 grid-rows-1 justify-items-center items-center`}>
            <svg height={'100%'} width={'100%'} fill={'red'} overflow={'visible'}
                 viewBox={`${-svgBaseWidth / 2} ${-svgBaseWidth / 2} ${svgBaseWidth} ${svgBaseWidth}`}
                 className={`col-1 row-1`}>
                <circle r={svgBaseWidth / 2 } cx='0' cy='0' fill="none"
                        strokeWidth={'1'} stroke={'none'}/>
                <g>
                    { landmark.relationshipGroups &&
                        landmark.relationshipGroups.map((relationshipGroup, index) => {
                            return(
                                <RelationshipGroup relationshipGroup={relationshipGroup} key={index}/>
                            )
                        })
                    }
                </g>
            </svg>
            <div className={`col-1 row-1 border-4 ${landmark.borderColor} w-[75%] h-[75%] rounded-full ${landmark.image} 
            bg-cover bg-center cursor-pointer`}
            onClick={() => setIsOpen(true)}>
                <div className={`${landmark.bgColor} w-full h-full rounded-full flex flex-col justify-center items-center`}>
                    <div className={`h-[71%] w-[71%]  
                        ${bgRules} ${innerStyle}`}>
                        <p id={landmark.id} >{landmark.title}</p>
                        {
                            landmark.size != 3 &&
                            <>
                                <p>active: {landmark.year}-{landmark.activeEndYear}</p>
                                <p>{landmark.birthYear}-{landmark.deathYear}</p>
                            </>
                        }
                    </div>
                </div>
            </div>
            <InfoModal landmark={landmark} isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
    )
}

export default BaseLandmark;