import {HTMLAttributes} from "react";
import styles from './basicIndexIndicator.module.css'
import {ComponentSize} from "../../provider";

interface CarouselIndexIndicatorProps extends HTMLAttributes<HTMLDivElement> {
    maxIndex: number
    currentIndex: number
    size?: ComponentSize
}

const BasicIndexIndicator = (
    {
        maxIndex,
        currentIndex,
        size = 'md',
        className
    }: CarouselIndexIndicatorProps) => {

    const finalClasses = [styles.container, className].filter(Boolean).join(' ')

    return (
        <div className={finalClasses}>
            {Array.from({length: maxIndex}, (_, i) => {
                const classes = [
                    styles.idxIndicator,
                    i === currentIndex ? styles.currentIdxIndicator : '',
                    styles[size]
                ].filter(Boolean).join(' ')

                return <span key={i} className={classes}></span>
            })}
        </div>
    )
}

export {BasicIndexIndicator, type CarouselIndexIndicatorProps}