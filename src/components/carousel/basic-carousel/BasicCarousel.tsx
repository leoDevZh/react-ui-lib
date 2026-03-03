import React, {useLayoutEffect, useRef, useState} from "react";
import styles from './basicCarousel.module.css'
import {CarouselToggleBtnType, useCarouselToggleBtn} from "../util/useCarouselToggleBtn";
import {CarouselIndexIndicatorType, useCarouselIndicator} from "../util/useCarouselIndexIndicator";
import {useIsMobile} from "../../../hooks";

interface BasicCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
    itemGap?: string
    padding?: boolean
    initialIdx?: number
    hideCTA?: boolean
    carouselToggleBtnType?: CarouselToggleBtnType
    carouselIndexIndicatorType?: CarouselIndexIndicatorType
}

const BasicCarousel = (
    {
        children,
        itemGap = '15px',
        padding = false,
        initialIdx = 0,
        hideCTA = true,
        carouselToggleBtnType,
        carouselIndexIndicatorType,
        className
    }: BasicCarouselProps) => {

    const [currentIdx, setCurrentIdx] = useState<number>(initialIdx)
    const [maxIdx, setMaxIdx] = useState<number>(0)
    const [isPressed, setIsPressed] = useState<boolean>(false)

    const outerRef = useRef<HTMLDivElement>(null)
    const divRef = useRef<HTMLDivElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const itemsRef = useRef<HTMLElement[]>([])
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

    const isMobile = useIsMobile()

    const outerClasses = [styles.outer, isPressed ? styles.pressed : '', isMobile ? styles.outerMobile : styles.outerDesktop].filter(Boolean).join(' ')
    const finalClasses = [styles.container, className].filter(Boolean).join(' ')
    const toggleBtnLeft = [styles.toggleBtn, styles.left, (isMobile || currentIdx === 0) ? styles.hide : ''].filter(Boolean).join(' ')
    const toggleBtnRight = [styles.toggleBtn, styles.right, (isMobile || currentIdx === (maxIdx - 1)) ? styles.hide : ''].filter(Boolean).join(' ')
    const indexIndicatorClasses = [styles.indexIndicator].filter(Boolean).join(' ')


    const CarouselToggleBtn = carouselToggleBtnType
        ? useCarouselToggleBtn(carouselToggleBtnType)
        : undefined

    const CarouselIndexIndicator = carouselIndexIndicatorType ? useCarouselIndicator(carouselIndexIndicatorType) : undefined

    useLayoutEffect(() => {
        outerRef.current?.style.setProperty('--toggle-opacity', hideCTA ? '0' : '1')
        wrapperRef.current?.style.setProperty('--item-gap', itemGap)
        itemsRef.current = Array.from(wrapperRef?.current?.children ?? []) as HTMLElement[]
        setMaxIdx(itemsRef.current.length)
        if (itemsRef.current.length === 0) return
        resizeItems()
        addOptionalPadding()
        moveToIndex(initialIdx, 'instant')
        divRef.current!.addEventListener('scroll', handleScroll, {passive: true})

        return () => {
            divRef.current!.removeEventListener('scroll', handleScroll)
        }
    }, [])

    function resizeItems() {
        const targetHeight = divRef?.current?.getBoundingClientRect().height ?? 1 // just dont be undefined

        for (const child of itemsRef.current) {
            const rect = child.getBoundingClientRect()
            const resizeFactor = targetHeight / rect.height

            child.style.height = `${rect.height * resizeFactor}px`
            child.style.width = `${rect.width * resizeFactor}px`
        }
    }

    function addOptionalPadding() {
        if (padding) {
            const itemWidth = itemsRef.current.at(0)!.getBoundingClientRect().width
            const padding = itemWidth + parseInt(itemGap)
            if (wrapperRef?.current) {
                wrapperRef.current.style.paddingInline = `${padding}px`
            }
        }
    }

    function moveToIndex(idx: number, behavior: ScrollBehavior = 'smooth') {
        const itemWidth = itemsRef.current.at(idx)!.getBoundingClientRect().width
        const containerWidth = divRef.current!.getBoundingClientRect().width
        let targetScrollLeft = 0
        if (padding || idx !== 0) {
            const paddingOffset = padding ? itemWidth + parseInt(itemGap) : 0
            targetScrollLeft = paddingOffset - (containerWidth - itemWidth) * .5 + idx * (itemWidth + parseInt(itemGap))
        }
        divRef.current!.scrollTo({
            left: targetScrollLeft,
            behavior: behavior
        })
    }

    const handleScroll = () => {
        const scrollLeft = divRef.current!.scrollLeft
        const containerCenter = scrollLeft + divRef.current!.clientWidth / 2

        let closestIdx = 0
        let minDistance = Infinity

        itemsRef.current.forEach((item, idx) => {
            const itemRect = item.getBoundingClientRect()
            const wrapperRect = wrapperRef.current!.getBoundingClientRect()
            const itemCenter = itemRect.left - wrapperRect.left + itemRect.width / 2
            const distance = Math.abs(containerCenter - itemCenter)

            if (distance < minDistance) {
                minDistance = distance
                closestIdx = idx
            }
        })
        setCurrentIdx(closestIdx)
    }

    function onHandleTouchEnd() {
        clearTimeout(timeoutRef.current)

        timeoutRef.current = setTimeout(() => setIsPressed(false), 1200)
    }

    function onHandleTouchStart() {
        setIsPressed(true)
        clearTimeout(timeoutRef.current)
    }

    return (
        <div ref={outerRef} className={outerClasses} onTouchStart={onHandleTouchStart}
             onTouchEnd={onHandleTouchEnd}>
            {CarouselToggleBtn ? (
                <>
                    <CarouselToggleBtn
                        className={toggleBtnLeft}
                        direction="left"
                        onClick={() => moveToIndex(currentIdx - 1)}
                    />
                    <CarouselToggleBtn
                        className={toggleBtnRight}
                        direction="right"
                        onClick={() => moveToIndex(currentIdx + 1)}
                    />
                </>
            ) : null}
            {CarouselIndexIndicator ?
                <CarouselIndexIndicator className={indexIndicatorClasses} maxIndex={maxIdx}
                                        currentIndex={currentIdx}/> : null
            }
            <div ref={divRef} className={finalClasses}>
                <div ref={wrapperRef} className={styles.wrapper}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export {BasicCarousel, type BasicCarouselProps}