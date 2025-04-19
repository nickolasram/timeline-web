import RelationshipGroup from "@/app/components/RelationshipGroup";
import InfoModal from "@/app/components/InfoModal";
import { ILandmark } from "@/types";
import { useState } from "react";

const svgBaseWidth= 250

interface IBaseLandmarkProp {
    landmark: ILandmark
}

interface IStyle{
    years: string;
    title: string;
    imageRules: string;
    intro: string;
    outerCircle: string;
    textContainer: string;
}

const landmarkStyle =(landmark: ILandmark)=>{
    const styleObject: IStyle = {
        imageRules: '',
        intro: landmark.birthYear ? 'text-gray-400 line-clamp-2 ': 'text-gray-400 line-clamp-3 ',
        title: landmark.size == 7 && landmark.intro ? 'line-clamp-2 ': 'line-clamp-3 ',
        years: landmark.size == 5 ? `text-sm` : `text-md`,
        textContainer: 'h-[71%] w-[71%] flex justify-center ',
        outerCircle: `col-1 row-1 border-4
                      ${landmark.borderColor} 
                      w-[75%] h-[75%] rounded-full ${landmark.bgImage} 
                      bg-cover bg-center cursor-pointer
                      text-shadow-[1px_0_2px_rgb(0_0_0_/_1)_,_-1px_0_2px_rgb(0_0_0_/_1)_,_0_-1px_2px_rgb(0_0_0_/_1)_,_0_1px_2px_rgb(0_0_0_/_1)] `
    }
    if(landmark.bgImage) {styleObject.textContainer += 'opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out '}
    styleObject.textContainer += landmark.size == 3 ? `flex justify-center items-center text-center) `: ' ';
    switch(landmark.size){
        case 5:
            styleObject.title += 'text-xl '
            break;
        case 7:
            styleObject.title += 'text-2xl '
            break;
        default:
            styleObject.title += 'text-center '
            break;
    }
    return styleObject
}

const BaseLandmark=({landmark}: IBaseLandmarkProp) => {
    const [isOpen, setIsOpen] = useState(false)
    const style = landmarkStyle(landmark)
    let yearString = `${landmark.year}`
    if (landmark.person) yearString = 'active: ' + yearString
    if (landmark.activeEndYear) yearString += ` - ${landmark.activeEndYear}`
    let lifeYearString = `${landmark.birthYear} -`
    if (landmark.deathYear) lifeYearString += ` ${landmark.deathYear}`
    return(
        // landmark container
        <div
            className={`${landmark.column} ${landmark.row}
            transition-all duration-300 ease-in-out group
            grid grid-cols-1 grid-rows-1 justify-items-center items-center`}>

            {/* svg background / overlay */}
            <svg
                height={'100%'}
                width={'100%'}
                fill={'red'}
                overflow={'visible'}
                viewBox={`${-svgBaseWidth / 2} ${-svgBaseWidth / 2} ${svgBaseWidth} ${svgBaseWidth}`}
                className={`col-1 row-1`}>
                {/* relationship groups group */}
                <g>
                    { landmark.relationshipGroups &&
                        landmark.relationshipGroups.map((relationshipGroup, index) => {
                            return(
                                // relationship group
                                <RelationshipGroup relationshipGroup={relationshipGroup} color={landmark.borderColor} key={index}/>
                            )
                        })
                    }
                </g>
            </svg>

            {/* outer circle */}
            <div className={style.outerCircle}
            onClick={() => setIsOpen(true)}>
                {/* inner circle */}
                <div id={landmark.id} className={`${landmark.bgColor} w-full h-full rounded-full flex flex-col justify-center items-center`}>
                    {/* text container */}
                    <div className={style.textContainer}>
                        <div className={`h-[100%] flex flex-col justify-around items-baseline`}>
                            <div>
                                {/*title*/}
                                <h2 className={`${style.title}`}>
                                    {landmark.title}
                                </h2>
                                {
                                    landmark.size != 3 &&
                                    <>
                                        {/* birth (and death) year(s) */}
                                        {landmark.birthYear &&
                                            <p  className={style.years}>{lifeYearString}</p>
                                        }
                                        {/* year(s) */}
                                        <p className={style.years}>{yearString}</p>
                                    </>
                                }
                            </div>
                            {landmark.size == 7 &&
                                <div>
                                    <p className={style.intro}>{landmark.intro}</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {/* modal */}
            <InfoModal landmark={landmark} isOpen={isOpen} setIsOpen={setIsOpen}/>
        </div>
    )
}

export default BaseLandmark;