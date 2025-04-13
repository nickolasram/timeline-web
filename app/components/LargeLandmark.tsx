import BaseLandmark from "./BaseLandmark";
import { ITimelineArrow } from "@/types";

interface ILargeLandmark {
    column: string;
    row: string;
    relationAngles: ITimelineArrow[];
    title: string;
    year: number;
    activeEndYear?: number;
    birthyear?: number;
    deathyear?: number;
    image?: string
    bgColor: string;
    borderColor: string;
    description?: string;
}

const LargeLandmark=({column, row, relationAngles, title, year, activeEndYear,
    birthyear, deathyear, image, bgColor, borderColor, description
}: ILargeLandmark)=>{
    return(
        <BaseLandmark column={column} row={row} relationAngles={relationAngles}
        title={title} image={image} bgColor={bgColor} borderColor={borderColor} year={year} activeEndYear={activeEndYear} birthyear={birthyear}
        deathyear={deathyear} description={description}>
            <p>active: {year}-{activeEndYear}</p>
            <p>{birthyear}-{deathyear}</p>
        </BaseLandmark>
    )
}

export default LargeLandmark;