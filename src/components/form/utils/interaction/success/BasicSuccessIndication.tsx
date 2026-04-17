import {InteractionProps} from "../model";
import styles from './basicSuccess.module.css'
import {useLayoutEffect, useRef} from "react";


const BasicSuccessIndication = ({label, className}: InteractionProps) => {

    const divRef = useRef<HTMLDivElement>(null)

    const classes = [styles.container, className].join(' ')

    useLayoutEffect(() => {
        if (divRef?.current) {
            const computedStyle = window.getComputedStyle(divRef.current)
            divRef.current.style.setProperty('--calc-font-size', computedStyle.fontSize)
        }
    }, []);

    return (
        <div ref={divRef} className={classes}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path
                    d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path>
            </svg>
            <span>{label}</span>
        </div>
    )
}

export {BasicSuccessIndication}