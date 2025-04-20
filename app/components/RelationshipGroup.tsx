import { ILandmark, IRelationshipGroup } from "@/types";
import {useEffect, useState} from "react";
import {Popover, PopoverButton, PopoverPanel} from "@headlessui/react";

interface IRelationshipGroupProps {
    relationshipGroup:IRelationshipGroup;
    color: string;
    landmark: ILandmark;
}

const RelationshipGroup=({ relationshipGroup, color, landmark }: IRelationshipGroupProps)=>{
    const [isRendered, setRendered] = useState(false);
    useEffect(() => {
        setRendered(true);

        return () => {
            setRendered(false);
        }
    }, []);
    let size: string;
    let titlesShown: number;
    switch (landmark.size){
        case 3:
            size = '2rem'
            titlesShown = 4
            break
        case 5:
            size = '1rem'
            titlesShown = 5
            break
        case 7:
            size = '1rem'
            titlesShown = 6
            break
    }
    return(
        <g>
            {isRendered &&
                <Popover as="g">
                    {({ open }) => (
                        <>
                            <PopoverButton as="path"
                                           d={`M ${relationshipGroup.startPoint} A 100 100 45 0 1 ${relationshipGroup.endPoint}`}
                                           fill="none"
                                           stroke={color.slice(8,15)}
                                           strokeWidth="4"
                                           transform={`rotate(15)`}
                                           className={`group-hover:scale-105 transition-all duration-300 ease-in-out
                                group-hover:stroke-5 cursor-pointer`}
                            ></PopoverButton>
                            {open && (
                                <g>
                                    {
                                        relationshipGroup.relationships.slice(0,titlesShown).map((relationship, index)=>{
                                            return(
                                                <PopoverPanel as={"text"}
                                                              x={relationship.x}
                                                              y={relationship.y} fontSize={size}
                                                              static key={index} fill="white"
                                                              dx={`${relationship.dx}%`} dy={`${relationship.dy}%`}
                                                              className={`cursor-pointer`}
                                                              onMouseDown={(event)=>{
                                                                  if (event.button == 0){
                                                                      const element = document!.getElementById(relationship.targetId)!
                                                                      element.scrollIntoView({ behavior: "smooth", block: "end", inline: "center" })
                                                                      element.classList.add('animate-[blinker_500ms_linear_5]')
                                                                      setTimeout(function () {
                                                                          element.classList.remove('animate-[blinker_500ms_linear_5]')
                                                                      }, 5000);
                                                                  }
                                                              }}>
                                                    {relationship.title}
                                                </PopoverPanel>
                                            )
                                        })
                                    }
                                </g>
                            )}
                        </>
                    )}
                </Popover>
            }
        </g>
    )
}

export default RelationshipGroup;