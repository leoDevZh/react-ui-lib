import { NavLink } from "react-router";
import {ComponentSize, useTheme} from "../../provider";
import {useButtonStyles} from "../hooks/useButtonStyles";
import styles from "./linkButton.module.css"
import React, {ReactNode, useEffect, useRef} from "react";


interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    label?: string
    size?: ComponentSize
    enableContentSelect?: boolean
    to?: string
    children?: ReactNode
}

const LinkButton: React.FC<LinkButtonProps> = ({label, size, enableContentSelect, className, to, ...props}) => {

    const { pressed, onTouchStart, onTouchEnd, className: buttonClass } = useButtonStyles({size, enableContentSelect, className})
    const { theme } = useTheme()

    const finalClass = [buttonClass, ...getClassListByType(), styles[size ?? 'md'], className].filter(Boolean).join(' ')

    const labelToRender = label ? label : 'Click me'

    const ref = useRef<any>(null)

    useEffect(() => {
        if (ref.current) {
            const computed = window.getComputedStyle(ref.current).fontSize
            ref.current.style.setProperty("--computed-font-size", computed)
        }
    }, [])

    function getClassListByType() {
        let classList = [pressed && styles.pressedClassic, styles.aClassic]
        switch (theme.style) {
            case "morphism":
                classList = [...classList, pressed && styles.pressedMorph, styles.aMorph]
                break
        }
        return classList
    }

    function getInnerDom() {
        return <>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                    </svg>
                </span>
                <span>
                    {labelToRender}
                </span>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"/>
                    </svg>
                </span>
                </>;
    }

    return (
        to ?
            <NavLink
                to={to}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                className={finalClass}
                ref={ref}
            >
                {getInnerDom()}
            </NavLink>
        :
            <a
                {...props}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                className={finalClass}
                ref={ref}
            >
                {getInnerDom()}
            </a>
    )
}

export {LinkButton, LinkButtonProps}
