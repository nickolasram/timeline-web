import Era from "./Era";
import SmallLandmark from "./SmallLandmark";
import MediumLandmark from "./MediumLandmark";
import LargeLandmark from "./LargeLandmark";
import { ITimelineArrow } from "@/types";

interface ILandmark {
    column: string;
    row: string;
    relationAngles: ITimelineArrow[];
    era: boolean;
    year: number;
    title: string;
    size: number;
    activeEndYear?: number;
    birthyear?: number;
    deathyear?: number;
    image?: string;
    eraEndYear?: string;
    displayDate?: boolean;
    bgColor: string;
    borderColor: string;
    description?: string;
}

const Landmark = ({column, row, relationAngles, era, year, title, size,
    activeEndYear, birthyear, deathyear, image, eraEndYear, displayDate, bgColor, borderColor, description
}: ILandmark) =>{
    if(era){
        return(
            <Era title={title} column={column} row={row} year={year} image={image} eraEndYear={eraEndYear}
            displayDate={displayDate} bgColor={bgColor} description={description}/>
        )
    }
    if(size==3){
        return(
            <SmallLandmark column={column} row={row} relationAngles={relationAngles}
            title={title} image={image} bgColor={bgColor} borderColor={borderColor} year={year}
            birthYear={birthyear} activeEndYear={activeEndYear} deathYear={deathyear} description={description}/>
        )
    }
    if(size==5){
        return(
            <MediumLandmark column={column} row={row} relationAngles={relationAngles}
            title={title} year={year} activeEndYear={activeEndYear} birthyear={birthyear}
            deathyear={deathyear} image={image} bgColor={bgColor} borderColor={borderColor} description={description}/>
        )
    }
    // default case
    return(
        <LargeLandmark column={column} row={row} relationAngles={relationAngles}
            title={title} year={year} activeEndYear={activeEndYear} birthyear={birthyear}
            deathyear={deathyear} image={image} bgColor={bgColor} borderColor={borderColor} description={description}/>
    )
}

export default Landmark;