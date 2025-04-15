import Era from "./Era";
import { ILandmark } from "@/types";
import BaseLandmark from "@/app/components/BaseLandmark";

interface ILandmarkProp {
    landmark: ILandmark;
}

const Landmark = ({landmark}: ILandmarkProp) =>{
    if(landmark.era){
        return <Era landmark={landmark} />
    }
    return <BaseLandmark landmark={landmark} />
}

export default Landmark;