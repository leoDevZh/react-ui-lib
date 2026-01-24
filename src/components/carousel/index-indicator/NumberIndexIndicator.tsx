import styles from './numberIndexIndicator.module.css'
import {CarouselIndexIndicatorProps} from "./BasicIndexIndicator";

const NumberIndexIndicator = (
    {
        maxIndex,
        currentIndex,
        size = 'md',
        className
    }: CarouselIndexIndicatorProps) => {

    const finalClasses = [styles.container, className, styles[size]].filter(Boolean).join(' ')

    return (
        <div className={finalClasses}>
            {`${currentIndex + 1}/${maxIndex}`}
        </div>
    )
}

export {NumberIndexIndicator}