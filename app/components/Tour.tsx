'use client'
import {useState} from "react";
import TourCardContainer from "@/app/components/TourCardContainer";
import wholescreenshot from '@/public/images/timelineScSh.png'
import landmarksSS from '@/public/images/landmarksSS.png'
import tickSS from '@/public/images/tickss.png'
import smallPanelSS from '@/public/images/smallPanelSS.png'
import bigPanelSS from '@/public/images/bigPanelSS.png'
import keyPointsSS from '@/public/images/keyPointsSS.png'
import infoControlSS from '@/public/images/infoControlSS.png'
import arcSS1 from '@/public/images/arcSS1.png'
import arcSS2 from '@/public/images/arcSS2.png'
import ggSS1 from '@/public/images/ggSS1.png'
import ggSS2 from '@/public/images/ggSS2.png'
import ggSS3 from '@/public/images/ggSS3.png'
import ggSS4 from '@/public/images/ggSS4.png'
import ssSS1 from '@/public/images/ssss1.png'
import ssSS2 from '@/public/images/ssss2.png'
import ssSS3 from '@/public/images/ssss3.png'
import hojSS from '@/public/images/hojSS.png'
import printSS1 from '@/public/images/printSS1.png'
import printSS2 from '@/public/images/printSS2.png'


const Tour=()=>{
    const [translationCoefficient, setTranslationCoefficient] = useState(0);
    return (
        <div className={`flex items-center justify-between h-full w-full p-10 `}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"
                 strokeWidth="1.5" stroke="white" className="size-7 inline cursor-pointer"
                 onClick={()=> {
                      setTranslationCoefficient(
                          Math.max(translationCoefficient - 1, 0)
                      )
                 }}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M15.75 19.5 8.25 12l7.5-7.5"/>
            </svg>

            {/*CENTER COLUMN*/}
            <div className={`flex flex-col items-center h-full justify-end w-9/10`}>
                {/*FLEX DIV WRAPPER/FRAME*/}
                <div className={`h-full w-full border-white border-2 rounded-4xl overflow-x-hidden`}>
                    {/*FLEX DIV*/}
                    <div
                        className={'flex h-full w-[1800%] rounded-4xl transition-all duration-250 ease-out'}
                        style={{transform: `translateX(-${translationCoefficient*(100/18)}%)`}}
                    >
                        <TourCardContainer title={'Opening the Timeline'}>
                            <p className={'mb-5'}>
                                First thing&#39;s first, click on &#34;The Scientific Revolution&#34;
                                on the homepage (the page you opened this tour from).
                                This should automatically open the timeline in a new tab. If it doesn&#39;t,
                                navigate back to the home page and manually open the timeline in a new tab.
                            </p>
                            <p className={'mb-5'}>
                                In the new tab you should be seeing a timeline which looks something like this
                            </p>
                            <img
                                alt={'timeline screenshot'}
                                src={wholescreenshot.src}
                                height={'auto'}
                                width={'100%'}
                                className={'border-2 border-white'}
                            />
                        </TourCardContainer>
                        <TourCardContainer title={'Landmarks'}>
                            <div className={''}>
                                <img
                                    alt={'landmarks screenshot'}
                                    src={landmarksSS.src}
                                    height={'auto'}
                                    width={'50%'}
                                    className={'border-2 border-white float-right ml-2 mb-2'}
                                />
                                <p className={''}>
                                    These are referred to as &#34;Landmarks.&#34; They come in two basic shapes
                                    &mdash;a vertically spanning rectangle or a circle which can be of various sizes.
                                    All the landmarks on this timeline are gray, but the timeline author can set them
                                    to whatever they choose. We&#39;ll see that later in the tour along with many other
                                    features of the landmarks.
                                </p>
                                <p>
                                    Behind certain landmarks, you should also see large year markers to help orientate
                                    you as you navigate along a timeline.
                                </p>
                            </div>
                        </TourCardContainer>
                        <TourCardContainer title={'Navigating the Timeline'}>
                            <p className={''}>
                                You have multiple options to navigate along the timeline.
                            </p>
                            <ol className={'list-decimal list-outside'}>
                                <li className={'mb-3'}>
                                    There should be a scrollbar at the bottom of the window which you can click and drag.
                                </li>
                                <li className={'mb-3'}>
                                    The &#34;tickbar&#34; at the bottom of the page is not only useful as a visual indicator
                                    for where you are in the timeline, you can also click the  highlighted ticks to jump between years.
                                    <img src={tickSS.src} alt={'tickbar screenshot'} height={'1rem'} width={'auto'}
                                         className={'border-2 border-white mt-2'}/>
                                </li>
                                <li className={'mb-3'}>
                                    If you&#39;re using a touch-sensitive device or device with a touchpad, you can
                                    horizontally scroll with whatever gestures your device supports. If, however, you aren&#39;t
                                    on such a device, you can use drag-to-scroll with your mouse if you open the settings
                                    panel <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                     className="size-4 inline">
                                                    <path fillRule="evenodd"
                                                          d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                                                    clipRule="evenodd"/>
                                                </svg>
                                        </span> on the top right of the timeline and enabling &#34;Click and Drag&#34;.
                                </li>
                            </ol>
                            <p>* In the settings panel <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                     className="size-4 inline">
                                                    <path fillRule="evenodd"
                                                          d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                        </span> you can also disable the bottom scrollbar for a cleaner looking layout if you're
                                using an alternative way to scroll.
                            </p>
                        </TourCardContainer>
                        <TourCardContainer title={'Opening the Info Panel'}>
                            <div className={"w-1/2 float-right"}>
                                <img src={smallPanelSS.src} alt={'panel screenshot'}
                                     width={'100%'} height={'auto'}
                                     className={'border-2 border-white mb-3'}/>
                                <img src={bigPanelSS.src} alt={'panel screenshot'}
                                     width={'100%'} height={'auto'}
                                     className={'border-2 border-white'}/>
                            </div>
                            <p className={'mb-3'}>
                                Clicking on any of the landmarks on the timeline should pop open a panel that
                                looks one of these images on the right.
                            </p>
                            <p>
                                In the next step, we&#39;ll go over some of the most basic features of the Information Panel
                                you see here.
                            </p>
                        </TourCardContainer>
                        <TourCardContainer title={'Info Panel: Key Points'}>
                            <p className={'mb-3'}>
                                This section is very useful for summarizing what you want the viewers to take away especially when,
                                as we&#39;ll see soon, the panel contains a lot of info.
                            </p>
                            <img src={keyPointsSS.src} alt={'key points screenshot'} className={'border-white border-2'}/>
                        </TourCardContainer>
                        <TourCardContainer title={'Presentation Mode'}>
                            <p className={'mb-3'}>
                                With a an information panel open, press the play button (outlined in red below) to enter presentation mode
                                which operates like a slideshow.
                            </p>
                            <svg
                                width="52.4%"
                                height="9.2%"
                                viewBox="0 0 262 46"
                                className={'mb-3'}
                            >
                                <image href={infoControlSS.src} x={0} y={0} width={262} height={46} />
                                <rect
                                    width={30}
                                    height={28}
                                    x={85}
                                    y={8}
                                    strokeWidth={3}
                                    fill={'none'}
                                    stroke={'red'}
                                />
                            </svg>
                            <p className={'mb-3'}>Presentation Mode Controls:</p>
                            <p className={'w-full table-row'}><span className={'w-1/2 table-cell'}>Space bar:</span> <span className={'w-1/2 table-cell'}>Move to the next landmark</span></p>
                            <p className={'w-full table-row'}><span className={'w-1/2 table-cell'}>Left and Right Arrow keys:</span> <span className={'w-1/2 table-cell'}>Navigate between landmarks</span></p>
                            <p className={'w-full table-row'}><span className={'w-1/2 table-cell'}>Escape key:</span><span className={'w-1/2 table-cell'}>Exit fullscreen mode</span></p>
                            <p className={'w-full table-row'}><span className={'w-1/2 table-cell'}>The onscreen <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="white" className="size-6 inline">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15.75 19.5 8.25 12l7.5-7.5"/>
                            </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="white" className={`size-6 inline`}>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                            </svg>
                            </span> buttons:</span><span className={'w-1/2 table-cell'}>Operate like the left and right arrow keys</span></p>
                            <p className={'w-full table-row'}><span className={'w-1/2 table-cell'}>The onscreen <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                     fill="white" className="size-6 inline">
                                <path fillRule="evenodd"
                                      d="M2.25 5.25a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3V15a3 3 0 0 1-3 3h-3v.257c0 .597.237 1.17.659 1.591l.621.622a.75.75 0 0 1-.53 1.28h-9a.75.75 0 0 1-.53-1.28l.621-.622a2.25 2.25 0 0 0 .659-1.59V18h-3a3 3 0 0 1-3-3V5.25Zm1.5 0v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5Z"
                                      clipRule="evenodd"/>
                            </svg>
                            </span> buttons:</span><span className={'w-1/2 table-cell'}>Exits fullscreen mode as well</span></p>
                        </TourCardContainer>
                        <TourCardContainer title={'Our Next Timeline'}>
                            <p className={'mb-3'}>
                                From the home page, open the &#34;The Scientific Revolution 2&#34; timeline in a new tab.
                            </p>
                            <p>Our first timeline was as direct of a copy as I could make of an example slideshow I found online.
                             For this timeline I have expanded on the information in that presentation to demonstrate more
                            features of this platform.</p>
                            <p className={'mb-3'}>If you give this timeline a quick peruse you should notice some additional details such as pictures,
                                miniature landmarks, and some landmarks having small arcs around them like these:</p>
                            <div className={'flex gap-4'}>
                                <div>
                                    <img src={arcSS1.src} alt={'screenshot of arc'} className={'border-2 border-white'}
                                         width={'72px'} height={'auto'}
                                    />
                                </div>
                                <div>
                                    <img src={arcSS2.src} alt={'screenshot of arc'} className={'border-2 border-white'}
                                         width={'72px'} height={'auto'}
                                    />
                                </div>
                            </div>
                        </TourCardContainer>
                        <TourCardContainer title={'Where in the World is Galileo Galilei?'}>
                            <p>To further explore the Info Panel, we&#39;ll take a look at this timeline&#39;s version of
                            Galileo&#39;s landmark.</p>
                            <p>In order to help you find the correct landmark, first open up the settings
                            panel <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                     className="size-4 inline">
                                                    <path fillRule="evenodd"
                                                          d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 0 1-.517.608 7.45 7.45 0 0 0-.478.198.798.798 0 0 1-.796-.064l-.453-.324a1.875 1.875 0 0 0-2.416.2l-.243.243a1.875 1.875 0 0 0-.2 2.416l.324.453a.798.798 0 0 1 .064.796 7.448 7.448 0 0 0-.198.478.798.798 0 0 1-.608.517l-.55.092a1.875 1.875 0 0 0-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 0 1-.064.796l-.324.453a1.875 1.875 0 0 0 .2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 0 1 .796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 0 1 .517-.608 7.52 7.52 0 0 0 .478-.198.798.798 0 0 1 .796.064l.453.324a1.875 1.875 0 0 0 2.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 0 1-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 0 0 1.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 0 1-.608-.517 7.507 7.507 0 0 0-.198-.478.798.798 0 0 1 .064-.796l.324-.453a1.875 1.875 0 0 0-.2-2.416l-.243-.243a1.875 1.875 0 0 0-2.416-.2l-.453.324a.798.798 0 0 1-.796.064 7.462 7.462 0 0 0-.478-.198.798.798 0 0 1-.517-.608l-.091-.55a1.875 1.875 0 0 0-1.85-1.566h-.344ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                        </span> once more and toggling on &#34;Always Show Labels.&#34; This means all landmarks with
                                display images will always show their labels instead of just on hover. Secondly, open the search
                            panel <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 inline">
                                        <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z"/>
                                        <path fillRule="evenodd"
                                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z"
                                              clipRule="evenodd"/>
                                    </svg>
                                </span> (located next to the settings panel at the top of the timeline.) In the search panel&#39;s 
                            search bar, search for Galileo Galilei. Once you see the correct landmark pop up in the search
                            results, click on the &#34;navigate to landmark symbol&#34; <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 22 22"
                                         strokeWidth="1.5"
                                         stroke="white"
                                         className="size-4 inline"
                                    >
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                                </span> which should take you directly to the correct landmark. Now that you&#39;ve found the
                            correct landmark, click on it to open the info panel to prepare for the tour&#39;s next step.</p>

                        </TourCardContainer>
                        <TourCardContainer title={'Info Panel: More Details'}>
                            <p>As you scroll up and down this info panel, you&#39;re bound to see some immediate
                            differences from the information panels in the last timeline. With all this additional
                            text in the info panel, you may find it a little cramped. Click on the &#34;expand
                                button&#34; <span>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 24 24"
                                         strokeWidth="1.5"
                                         stroke="white"
                                         className="size-4 inline">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/>
                                    </svg>
                                </span>.
                            </p>
                            <p>In addition to the key points section, this info modal also includes a description section
                            (the large chunk of text,) a section for attached files, and a section showing related landmarks.</p>
                            <p>You may have already opened the image pop up by yourself if you&#39;ve been clicking around. 
                                However, if you haven&#39;t, click on the image at the top left of the panel to open the image pop up.
                            This not only allows you to take a closer look at the landmark&#39;s display image, it also
                            allows you to take a look at any other images that may be attached to this landmark.
                            </p>
                            <p>
                                With the image pop up open, you can use the arrow buttons onscreen<span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="white" className="size-4 inline">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15.75 19.5 8.25 12l7.5-7.5"/>
                            </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="white" className={`size-4 inline`}>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                            </svg>
                            </span> or your arrow keys to navigate between images.
                            </p>
                            <p>Close the image pop up and take a look at the &#34;Related&#34; section at the bottom of the info
                             panel. What&#39;s it mean for landmarks to be related? We&#39;ll look further in the next portion of
                            the tour. So click on the shrink button <span>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 24 24"
                                         strokeWidth="1.5"
                                         stroke="white"
                                         className="size-4 white inline">
                                                    <path strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                          d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25"/>
                                                </svg>
                                </span> at the top of the info panel and then close it and let&#39;s proceed with the tour.</p>
                        </TourCardContainer>
                        <TourCardContainer title={'The Relationship Ring'}>
                            <p className={'mb-3'}>
                                Large historical topics can span across eras, continents, and narratives. Relationships
                                between various people and events can be lost in all the information. If you&#39;re reading
                                a textbook, what was mentioned briefly in one chapter may become relevant five chapters
                                down the line. The Relationship Ring helps visualize and keep track of these relationships
                                and when they happen relative to each other.
                            </p>
                            <div className={'flex w-full justify-center mb-3'}>
                                <svg xmlns={'http://www.w3.org/2000/svg'}
                                    width={'200px'}
                                     height={'200px'}
                                     viewBox={'-50 -50 100 100'}
                                >
                                    <defs>
                                        <filter id="shadow">
                                            <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="white" />
                                        </filter>
                                    </defs>
                                    <circle
                                        r={37}
                                        cx={0}
                                        cy={0}
                                        stroke={'#ccff00'}
                                        strokeWidth={3}
                                        fill="#ccff0088"
                                        opacity={0.25}
                                    />
                                    <path
                                        d={'M 11.65 -43.5A50 50 0 0 1 42.3 -15.4'}
                                        stroke={'#ccff00'}
                                        strokeWidth={3}
                                        fill={'none'}
                                        filter="url(#shadow)"
                                    />
                                    <path
                                        d={'M44.6 7.8A50 50 0 0 1 28.93 34.47'}
                                        stroke={'#ccff00'}
                                        strokeWidth={3}
                                        fill={'none'}
                                        filter="url(#shadow)"
                                    />
                                    <path
                                        d={'M-25.81 -36.86A50 50 0 0 1 -11.65 -43.46'}
                                        stroke={'#ccff00'}
                                        strokeWidth={3}
                                        fill={'none'}
                                        filter="url(#shadow)"
                                    />
                                    <path
                                        d={'M-44.83 -3.92A50 50 0 0 0 -11.65 43.47'}
                                        stroke={'#ccff00'}
                                        strokeWidth={3}
                                        fill={'none'}
                                        filter="url(#shadow)"
                                    />
                                </svg>
                            </div>
                            <p>We&#39;ll spend the next few steps on this tour getting familiar with it.</p>
                        </TourCardContainer>
                        <TourCardContainer title={'The Relationship Ring pt 2'}>
                            <div className={'flex mb-3 gap-3'}>
                                <p>Looking again at the Galileo landmark, there is a partial relationship ring around it with one
                                    arc to the upper right and one arc the lower right. highlighted to the right here in red.</p>
                                <svg width={'150px'} height={'150px'} viewBox={'0 0 100 100'}
                                     className={'min-w-[150px] shrink-0 border-2 border-white'}>
                                    <image
                                        href={ggSS1.src}
                                        x={0}
                                        y={0}
                                        width={100}
                                        height={100}
                                    />
                                    <rect
                                        x={62}
                                        y={1}
                                        strokeWidth={2}
                                        stroke={'red'}
                                        fill={'none'}
                                        width={20}
                                        height={12}
                                    />
                                    <rect
                                        x={62}
                                        y={87}
                                        strokeWidth={2}
                                        stroke={'red'}
                                        fill={'none'}
                                        width={20}
                                        height={12}
                                    />
                                </svg>
                            </div>
                            <div className={'flex mb-3 gap-3'}>
                                <p>If you click on the upper right arc, it should display the title of one of the landmarks Galileo
                                    is related to.</p>
                                <img height={'auto'} width={'150px'} src={ggSS2.src} alt={'landmark screenshot'}
                                     className={'border-2 border-white min-w-[150px] shrink-0'}/>
                            </div>
                            <div className={'flex mb-3 gap-3'}>
                                <p>Now click on the lower arc to display its text.
                                    You&#39;ll notice that this text is underlined and when you hover over it the text changes.
                                    You can add some context to relationships on the relationship ring,
                                    a reminder of the nature of the relationship.
                                    This is the initial text that shows up. The text shown when you
                                    hover over it is the actual title of the related landmark.
                                </p>
                                <div className={'min-w-[150px] shrink-0'}>
                                    <img height={'auto'} width={'150px'} src={ggSS4.src} alt={'landmark screenshot'}
                                         className={'min-w-[150px] border-2 border-white shrink-0 mb-3'}/>
                                    <img height={'auto'} width={'150px'} src={ggSS3.src} alt={'landmark screenshot'}
                                         className={'min-w-[150px] w-[150px] border-2 border-white shrink-0'}/>
                                </div>
                            </div>
                            <p>
                                Click on the text and you should be taken to the related landmark.
                            </p>
                        </TourCardContainer>
                        <TourCardContainer title={'The Relationship Ring pt 3'}>
                            <p>The position of an arc reflects the related landmark&#39;s 
                                relative position on the timeline.</p>
                            <div className={'flex w-full justify-center mb-3 '}>
                                <p className={'max-w-2/5 pt-5'}>
                                    Here&#39;s a diagram demonstrating how related landmarks are placed
                                    around a landmark.
                                </p>
                                <svg xmlns={'http://www.w3.org/2000/svg'}
                                     width={'250px'}
                                     height={'250px'}
                                     viewBox={'-80 -80 160 160'}
                                     className={'shrink-0'}
                                >
                                    <circle
                                        r={37}
                                        cx={0}
                                        cy={0}
                                        stroke={'#ccff00'}
                                        strokeWidth={3}
                                        fill="#ccff0088"
                                        opacity={0.5}
                                    />
                                    <path
                                        d={'M 11.65 -43.5A50 50 0 0 1 42.3 -15.4'}
                                        stroke={'#ccff00'}
                                        strokeWidth={3}
                                        fill={'none'}
                                    />
                                    <path
                                        d={'M44.6 7.8A50 50 0 0 1 28.93 34.47'}
                                        stroke={'#ccff00'}
                                        strokeWidth={3}
                                        fill={'none'}
                                    />
                                    <path
                                        d={'M-25.81 -36.86A50 50 0 0 1 -11.65 -43.46'}
                                        stroke={'#ccff00'}
                                        strokeWidth={3}
                                        fill={'none'}
                                    />
                                    <path
                                        d={'M-44.83 -3.92A50 50 0 0 0 -11.65 43.47'}
                                        stroke={'#ccff00'}
                                        strokeWidth={3}
                                        fill={'none'}
                                    />
                                    <path
                                        d={'M0 -63l0 123'}
                                        stroke={'white'}
                                        strokeWidth={1}
                                        fill={'none'}
                                        strokeDasharray="4"
                                    />
                                    <text
                                        x={45}
                                        y={-55}
                                        fill={'white'}
                                        fontSize={8}
                                        textAnchor={'start'}
                                    >
                                        <tspan textAnchor={'start'} x={45}>
                                            Near
                                        </tspan> <tspan textAnchor={'start'} x={45} dy={10} >
                                        Future
                                    </tspan>
                                    </text>
                                    <path
                                        d={'M-20 -50C-63 -30, -63 30, -20 50M-20 50l-5 3M-20 50l-1 -6'}
                                        stroke={'white'}
                                        strokeWidth={1}
                                        fill={'none'}
                                    />
                                    <text
                                        x={45}
                                        y={45}
                                        fill={'white'}
                                        fontSize={8}
                                        textAnchor={'start'}
                                    >
                                        <tspan textAnchor={'start'} x={45}>
                                            Distant
                                        </tspan> <tspan textAnchor={'start'} x={45} dy={10} >
                                        Future
                                    </tspan>
                                    </text>
                                    <text
                                        x={-45}
                                        y={-55}
                                        fill={'white'}
                                        fontSize={8}
                                        textAnchor={'start'}
                                    >
                                        <tspan textAnchor={'end'} x={-45}>
                                            Distant
                                        </tspan> <tspan textAnchor={'end'} x={-45} dy={10} >
                                        Past
                                    </tspan>
                                    </text>
                                    <path
                                        d={'M20 -50C63 -30, 63 30, 20 50M20 50l5 3M20 50l1 -6'}
                                        stroke={'white'}
                                        strokeWidth={1}
                                        fill={'none'}
                                    />
                                    <text
                                        x={-45}
                                        y={45}
                                        fill={'white'}
                                        fontSize={8}
                                        textAnchor={'end'}
                                    >
                                        <tspan textAnchor={'end'} x={-45}>
                                            Recent
                                        </tspan> <tspan textAnchor={'end'} x={-45} dy={10} >
                                            Past
                                        </tspan>
                                    </text>

                                </svg>
                            </div>
                            <div className={'flex w-full justify-center mb-3 '}>
                                <p className={'max-w-2/5 pt-10'}>
                                    And here&#39;s an example demonstrating how related landmarks across various years
                                    would be positioned around a landmark placed at 1950.
                                </p>
                                <svg xmlns={'http://www.w3.org/2000/svg'}
                                     width={'250px'}
                                     height={'250px'}
                                     viewBox={'-80 -80 160 160'}
                                     className={'shrink-0'}
                                >
                                    <circle
                                        r={37}
                                        cx={0}
                                        cy={0}
                                        stroke={'#ccff00'}
                                        strokeWidth={3}
                                        fill="#ccff0088"
                                        opacity={0.5}
                                    />
                                    <path
                                        d={'M 11.65 -43.5A50 50 0 0 1 42.3 -15.4'}
                                        stroke={'#ccff00'}
                                        strokeWidth={3}
                                        fill={'none'}
                                    />
                                    <path
                                        d={'M44.6 7.8A50 50 0 0 1 28.93 34.47'}
                                        stroke={'#ccff00'}
                                        strokeWidth={3}
                                        fill={'none'}
                                    />
                                    <path
                                        d={'M-25.81 -36.86A50 50 0 0 1 -11.65 -43.46'}
                                        stroke={'#ccff00'}
                                        strokeWidth={3}
                                        fill={'none'}
                                    />
                                    <path
                                        d={'M-44.83 -3.92A50 50 0 0 0 -11.65 43.47'}
                                        stroke={'#ccff00'}
                                        strokeWidth={3}
                                        fill={'none'}
                                    />
                                    <text
                                        x={0}
                                        fill={'white'}
                                        y={4}
                                        fontSize={8}
                                        textAnchor={'middle'}
                                    >1950</text>
                                    <text
                                        x={-25}
                                        fill={'white'}
                                        y={-44}
                                        fontSize={8}
                                        textAnchor={'end'}
                                    >1900</text>
                                    <text
                                        x={-30}
                                        fill={'white'}
                                        y={44}
                                        fontSize={8}
                                        textAnchor={'end'}
                                    >1948</text>
                                    <text
                                        x={-42}
                                        fill={'white'}
                                        y={28}
                                        fontSize={8}
                                        textAnchor={'end'}
                                    >1945</text>
                                    <text
                                        x={-50}
                                        fill={'white'}
                                        y={12}
                                        fontSize={8}
                                        textAnchor={'end'}
                                    >1940</text>
                                    <text
                                        x={25}
                                        fill={'white'}
                                        y={-44}
                                        fontSize={8}
                                        textAnchor={'start'}
                                    >1952</text>
                                    <text
                                        x={40}
                                        fill={'white'}
                                        y={-30}
                                        fontSize={8}
                                        textAnchor={'start'}
                                    >1960</text>
                                    <text
                                        x={48}
                                        fill={'white'}
                                        y={22}
                                        fontSize={8}
                                        textAnchor={'start'}
                                    >1980</text>
                                    <text
                                        x={42}
                                        fill={'white'}
                                        y={35}
                                        fontSize={8}
                                        textAnchor={'start'}
                                    >1981</text>
                                </svg>
                            </div>

                        </TourCardContainer>
                        <TourCardContainer title={'Presentation Mode pt 2'}>
                            <p className={'mb-3'}>If, while we were going over presentation mode while
                                focusing on our first timeline, you went through the entire slide show,
                                you may have noticed that there was a slide for every landmark in the timeline.
                                That is because whenever you make a timeline a slide show is made by default that
                                automatically includes every landmark. What if, for example, you only wanted to present
                                a subset of your timeline&#39;s landmarks during a class but included other landmarks
                                on the timeline for additional information and context that others could look at during
                                their own time? Well luckily you can make a slide show out of whichever subset of landmarks
                                you want.
                            </p>
                            <p className={'mb-3'}>Open up the i-panel <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 inline">
                        <path fillRule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                              clipRule="evenodd"/>
                    </svg>
                            </span> from the top right of the timeline. Here you&#39;ll find a list of slideshows for
                                this timeline. In addition to the default, automatically generated slideshow is a slideshow
                                for a theoretical class labeled &#34;European History 2&#34; which doesn&#39;t include every
                                landmark on the timeline.
                            </p>
                            <p>Here we can see a play button next to each slideshow&#39;s title. If you press on one of those
                                it will open the information panel for the first landmark that&#39;s part of that slideshow.
                                With that information panel open, we can start a slide show like before. The play button
                                in the information panel does not start the slide show directly as that would be against
                                safe web design practices.
                            </p>
                        </TourCardContainer>
                        <TourCardContainer title={'Presentation Mode pt 3'}>
                            <div className={'w-full flex mb-3'}>
                                <p>
                                    How would we start a particular slideshow from the middle? Find the Johannes Kepler
                                    landmark (1571) and select this button next to the play button.
                                </p>
                                <svg
                                    width={'200px'}
                                    height={'40px'}
                                    viewBox={'0 0 200 40'}
                                    className={'shrink-0'}
                                >
                                    <image href={ssSS1.src} x={0} y={5} width={200}/>
                                    <rect
                                        stroke={'red'}
                                        strokeWidth={3}
                                        width={23}
                                        height={23}
                                        x={47}
                                        y={8}
                                        fill={'none'}
                                    />
                                </svg>
                            </div>
                            <div className={'w-full flex mb-3'}>
                                <p>
                                    This should expand the Slideshow selection dropdown.
                                </p>
                                <svg
                                    width={'200px'}
                                    height={'40px'}
                                    viewBox={'0 0 200 40'}
                                    className={'shrink-0'}
                                >
                                    <image href={ssSS2.src} x={0} y={5} width={200}/>
                                </svg>
                            </div>
                            <div className={'w-full flex gap-3 mb-3'}>
                                <p className={''}>
                                    From here you can select whichever slideshow you want to view in presentation mode.
                                </p>
                                <svg
                                    width={'200px'}
                                    height={'80px'}
                                    viewBox={'0 0 200 80'}
                                    className={'shrink-0'}
                                >
                                    <image href={ssSS3.src} x={0} y={0} width={200}/>
                                </svg>
                            </div>
                            <p>Note: if you navigate between landmarks&#39; info panels using the onscreen arrow buttons <span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="white" className="size-4 inline">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M15.75 19.5 8.25 12l7.5-7.5"/>
                            </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth="1.5" stroke="white" className={`size-4 inline`}>
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
                            </svg>
                            </span> or arrow keys, even outside of presentation mode, it will only show the panels that are included
                            in whatever slideshow is currently selected.</p>
                        </TourCardContainer>
                        <TourCardContainer title={'Our Final Timeline'}>
                            <p className={'mb-3'}>To look at our last few features, go back to the home page and open up the History of Jazz
                            timeline in a new tab.</p>
                            <div className={'w-full flex justify-center mb-3'}>
                                <img src={hojSS.src} height={'auto'} width={'80%'} alt={'timeline screenshot'}
                                    className={'border-2 border-white'}
                                />
                            </div>
                            <p>While this timeline may be a lot more extensive, don&#39;t worry. This tour is almost over.</p>
                        </TourCardContainer>
                        <TourCardContainer title={'Some Small Features'}>
                            <ol className={'list-decimal list-outside'}>
                                <li>
                                    <p>Colors</p>
                                    <p>Unlike the previous timelines in which all landmarks were colored gray, this
                                        timeline applies colors to every landmark. In this case, landmarks are colored
                                        to match the era they are associated with, though colors can be used however the timeline
                                        author wants.
                                    </p>
                                </li>
                                <li>
                                    <p>Links</p>
                                    <p>If you look at the Livery Stable Blues landmark (1917) info panel,
                                        you can see that links can
                                        be attached to landmarks just like files were in the previous timeline.
                                    </p>
                                </li>
                                <li>
                                    <p>Citations</p>
                                    <p>If you look at the bottom of the Buddy Bolden (1890) info panel, you can see that
                                        citations, in addition to being provided for entire timelines, can also
                                        be provided for specific landmarks.
                                    </p>
                                </li>
                                <li>
                                    <p>Captions</p>
                                    <p>While you have the info panel on Buddy Bolden open, click on his image to
                                        open up the image pop up. You may notice some darker, black areas on the bottom
                                        corners of the pop up. This indicates that a caption has been provided for the
                                        image. Hover your mouse over the lower portion of the image pop up, between those
                                        two darker areas, and the caption should appear.
                                    </p>
                                </li>
                            </ol>
                        </TourCardContainer>
                        <TourCardContainer title={'The Landmark Page'}>
                            <p>If you still have the info panel for Buddy Bolden still open from the last step in our tour,
                                keep it open. Otherwise, find the Buddy Bolden landmark and open its info panel. Click on
                                the pop out button (highlighted in red below) to open the Landmark page on Buddy Bolden
                                 in a new tab.
                            </p>
                            <svg
                                height={'48px'}
                                width='280px'
                                viewBox={'465 0 48 140'}
                                className={'mb-3 scale-80'}
                            >
                                <image href={ssSS1.src} height={'138'} x={0} y={0} />
                                <rect
                                    stroke={'red'}
                                    strokeWidth={10}
                                    height={115}
                                    width={106}
                                    x={755}
                                    y={10}
                                    fill={'none'}
                                />
                            </svg>
                            <p className={'mb-3'}>
                                Here we can see all the information on Buddy Bolden in its own page. The related section
                                on the left is a quick way to open up the pages for related landmarks and on the right
                                we have a print button with print settings. With those print settings you can choose how
                                how the printed version of this page will be formatted.
                            </p>
                            <div className={'flex justify-around'}>
                                <img alt={'unformatted page screenshot'} src={printSS1.src} height={'auto'} width={'200px'} />
                                <div className={'flex flex-col justify-center items-center'}>
                                    <p>printed by default</p>
                                    <svg
                                        height={'50px'}
                                        width='100px'
                                        viewBox={'0 0 100 50'}
                                        preserveAspectRatio={'none'}
                                    >
                                        <path
                                            stroke={'white'}
                                            strokeWidth={3}
                                            fill={'none'}
                                            d={'M5 15l90 0M15 5L5 15l10 10'}
                                        />
                                    </svg>
                                    <p className={'text-center'}>one example of formatting</p>
                                    <svg
                                        height={'50px'}
                                        width='100px'
                                        viewBox={'0 0 100 50'}
                                        preserveAspectRatio={'none'}
                                    >
                                        <path
                                            stroke={'white'}
                                            strokeWidth={3}
                                            fill={'none'}
                                            d={'M5 15l90 0M85 5L95 15l-10 10'}
                                        />
                                    </svg>
                                </div>
                                <img alt={'unformatted page screenshot'} src={printSS2.src} height={'auto'} width={'200px'} />
                            </div>
                        </TourCardContainer>
                        <TourCardContainer title={'The Slideshow Page'}>
                            <p>Back on the timeline, open up the i-panel <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5 inline">
                        <path fillRule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                              clipRule="evenodd"/>
                    </svg>
                            </span> and look at the two available slide show for this timeline-NOLA Jazz and default.
                                The NOLA Jazz slideshow focuses on a particular era in this timeline. Click on the text
                                that says &#34;More info&#34; below the NOLA Jazz slideshow. This should open up a new page
                                with a summary of the NOLA Jazz slideshow. You can click on the title of each
                                slide to visit the page for that landmark. From the right, you can print out a summary of
                                the slideshow.
                            </p>
                        </TourCardContainer>
                    </div>
                </div>
                <p className={''}>{translationCoefficient+1}/18</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"
                 strokeWidth="1.5" stroke="white" className={`size-7 inline cursor-pointer`}
                 onClick={()=> {
                     setTranslationCoefficient(
                         Math.min(translationCoefficient + 1, 17)
                     )
                 }}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
            </svg>
        </div>
    )
}

export default  Tour