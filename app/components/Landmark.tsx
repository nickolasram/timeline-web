import Era from "./Era";
import { ILandmark } from "@/types";
import BaseLandmark from "@/app/components/BaseLandmark";
import NodeLandmark from "@/app/components/NodeLandmark";

interface ILandmarkProp {
    landmark: ILandmark
}

const Landmark = ({landmark}: ILandmarkProp) =>{

    if(landmark.era){
        return <Era landmark={landmark} />
    }
    if(landmark.size == 1){
        return <NodeLandmark landmark={landmark} />
    }
    return <BaseLandmark landmark={landmark} />
}

export default Landmark;