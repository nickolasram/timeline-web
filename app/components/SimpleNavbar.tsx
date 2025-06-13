import Link from "next/link";

interface ISimpleNavbar{
    title: string;
    id: string;
}

// show autors

const SimpleNavbar=({title, id}: ISimpleNavbar)=>{
    return(
        <div className={`h-[4rem] bg-[#0b030f] width-dvw min-w-dvw flex-row flex items-center justify-between px-5 print:hidden`}>
            <Link href={`/timeline/${id}`}  className={'text-3xl text-white'}>
                <p>{title}</p>
            </Link>
            <Link href={'/'}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6">
                    <path fillRule="evenodd"
                          d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
                          clipRule="evenodd"/>
                </svg>
            </Link>
        </div>
    )
}

export default SimpleNavbar;