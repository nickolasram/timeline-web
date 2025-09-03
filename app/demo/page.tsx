interface coordinate{
    x: number;
    y: number;
}

interface lsvgProps {
    coordinates: coordinate[]
}

const LineSVG=({coordinates}: lsvgProps)=>{
    const xValues = coordinates.map(x=>{return x.x});
    const yValues = coordinates.map(y=>{return y.y});
    const minX = Math.min(...xValues);
    const minY = Math.min(...yValues);
    const maxX = Math.max(...xValues);
    const maxY = Math.max(...yValues);
    const vbWidth = (maxX - minX + 1)*10;
    const vbHeight = (maxY - minY + 1)*10;
    const focusLandmark = coordinates[0];
    const xNudge = 1 - minX;
    const farthestLandmark = coordinates.find(obj=>obj.x==maxX);
    let lineStart;
    if (minX == focusLandmark.x){
        lineStart = `${(minX + xNudge) * 10 - 5} ${focusLandmark.y * 10 - 5}`;
    } else {
        lineStart = `${(minX + xNudge) * 10 + 5} ${focusLandmark.y * 10 - 5}`;
    }
    const lineEnd = `${(farthestLandmark!.x + xNudge) * 10 - 15} ${focusLandmark.y * 10 - 5}`;

    const defineCurve=(providedX:number, providedY:number)=>{
        let curveModifier:number;
        if (providedY - focusLandmark.y > 0){
            curveModifier = 20;
        } else {
            curveModifier = -20;
        }
        let curveStart;
        if (providedX > focusLandmark.x){
            curveStart = `${(providedX + xNudge) * 10 - 15} ${focusLandmark.y * 10 - 5}`;
        } else {
            curveStart = `${(providedX + xNudge) * 10 + 5} ${focusLandmark.y * 10 - 5}`;
        }
        const curveEndBezierX = (providedX+xNudge)*10-5;
        const curveStartBezierX = curveEndBezierX
        const curveEndX = curveEndBezierX
        const curveEndY = providedY*10-5;
        const curveStartBezierY = focusLandmark.y * 10 - 5;
        const curveEndBezierY = curveStartBezierY + curveModifier;
        const curveString = `M${curveStart}C${curveStartBezierX} ${curveStartBezierY} ${curveEndBezierX} ${curveEndBezierY} ${curveEndX} ${curveEndY}`
        return curveString;
    }

    const allButStart = coordinates.slice(1);
    const allCurves = allButStart.map(i=>{
        return defineCurve(i.x, i.y);
    })
    const allCurvesString = allCurves.join();

    let landmarkTimeline = `M${lineStart}L${lineEnd}`
    landmarkTimeline += allCurvesString;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{gridColumnStart: minX, gridColumnEnd: maxX+1, gridRowStart: minY,gridRowEnd: maxY+1}}
            viewBox={`0 0 ${vbWidth} ${vbHeight}`}
            className={'bg-white'}>
            <path stroke={"black"} strokeWidth={0.5} d={landmarkTimeline} fill={"none"}/>
        </svg>
    )
}

const Page =()=>{
    return(
        <div className={`w-[100vh] h-screen bg-purple-800 grid grid-rows-12 grid-cols-12`}>
            <div>
                {/*<div className={`col-start-1 col-end-2 row-start-1 row-end-13 border-2 border-black`}>*/}
                {/*</div>*/}
                {/*<div className={`col-start-3 col-end-4 row-start-1 row-end-13 border-2 border-black`}>*/}
                {/*</div>*/}
                {/*<div className={`col-start-5 col-end-6 row-start-1 row-end-13 border-2 border-black`}>*/}
                {/*</div>*/}
                {/*<div className={` col-start-7 col-end-8 row-start-1 row-end-13 border-2 border-black`}>*/}
                {/*</div>*/}
                {/*<div className={`col-start-9 col-end-10 row-start-1 row-end-13 border-2 border-black`}>*/}
                {/*</div>*/}
                {/*<div className={`col-start-11 col-end-12 row-start-1 row-end-13 border-2 border-black`}>*/}
                {/*</div>*/}


                {/*<div className={`col-start-1 col-end-13 row-start-1 row-end-2 border-2 border-black`}>*/}
                {/*</div>*/}
                {/*<div className={`col-start-1 col-end-13 row-start-3 row-end-4 border-2 border-black`}>*/}
                {/*</div>*/}
                {/*<div className={`col-start-1 col-end-13 row-start-5 row-end-6 border-2 border-black`}>*/}
                {/*</div>*/}
                {/*<div className={`col-start-1 col-end-13 row-start-7 row-end-8 border-2 border-black`}>*/}
                {/*</div>*/}
                {/*<div className={`col-start-1 col-end-13 row-start-9 row-end-10 border-2 border-black`}>*/}
                {/*</div>*/}
                {/*<div className={`col-start-1 col-end-13 row-start-11 row-end-12 border-2 border-black`}>*/}
                {/*</div>*/}
                {/*<LineSVG coordinates={[{x: 1, y: 3}, {x: 5, y: 1}, {x: 4, y: 7}, {x: 6, y: 2}]}/>*/}
            </div>

            <LineSVG coordinates={[{x: 3, y: 3}, {x: 2, y: 2}, {x: 1, y: 4}, {x: 5, y: 1}, {x: 4, y: 7}, {x: 6, y: 2}]}/>

            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 120 120"
                 fill="blue"
                 className={`col-start-1 -col-end-1 row-start-1 -row-end-1`}
                 >
                <circle cx="25" cy="25" r="4" fill={"red"}/>
                <circle cx="5" cy="35" r="4" fill={"red"}/>
                <circle cx="15" cy="15" r="4" fill={"red"}/>
                <circle cx="35" cy="65" r="4" fill={"red"}/>
                <circle cx="45" cy="5" r="4" fill={"red"}/>
                <circle cx="55" cy="15" r="4" fill={"red"}/>
            </svg>
            <div className={'relative border-2 border-black w-[5ch] h-5'}>
                <p className={'wiggle'}>asdsadasdasd</p>
            </div>
        </div>
    )
}

export default Page;