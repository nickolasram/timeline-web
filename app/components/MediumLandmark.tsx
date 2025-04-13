import BaseLandmark from "./BaseLandmark";
import { ITimelineArrow } from "@/types";

interface IMediumLandmark {
    column: string;
    row: string;
    relationAngles: ITimelineArrow[];
    title: string;
    year: number;
    activeEndYear?: number;
    birthyear?: number;
    deathyear?: number;
    image?: string;
    bgColor: string;
    borderColor: string;
    description?: string;
}

const MediumLandmark=({column, row, relationAngles, title, year, activeEndYear,
    birthyear, deathyear, bgColor, borderColor, description
}: IMediumLandmark)=>{
    return(
        <BaseLandmark column={column} row={row} relationAngles={relationAngles}
        title={title} bgColor={bgColor} borderColor={borderColor} year={year} activeEndYear={activeEndYear} birthyear={birthyear}
        deathyear={deathyear} description={description}>
            <p>active: {year}-{activeEndYear}</p>
            <p>{birthyear}-{deathyear}</p>
        </BaseLandmark>
    )
}

export default MediumLandmark;