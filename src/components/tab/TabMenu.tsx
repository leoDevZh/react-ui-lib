import styles from './tabmenu.module.css'
import {ComponentType, HTMLAttributes, ReactNode, useLayoutEffect, useRef, useState} from "react";
import {useButtonStyles} from "../button/hooks/useButtonStyles";
import {ComponentSize} from "../provider";

interface TabMenuItem {
    title: string | ReactNode
    component: ComponentType<any>
    props?: any
}

interface TabMenuProps extends HTMLAttributes<HTMLDivElement> {
    items: TabMenuItem[]
    arrowLeft?: ReactNode
    arrowRight?: ReactNode
    size?: ComponentSize
    displayArrow?: boolean
}

const TabMenu = ({items, arrowLeft, arrowRight, className, size = 'md', displayArrow = true}: TabMenuProps) => {

    const [activeIndex, setActiveIndex] = useState(0)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)

    const scrollDivRef = useRef<HTMLDivElement>(null)
    const tabItemsRef = useRef<HTMLButtonElement[]>([])

    const {pressed, onTouchStart, onTouchEnd, className: buttonClass} = useButtonStyles({size, className})
    const finalClass = [styles.container, className].filter(Boolean).join(' ')

    useLayoutEffect(() => {
        const el = scrollDivRef.current
        if (!el) return

        // scroll progress tracking
        const handleScroll = () => {
            const el = scrollDivRef.current
            if (!el) return
            const {scrollLeft, scrollWidth, clientWidth} = el

            setCanScrollLeft((scrollLeft > 0) && displayArrow)
            setCanScrollRight((scrollLeft < (scrollWidth - clientWidth) - 1) && displayArrow)
        }

        handleScroll()
        el.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleScroll)


        // calc tab indicator width
        el.style.setProperty('--calc-tab-width', `${tabItemsRef.current[0]!.getBoundingClientRect().width}px`)

        return () => {
            el.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [])

    useLayoutEffect(() => {
        const container = scrollDivRef.current
        const activeTab = tabItemsRef.current[activeIndex]
        if (!container || !activeTab) return

        const offset = activeTab.offsetLeft //tabRect.left - containerRect.left + container.scrollLeft

        container.style.setProperty('--indicator-left-offset', `${offset}px`)

    }, [activeIndex])

    function scrollByDirection(direction: 'left' | 'right') {
        const el = scrollDivRef.current
        if (!el) return
        const amount = el.clientWidth * 0.5

        el.scrollBy({
            left: direction === 'left' ? -amount : amount,
            behavior: 'smooth'
        })
    }

    function renderActiveTab() {
        const activeTabItem = items[activeIndex]
        const ActiveComponent = activeTabItem?.component
        if (ActiveComponent) {
            return <ActiveComponent {...activeTabItem.props}/>
        }
        return <></>
    }

    return (
        <div className={finalClass}>
            <div className={styles.tablist} role='tablist' aria-label='Main tabs'>
                {canScrollLeft ? (
                    <button
                        className={`${styles.arrowLeft} ${buttonClass} ${pressed ? styles.pressed : ''}`}
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                        onClick={() => scrollByDirection('left')}
                    >
                        {arrowLeft ?? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path>
                            </svg>
                        )}
                    </button>
                ) : <div className={styles.arrowLeft}></div>}
                <div ref={scrollDivRef} className={styles.tabItemsContainer}>
                    <div className={styles.inner}>
                        {items.map((tabItem, idx) => (
                            <button
                                key={idx}
                                ref={(el) => {
                                    if (el) tabItemsRef.current[idx] = el
                                }}
                                className={`${styles.tabItem} ${buttonClass} ${activeIndex === idx ? styles.activeTab : ''}`}
                                onTouchStart={onTouchStart}
                                onTouchEnd={onTouchEnd}
                                role='tab'
                                aria-selected={activeIndex === idx}
                                onClick={() => setActiveIndex(idx)}
                            >
                                {tabItem.title}
                            </button>
                        ))}
                    </div>

                    <div className={styles.indicator}/>
                </div>
                {canScrollRight ? (
                    <button
                        className={`${styles.arrowRight} ${buttonClass} ${pressed ? styles.pressed : ''}`}
                        onTouchStart={onTouchStart}
                        onTouchEnd={onTouchEnd}
                        onClick={() => scrollByDirection('right')}
                    >
                        {arrowRight ?? (
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                            </svg>
                        )}
                    </button>
                ) : <div className={styles.arrowRight}></div>}
            </div>
            <div
                className={styles.tabPanel}
                role='tabpanel'
                id={`panel-${activeIndex}`}
                aria-labelledby={`tab-${activeIndex}`}
            >
                {renderActiveTab()}
            </div>
        </div>
    )
}

export {TabMenu, type TabMenuProps, type TabMenuItem}