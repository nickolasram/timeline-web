import {ILandmark} from "@/types";

interface IEraProp {
    landmark: ILandmark;
}

const Era=({landmark}: IEraProp)=>{
    return(
        <div id={landmark.id} className={`${landmark.column} ${landmark.row}  w-full h-full bg-cover
        ${landmark.image}`}>
            <div className={`${landmark.bgColor} w-full h-full`}>
                <p className={`text-3xl pt-3 px-3 text-shadow-indigo-500`}>{landmark.title}</p>
                {landmark.displayDate &&
                    <p>{landmark.year} - {landmark.eraEndYear}</p>
                }
                {landmark.description &&
                    <p className={`mt-3
                        [text-shadow:_0_2px_4px_rgba(0,0,0,0.5)]
                    px-3 py-3`}>{landmark.description}</p>
                }
            </div>
        </div>
    )
}

export default Era;