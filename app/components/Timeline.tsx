import Landmark from "@/app/components/Landmark";
import data from '@/data.json'

const landmarks = data.landmarks;

const Timeline = () => {
    const coordinates = []
    for (let i = 1; i < 13; i++) {
        // can probably get rid of this loop
        for (let j = 1; j < 26; j++) {
            coordinates.push([j, i])
        }
    }

    return(
        <section className={'bg-gray-950 h-[calc(95vh-4rem)] grid grid-rows-12 auto-cols-[calc((95vh-4rem)/12)] ' +
            'w-fit min-w-screen mt-[4rem]'}>
            {
                landmarks.map((landmark, index) => {
                    return (
                        <Landmark landmark={landmark} key={index} />
                    )
                })
            }
        </section>

    )
}

export default Timeline;