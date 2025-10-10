import {ComponentSize, useTheme} from "../../provider";
import {useButtonStyles} from "../hooks/useButtonStyles";
import React, {useLayoutEffect, useRef} from "react";
import styles from './defaultButton.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string
    size?: ComponentSize,
    enableContentSelect?: boolean
}

const Button: React.FC<ButtonProps> = ({label, size, enableContentSelect, onClick, className, ...props}) => {

    const { pressed, onTouchStart, onTouchEnd, className: buttonClass } = useButtonStyles({size, enableContentSelect, className})
    const { theme } = useTheme()
    const onBtnClick: (event: any) => void = (event) => {
        if(onClick) {
            onClick(event)
        }
    }

    const finalClass = [buttonClass, ...getClassListByType(), styles[size ?? 'md'], className].filter(Boolean).join(' ')

    const circleRef = useRef<HTMLSpanElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useLayoutEffect(() => {
        if (circleRef.current && buttonRef.current) {
            const circleRect = circleRef.current.getBoundingClientRect()
            const buttonRect = buttonRef.current.getBoundingClientRect()

            const relX = circleRect.x - buttonRect.x
            buttonRef.current.style.setProperty('--dot-position', `${relX}px`)
        }
    }, [])

    function getClassListByType() {
        let classList = [pressed && styles.pressedClassic, styles.btnClassic]
        switch (theme.style) {
            case "morphism":
                classList = [pressed && styles.pressedMorph, styles.btnMorph]
                break
        }
        return classList
    }

	return (
        <button
            {...props}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onClick={onBtnClick}
            className={finalClass}
            ref={buttonRef}
        >
            <span ref={circleRef}></span>
            <span>{label ?? 'Click me'}</span>
        </button>)
}

export { Button, ButtonProps }
