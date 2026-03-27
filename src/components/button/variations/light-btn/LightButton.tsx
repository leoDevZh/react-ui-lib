import {ButtonProps} from "../model";
import style from "./lightButton.module.css";
import {useButtonStyles} from "../../hooks/useButtonStyles";

const LightButton = ({onClick, className, label, size}: ButtonProps) => {

    const {pressed, onTouchStart, onTouchEnd, className: buttonClass} = useButtonStyles({size, className})

    const finalClass = [buttonClass, style.container, style[size || 'md'], pressed ? style.pressed : '', className].filter(Boolean).join(' ')


    return (
        <button
            className={finalClass}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onClick={onClick}
        >
            {label}
        </button>
    )
}

export {LightButton}