import { ILandmark, IRelationshipGroup, IRelationship } from "@/types";
import {useEffect, useState} from "react";
import {Popover, PopoverButton, PopoverPanel} from "@headlessui/react";

interface IRelationshipGroupProps {
    relationshipGroup:IRelationshipGroup;
    color: string;
    landmark: ILandmark;
}

interface IRelationshipTitle{
    relationship: IRelationship;
    size:string;
    index:number;
}

const RelationshipTitle =({relationship, size, index}: IRelationshipTitle)=> {
    if (!relationship.context){
        return (
            <text
                filter="url(#solid)"
                x={relationship.x}
                y={relationship.y}
                dx={`0`}
                dy={`${relationship.dy}%`}
                fontSize={size}
                fill="#ffffffdd"
                textAnchor={relationship.textAnchor}
                strokeWidth="3"
                stroke="black"
                paintOrder={'stroke'}
            >
                {relationship.title}
                {/*<tspan fill={color} fontSize={24} alignmentBaseline={'middle'}>&#8226;</tspan>*/}
            </text>
        )
    }
    else {
        return(
            <g id={`relationshipAnimationGroup${index}`}>
                <text
                    filter="url(#solid)"
                    opacity={'0'}
                    x={relationship.x}
                    y={relationship.y}
                    dx={`0`}
                    dy={`${relationship.dy}%`}
                    fontSize={size}
                    fill="#ffffffdd"
                    textAnchor={relationship.textAnchor}
                    strokeWidth="3"
                    stroke="black"
                    paintOrder={'stroke'}
                >
                    {relationship.context}
                    <animate
                        begin={`relationshipAnimationGroup${index}.mouseover`}
                        attributeName={'opacity'}
                        values={'0;1;'}
                        dur="200ms"
                        fill={'freeze'}
                    />
                    <animate
                        begin={`relationshipAnimationGroup${index}.mouseout`}
                        attributeName={'opacity'}
                        values={'1;0;'}
                        dur="200ms"
                        fill={'freeze'}
                    />
                </text>
                <text
                    filter="url(#shadow)"
                    x={relationship.x}
                    y={relationship.y}
                    dx={`0`}
                    dy={`${relationship.dy}%`}
                    fontSize={size}
                    fill="#ffffffdd"
                    textAnchor={relationship.textAnchor}
                    strokeWidth="3"
                    stroke="black"
                    paintOrder={'stroke'}
                    textDecoration="underline"
                >
                    {relationship.title}
                    {/*<tspan fill={"#ffffffdd"}>&#8226;</tspan>*/}
                    <animate
                        begin={`relationshipAnimationGroup${index}.mouseover`}
                        attributeName={'opacity'}
                        values={'1;0;'}
                        dur="200ms"
                        fill={'freeze'}
                    />
                    <animate
                        begin={`relationshipAnimationGroup${index}.mouseout`}
                        attributeName={'opacity'}
                        values={'0;1;'}
                        dur="200ms"
                        fill={'freeze'}
                    />
                </text>
            </g>
        )
    }
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
    let stroke: number;
    let hover: string;
    let factor = 1;
    switch (landmark.size){
        case 3:
            size = '1.5rem'
            titlesShown = 4
            stroke = 8
            hover = 'group-hover:stroke-10'
            factor = 1.05
            break
        case 5:
            size = '0.825rem'
            titlesShown = 5
            stroke = 6
            hover = 'group-hover:stroke-8'
            factor = 1.02
            break
        case 7:
            size = '0.65rem'
            titlesShown = 6
            stroke = 4
            hover = 'group-hover:stroke-5'
            break
    }
    return(
        <g>
            {isRendered &&
                <Popover as="g">
                    {({ open }) => (
                        <>
                            <PopoverButton as="path"
                                           opacity={'0.75'}
                                           d={`M ${relationshipGroup.startPoint[0] * factor} ${relationshipGroup.startPoint[1]  * factor}
                                             A ${100 * factor} ${100 * factor} 45 0 ${relationshipGroup.future ? 1 : 0}
                                             ${relationshipGroup.endPoint[0]  * factor} ${relationshipGroup.endPoint[1]  * factor}`}
                                           fill="none"
                                           stroke={landmark.color}
                                           strokeWidth={stroke}
                                           transform={`rotate(${relationshipGroup.future ? 15 : -15})`}
                                           className={`group-hover:scale-105 transition-all duration-300 ease-in-out
                                                        cursor-pointer ${hover}`}
                            ></PopoverButton>
                            {open && (
                                <g>
                                    {
                                        relationshipGroup.relationships.slice(0,titlesShown).map((relationship, index)=>{
                                            return(
                                                <PopoverPanel key={index} static as={"g"}
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
                                                              }}
                                                >
                                                        <RelationshipTitle relationship={relationship} size={size} index={index}/>
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