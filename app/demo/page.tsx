const Page =()=>{
    return(
        <div className={`w-[100vh] h-screen bg-purple-800 grid grid-rows-12 grid-cols-12`}>
            <div className={`col-start-1 col-end-2 row-start-1 row-end-13 border-2 border-black`}>
            </div>
            <div className={`col-start-3 col-end-4 row-start-1 row-end-13 border-2 border-black`}>
            </div>
            <div className={`col-start-5 col-end-6 row-start-1 row-end-13 border-2 border-black`}>
            </div>
            <div className={` col-start-7 col-end-8 row-start-1 row-end-13 border-2 border-black`}>
            </div>
            <div className={`col-start-9 col-end-10 row-start-1 row-end-13 border-2 border-black`}>
            </div>
            <div className={`col-start-11 col-end-12 row-start-1 row-end-13 border-2 border-black`}>
            </div>


            <div className={`col-start-1 col-end-13 row-start-1 row-end-2 border-2 border-black`}>
            </div>
            <div className={`col-start-1 col-end-13 row-start-3 row-end-4 border-2 border-black`}>
            </div>
            <div className={`col-start-1 col-end-13 row-start-5 row-end-6 border-2 border-black`}>
            </div>
            <div className={`col-start-1 col-end-13 row-start-7 row-end-8 border-2 border-black`}>
            </div>
            <div className={`col-start-1 col-end-13 row-start-9 row-end-10 border-2 border-black`}>
            </div>
            <div className={`col-start-1 col-end-13 row-start-11 row-end-12 border-2 border-black`}>
            </div>


            <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 120 120"
                 fill="blue"
                 className={`col-start-1 -col-end-1 row-start-1 -row-end-1`}
                 >
                <circle cx="5" cy="5" r="4" />

                <path stroke={"black"} id={"testPath"} strokeWidth={0.5} d={"M5 25l30 0C45 25 45 25 45 5M35 25l25 0"} fill={'none'}    />
                <text fontSize={4}>
                    <textPath href={"#testPath"}>asdasasd</textPath>
                </text>
                {/*<path stroke={"black"} strokeWidth={0.5} d={"M5 25l60 0"} fill={'none'}    />*/}
                <circle cx="5" cy="25" r="4" fill={"red"}/>
                <circle cx="45" cy="5" r="4" fill={"red"}/>

                <circle cx="5" cy="45" r="4" />
                <circle cx="5" cy="65" r="4" />
                <circle cx="5" cy="85" r="4" />
                <circle cx="5" cy="105" r="4" />
            </svg>
        </div>
    )
}

export default Page;