import BaseLandmark from "./BaseLandmark";
import { ITimelineArrow } from "@/types";

interface ISmallLandmark {
    column: string;
    row: string;
    relationAngles: ITimelineArrow[];
    title: string;
    image?: string;
    bgColor: string;
    borderColor: string;
    year?: number;
    activeEndYear?: number;
    deathYear?: number;
    birthYear?: number;
    description?: string;
}

const SmallLandmark=({column, row, relationAngles, title, image, bgColor, borderColor,
    year, activeEndYear, birthYear, deathYear, description
}: ISmallLandmark)=>{
    const innerstyle = `flex justify-center items-center text-center`;
    return(
        <BaseLandmark column={column} row={row} relationAngles={relationAngles}
        title={title} innerStyle={innerstyle} image={image} bgColor={bgColor} borderColor={borderColor}
        year={year} activeEndYear={activeEndYear} birthyear={birthYear}
        deathyear={deathYear} description={description}/>
    )
}

export default SmallLandmark