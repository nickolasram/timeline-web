interface IEra {
    column: string;
    row: string;
    year: number;
    title: string;
    image?: string;
    eraEndYear?: string;
    displayDate?: boolean;
    bgColor: string;
    description?: string;
}

const Era=({column, row, year, title, image, eraEndYear, displayDate, bgColor, description}: IEra)=>{
    return(
        <div className={`${column} ${row}  w-full h-full bg-cover
        ${image}`}>
            <div className={`${bgColor} w-full h-full p-3`}>
                <p className={`text-3xl`}>{title}</p>
                {displayDate &&
                    <p>{year} - {eraEndYear}</p>
                }
            </div>
        </div>
    )
}

export default Era;