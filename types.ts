export interface IYear{
    year:number;
    endYear:number;
    placeholder:boolean;
    hoverContent:string;
    setContent:string;
    span:boolean;
    firstId:boolean|string;
    firstEra:boolean;
    bgYearColumn:boolean|string;
    percentageAcross: number;
    bgYearDisplay:string|number;
}

export interface IRelationship{
    title: string;
    x: number;
    y: number;
    textAnchor: string;
    dy: number;
    targetId: string;
    context:boolean|string;
    date: number;
    displayDate: boolean;
    color: string;
}

export interface IRelationshipGroup {
    startPoint: number[];
    endPoint: number[];
    relationships: IRelationship[];
    future: boolean;
}

interface IPresentations{
    title: string;
    index: number;
}

export interface ILandmarkImage{
    image:string;
    description:string;
    alt:string;
}

export interface ILandmark {
    activeEndDay?: number;
    activeEndMonth?: number;
    activeEndYear?: number;
    bgColor: string;
    bgImage: number | string | boolean;
    birthDay?: number;
    birthMonth?: number;
    birthYear?: number;
    borderColor: string;
    column: string;
    day: number;
    deathDay?: number;
    deathMonth?: number;
    deathYear?: number;
    description?: string;
    displayDate?: boolean
    era: boolean;
    eraEndYear?: number;
    id: string;
    images?: undefined | ILandmarkImage[];
    intro?: boolean | string;
    month: number;
    person: boolean;
    relationshipGroups?: IRelationshipGroup[];
    row: string;
    size: number;
    title: string;
    year: number;
    links:false|{link:string,display:string}[];
    color:string;
    keyPoints:string[]|false;
    presentations: IPresentations[];
    relativeTimePosition: number[];
    sources: boolean|string[];
    endDate: boolean|number;
    files: boolean|{link:string,display:string}[];
}

export interface IMetaData {
    timelineTitle: string;
    citations: string;
    note: false|string[];
    authors: string[];
    id:string;
    landmarkCount: number;
}

export interface IPresentationMetadata {
    title: string;
    highIndex: number;
    firstLandmarkID: string;
    id: string;
}

export interface IPresentation {
    meta: IPresentationMetadata
    landmarks: ILandmark[];
}

export interface ITimeline {
    meta: IMetaData;
    landmarks: ILandmark[];
    years: IYear[];
    yearsIndex: object;
    presentations: IPresentation[];
    presentationsSummary: IPresentationMetadata[]
}