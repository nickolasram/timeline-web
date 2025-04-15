import { IRelationshipGroup } from "@/types";
import {useEffect, useState} from "react";
import {Popover, PopoverButton, PopoverPanel} from "@headlessui/react";

interface IRelationshipGroupProps {
    relationshipGroup:IRelationshipGroup;
}

const RelationshipGroup=({ relationshipGroup }: IRelationshipGroupProps)=>{
    const [isRendered, setRendered] = useState(false);
    useEffect(() => {
        setRendered(true);

        return () => {
            setRendered(false);
        }
    }, []);
    return(
        <g>
            {isRendered &&
                <Popover as="g">
                    {({ open }) => (
                        <>
                            <PopoverButton as="path"
                                           d={`M ${relationshipGroup.startPoint} A 100 100 45 0 1 ${relationshipGroup.endPoint}`}
                                           fill="none"
                                           stroke="#B2C063"
                                           strokeWidth="4"
                                           transform={`rotate(15)`}
                                           className={`group-hover:scale-105 transition-all duration-300 ease-in-out
                                group-hover:stroke-5 cursor-pointer`}
                            ></PopoverButton>
                            {open && (
                                <g>
                                    {
                                        relationshipGroup.relationships.map((relationship, index)=>{
                                            return(
                                                <PopoverPanel as={"text"}
                                                              x={relationship.x}
                                                              y={relationship.y} fontSize="10"
                                                              static key={index} fill="white"
                                                              dx={`${relationship.dx}%`} dy={`${relationship.dy}%`}
                                                              className={`cursor-pointer`}
                                                              onMouseDown={(event)=>{
                                                                  if (event.button == 0){
                                                                      const element = document!.getElementById(relationship.targetId)!
                                                                      element.scrollIntoView({ behavior: "smooth", block: "end", inline: "center" })
                                                                      element.classList.add('animate-[blinker_1s_linear_5]')
                                                                      setTimeout(function () {
                                                                          element.classList.remove('animate-[blinker_1s_linear_5]')
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