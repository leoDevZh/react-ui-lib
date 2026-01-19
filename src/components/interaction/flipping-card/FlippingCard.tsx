import React, {RefObject, useEffect, useLayoutEffect, useRef} from "react";
import styles from './flippingCard.module.css'
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useIsMobile} from "../../../hooks";
import TimelineVars = gsap.TimelineVars;

interface FlippingCardProps extends React.HTMLAttributes<HTMLDivElement> {
    duration?: number
    ease?: string

    horizontal?: boolean
    scroller?: RefObject<any>
    trigger?: RefObject<any>
    pin?: boolean
    pinSpacing?: string
    start?: string
    end?: string
    toggleActions?: string
    scrub?: boolean | number
    markers?: boolean,
}

const FlippingCard = (
    {
        children,
        className,
        duration = 1,
        ease = 'none',
        horizontal = false,
        scroller,
        trigger,
        pin = false,
        pinSpacing,
        start = 'top center',
        end = 'bottom 30%',
        toggleActions = 'play reverse play reverse',
        scrub = false,
        markers = false
    }: FlippingCardProps) => {
    const isMobile = useIsMobile()

    const divRef = useRef<HTMLDivElement>(null)
    const finalClasses = [className, styles.container].join(' ')

    const animRef = useRef<gsap.core.Timeline | null>(null);

    const useIsomorphicLayoutEffect = (typeof window !== "undefined") ? useLayoutEffect : useEffect;

    useIsomorphicLayoutEffect(() => {
        // init children
        const children = Array.from(divRef?.current?.children ?? []) as HTMLElement[]

        if (children.length != 2) {
            throw new Error("Flipping Card must have exactly 2 children element")
        }

        const maxSize = children.reduce(
            ({width, height}, el) => {
                const rect = el.getBoundingClientRect()
                const w = rect.width
                const h = rect.height
                return {
                    width: Math.max(width, w),
                    height: Math.max(height, h),
                }
            },
            {width: 0, height: 0}
        )
        divRef?.current?.style.setProperty('--width', `${maxSize.width}px`)
        divRef?.current?.style.setProperty('--height', `${maxSize.height}px`)

        children.at(0)?.classList.add(styles.cardOne as string)
        children.at(1)?.classList.add(styles.cardTwo as string)

        // add hover listener
        divRef?.current?.addEventListener('mouseenter', handleMouseEnter)
        divRef?.current?.addEventListener('mouseleave', handleMouseLeave)

        const ctx = gsap.context(() => {
            animRef.current = gsap.timeline(initTimelineConfig())
                .to(children.at(0)!, {
                    rotationY: 90
                }, '<')
                .from(children.at(1)!, {
                    rotationY: 90
                }, '>')

        })

        return () => {
            ctx.revert()
            divRef?.current?.removeEventListener('mouseenter', handleMouseEnter)
            divRef?.current?.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [isMobile])

    const handleMouseEnter = () => {
        runTimeline()
    }

    const handleMouseLeave = () => {
        runTimeline()
    }

    function runTimeline() {
        if (animRef?.current?.progress() === 0) {
            animRef?.current?.play()
        } else if (animRef?.current?.reversed()) {
            animRef?.current?.play()
        } else {
            animRef?.current?.reverse()
        }
    }

    function initTimelineConfig(): TimelineVars {
        let vars = {
            paused: true,
            duration: duration,
            ease: ease,
        } as TimelineVars

        if (isMobile) {
            gsap.registerPlugin(ScrollTrigger)
            vars.scrollTrigger = {
                horizontal,
                scroller: scroller?.current ?? undefined,
                trigger: trigger?.current ?? divRef?.current,
                pin,
                pinSpacing,
                start,
                end,
                toggleActions,
                scrub,
                markers
            }
        }

        return vars
    }

    return (
        <div ref={divRef} className={finalClasses}>
            {children}
        </div>
    )
}

export {FlippingCard, type FlippingCardProps}