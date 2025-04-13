import Landmark from "@/app/components/Landmark";
import data from '@/data.json'

const landmarks = data.landmarks;

const Timeline = () => {
    const coordinates = []
    for (let i = 1; i < 13; i++) {
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
                        <Landmark column={landmark.column} row={landmark.row} 
                        era={landmark.era} year={landmark.year} title={landmark.title}
                        relationAngles={landmark.relationshipAngles} size={landmark.size} 
                        activeEndYear={landmark?.a_e_year} birthyear={landmark?.birthyear}
                        deathyear={landmark?.deathyear} image={landmark?.image} displayDate={landmark.display_date}
                         key={index} bgColor={landmark.bg_color} borderColor={landmark.border_color}
                         description={landmark.description}/>
                    )
                })
            }
        </section>

    )
}

export default Timeline;