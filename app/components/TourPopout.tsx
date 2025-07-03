'use client'
import {useState, useEffect, ReactNode, useRef, RefObject} from "react";
import ReactDOM from "react-dom";

interface ITourPopout{
    closeWindow: ()=>void;
    children?: ReactNode;
}

const TourPopout=({closeWindow, children}:ITourPopout)=>{
    const [externalWindow, setExternalWindow] = useState<Window|null>(null);

    const containerRef:RefObject<HTMLDivElement|null> = useRef(null);
    useEffect(() => {
        if (externalWindow){
            externalWindow.addEventListener('beforeunload', ()=>{
                    closeWindow();
                }
            );
        }
    }, [closeWindow, externalWindow]);

    useEffect(() => {
        const details='width=800, height=800, left=300, top=200';
        const externalWindow=window.open('', '', details);

        if(externalWindow){
            containerRef.current = externalWindow.document.createElement('div');
            externalWindow.document.body.appendChild(containerRef.current);
            externalWindow.document.title='Site Tour';
            // Copy the app's styles into the new window
            const stylesheets = Array.from(document.styleSheets);
            stylesheets.forEach(stylesheet => {
                const css = stylesheet as CSSStyleSheet;

                if (stylesheet.href) {
                    const newStyleElement = document.createElement('link');
                    newStyleElement.rel = 'stylesheet';
                    newStyleElement.href = stylesheet.href;
                    externalWindow.document.head.appendChild(newStyleElement);
                } else if (css && css.cssRules && css.cssRules.length > 0) {
                    const newStyleElement = document.createElement('style');
                    Array.from(css.cssRules).forEach(rule => {
                        newStyleElement.appendChild(document.createTextNode(rule.cssText));
                    });
                    externalWindow.document.head.appendChild(newStyleElement);
                }
            });
            setExternalWindow(externalWindow);
        }
        // UNCOMMENT FOR PRODUCTION
        // return () => {
        //     if (externalWindow) {
        //         externalWindow.close();
        //     }
        // };
    }, []);

    if(!containerRef.current){
        return null;
    } else {
        return (
            ReactDOM.createPortal(children, containerRef.current)
        )
    }
}

export default  TourPopout