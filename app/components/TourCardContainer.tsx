import {ReactNode} from "react";

interface IProps {
    title?:string;
    children?:ReactNode;
}

const TourCardContainer=({title, children}:IProps)=>{
    return (
        <div className="h-full w-1/5 rounded-4xl p-10">
            {title &&
                <h2 className={'text-3xl cardTitle relative z-10 mb-5'}>
                    {title}
                </h2>
            }
            {children}
        </div>
    )
}

export default TourCardContainer;