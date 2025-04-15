interface IRelationship{
    title: string;
    x: number;
    y: number;
    dx: number;
    dy: number;
    targetId: string;
}

export interface IRelationshipGroup {
    startPoint: string;
    endPoint: string;
    relationships: IRelationship[];
}

export interface ILandmark {
    activeEndDay?: number;
    activeEndMonth?: number;
    activeEndYear?: number;
    bgColor: string;
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
    image?: string;
    month: number;
    relationshipGroups?: IRelationshipGroup[];
    row: string;
    size: number;
    title: string;
    year: number;
}