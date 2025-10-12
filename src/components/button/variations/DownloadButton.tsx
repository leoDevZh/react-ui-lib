import React, {useEffect, useRef} from "react";
import {ComponentSize, useTheme} from "../../provider";
import {useButtonStyles} from "../hooks/useButtonStyles";
import {SvgMorph, SvgMorphRef} from "../../svg";
import style from './downloadButton.module.css'

interface DownloadButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string
    size?: ComponentSize
    enableContentSelect?: boolean
    fileName: string
    downloadLink: string
}

const DownloadButton: React.FC<DownloadButtonProps> = ({label, size, enableContentSelect, fileName, downloadLink, className, ...props}) => {

    const container = useRef<HTMLButtonElement>(null)
    const svgRef = useRef<SvgMorphRef>(null)
    const { pressed, onTouchStart, onTouchEnd, className: buttonClass } = useButtonStyles({size, enableContentSelect, className})

    const { theme } = useTheme()

    const finalClass = [buttonClass, ...getClassNameByType(), style[size || 'md'], className].filter(Boolean).join(' ')
    const labelToRender = label ? label : 'Click me'

    let timeout: null | NodeJS.Timeout = null

    useEffect(() =>{
        if (container.current) {
            const computed = window.getComputedStyle(container.current).fontSize
            container.current.style.setProperty("--computed-font-size", computed)
        }
        return () => {
            if (timeout !== null) {
                clearTimeout(timeout)}
            }
    },[])

    function getClassNameByType() {
        let classNames: any[] = [style.btn]
        switch (theme.style) {
            case "morphism":
                classNames = [...classNames, style.btnMorph, pressed && style.pressedMorph]
                break
        }
        return classNames
    }

    function onButtonClick() {
        svgRef.current?.play()
        timeout = setTimeout(() => svgRef.current?.reverse(), 10000)


        const a = document.createElement('a')
        a.href = downloadLink
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)


    }

    return (
       <button
           {...props}
           onTouchStart={onTouchStart}
           onTouchEnd={onTouchEnd}
           className={finalClass}
           onClick={onButtonClick}
           ref={container}
       >
           <span>
               {labelToRender}
           </span>
           <span>
               <SvgMorph
                   ref={svgRef}
                   triggerMode="manual"
                   endPath="m4.5 12.75 6 6 9-13.5"
                   duration={.2}
               >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2"
                     stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/>
                    </svg>
                </SvgMorph>
           </span>
       </button>
    )
}

export { DownloadButton, type DownloadButtonProps}