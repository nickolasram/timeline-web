interface ILandmark {
    column: string;
    row: string;
    relationAngles: number[];
}

interface ITimelineArrow {
    startpoint: string;
    endpoint: string;
}

const svgBaseWidth= 250

const TimelineArrow=({startpoint, endpoint}: ITimelineArrow)=>{
     return(
        <path
            d={`M ${startpoint} A 100 100 45 0 1 ${endpoint}`}
            fill="none"
            stroke="#B2C063"
            strokeWidth="4"
            transform={`rotate(15)`}
        />
    )
}

const Landmark = ({column, row, relationAngles}: ILandmark) =>{
    return(
        <div className={` ${column} ${row} border-amber-50 border-2
            hover:scale-110 transition-all duration-300 ease-in-out group
            grid grid-cols-1 grid-rows-1 justify-items-center items-center`}>
            <div className={`col-1 row-1 bg-[#B2C0637F] border-4 border-[#B2C063] w-[75%] h-[75%] rounded-full
                 flex flex-col justify-center items-center`}>
                <p>a</p>
            </div>
            <svg height={'100%'} width={'100%'} fill={'red'}
                 viewBox={`${-svgBaseWidth / 2} ${-svgBaseWidth / 2} ${svgBaseWidth} ${svgBaseWidth}`}
                 className={`col-1 row-1`}>
                <circle r={svgBaseWidth / 2 } cx='0' cy='0' fill="none"
                        strokeWidth={'1'} stroke={'none'}/>
                <g>
                    {
                        relationAngles.map((angle, index) => {
                            return(
                                <TimelineArrow startpoint={angle.startpoint} endpoint={angle.endpoint} key={index}/>
                            )
                        })
                    }
                </g>
            </svg>
        </div>
    )
}

export default Landmark;