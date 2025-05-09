import data from '@/data.json'
import {ILandmark} from "@/types";

interface ILandmarkPage{
    id: string;
    timelineid: string;
}

export default async function LandMarkPage(
    {params}: {params: ILandmarkPage}){
    params = await params
    const timeline = data[params.timelineid]
    const landmark = timeline.landmarks.find((landmark: ILandmark) => landmark.id === params.id);
    if(landmark){
        return(
            <div className={'bg-gray-100 h-[calc(100vh-4rem)] mt-[4rem] text-black'}>
                <p>{landmark.title}</p>
            </div>
        )
    }
}