import React, {JSX} from "react";
import styles from './basicToggleBtn.module.css'

interface ToggleBtnProps extends React.HTMLProps<HTMLDivElement> {
    direction: 'left' | 'right'
}

const BasicCarouselToggleBtn = ({direction, onClick, className}: ToggleBtnProps): JSX.Element => {

    const finalClasses = [styles.container, className].filter(Boolean).join(' ')

    function renderSvg() {
        return direction === 'left' ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
                d="M8.3685 12L13.1162 3.03212L14.8838 3.9679L10.6315 12L14.8838 20.0321L13.1162 20.9679L8.3685 12Z"></path>
        </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path
                d="M15.6315 12L10.8838 3.03212L9.11622 3.9679L13.3685 12L9.11622 20.0321L10.8838 20.9679L15.6315 12Z"></path>
        </svg>
    }

    return (
        <div onClick={onClick} className={finalClasses}>
            {renderSvg()}
        </div>
    )
}

export {BasicCarouselToggleBtn, type ToggleBtnProps}