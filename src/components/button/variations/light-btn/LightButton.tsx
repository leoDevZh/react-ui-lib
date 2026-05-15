import {ButtonProps} from "../model";
import style from "./lightButton.module.css";
import simpleStyle from './simpleLightButton.module.css'
import {useButtonStyles} from "../../hooks/useButtonStyles";
import {useLayoutEffect, useRef} from "react";


/**
 * There are 3 mode one without svg, with svg and svg on hover only. It is also possible to invert the color states
 *
 */
const LightButton = ({
                         onClick,
                         className,
                         label,
                         size,
                         icon: Icon,
                         drawIcon,
                         invert,
                         simpleColor,
                         accentColor
                     }: ButtonProps) => {

    const {pressed, onTouchStart, onTouchEnd, className: buttonClass} = useButtonStyles({size, className})
    const btnRef = useRef<HTMLButtonElement>(null)
    const wrpRef = useRef<HTMLDivElement>(null)
    const spanRef = useRef<HTMLSpanElement>(null)

    const basicClass = [buttonClass, style.container, pressed ? style.pressed : '', Icon ? style.iconContainer : '', drawIcon ? style.drawIcon : '', invert ? style.negative : '', className].filter(Boolean).join(' ')
    const simpleClass = [buttonClass, simpleStyle.container, pressed ? simpleStyle.pressed : '', Icon ? simpleStyle.iconContainer : '', drawIcon ? simpleStyle.drawIcon : '', invert ? simpleStyle.negative : '', className].filter(Boolean).join(' ')


    useLayoutEffect(() => {
        const update = () => {
            if (btnRef.current && spanRef.current && wrpRef.current) {
                const computedStyle = window.getComputedStyle(btnRef.current)
                const computedWrapperStyle = window.getComputedStyle(wrpRef.current)
                const computedSpanStyle = window.getComputedStyle(spanRef.current)

                btnRef.current.style.setProperty('--calc-font-size', computedStyle.fontSize)
                btnRef.current.style.setProperty('--calc-span-width', computedSpanStyle.width)
                btnRef.current.style.setProperty('--calc-wrapper-width', computedWrapperStyle.width)
                btnRef.current.style.setProperty('--accent-color', accentColor ?? '')
            }
        }

        update()

        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, []);

    return (
        <button
            ref={btnRef}
            className={simpleColor ? simpleClass : basicClass}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onClick={onClick}
        >
            <div ref={wrpRef} className={simpleColor ? simpleStyle.wrapper : style.wrapper}>
                <span ref={spanRef}>{label}</span>
                <span>{Icon && Icon}</span>
            </div>
        </button>
    )
}

export {LightButton}