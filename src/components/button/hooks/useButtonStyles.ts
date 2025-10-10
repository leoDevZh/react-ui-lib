import {ComponentSize} from "../../provider";
import {useCallback, useState} from "react";
import styles from "./button.module.css";

interface UseButtonStylesOptions {
    size?: ComponentSize;
    enableContentSelect?: boolean;
    className?: string;
}

export const useButtonStyles = ({
        size = 'md',
        enableContentSelect = false,
        className
    }: UseButtonStylesOptions) => {
    const [pressed, setPressed] = useState(false)

    const onTouchStart = useCallback(() => setPressed(true), [])
    const onTouchEnd = useCallback(() => setPressed(false), [])

    const buttonClassName = [
        styles.leoBtn,
        pressed && styles.pressed,
        !enableContentSelect && styles.preventSelect,
        styles[size ?? 'md'],
        className
    ]
        .filter(Boolean)
        .join(' ')

    return {
        pressed,
        setPressed,
        onTouchStart,
        onTouchEnd,
        className: buttonClassName
    }
}