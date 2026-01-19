import React, {forwardRef, RefObject, useEffect, useImperativeHandle, useLayoutEffect, useRef} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import TimelineVars = gsap.TimelineVars;
import TweenVars = gsap.TweenVars;

interface AppearTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
    duration?: number
    ease?: string
    delay?: number
    type?: 'fade-x' | 'fade-y'
    distance?: number

    useScrollTrigger?: boolean
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

interface AppearTimelineRef {
    play: () => void;
    pause: () => void;
    restart: () => void;
    reverse: () => void;
}

const AppearTimeline = forwardRef<AppearTimelineRef, AppearTimelineProps>(
    (
        {
            children,
            className,
            duration = 1,
            ease = 'none',
            delay = .25,
            type = "fade-x",
            distance = -50,
            useScrollTrigger = false,
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
        }, ref) => {

        const divRef = useRef<HTMLDivElement>(null)
        const animRef = useRef<gsap.core.Timeline | null>(null);

        const useIsomorphicLayoutEffect = (typeof window !== "undefined") ? useLayoutEffect : useEffect;

        useIsomorphicLayoutEffect(() => {
            const children = Array.from(divRef?.current?.children ?? []) as HTMLElement[]

            const ctx = gsap.context(() => {
                animRef.current = gsap.timeline(initTimelineConfig())

                for (const child of children) {
                    animRef.current.from(child, initTweenConfig(), `<${delay}`)
                }
            })

            return () => {
                ctx.revert()
            }
        }, [])

        useImperativeHandle(ref, () => ({
            play: () => animRef.current?.play(),
            pause: () => animRef.current?.pause(),
            restart: () => animRef.current?.restart(),
            reverse: () => animRef.current?.reverse(),
        }))

        function initTimelineConfig(): TimelineVars {
            let vars = {
                paused: true,
                duration: duration,
                ease: ease,
            } as TimelineVars

            if (useScrollTrigger) {
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

        function initTweenConfig(): TweenVars {
            switch (type) {
                case 'fade-x':
                    return {
                        x: distance,
                        opacity: 0,
                        ease: ease
                    }
                case 'fade-y':
                    return {
                        y: distance,
                        opacity: 0,
                        ease: ease
                    }

                default:
                    return {}
            }
        }

        return (
            <div ref={divRef} className={className}>
                {children}
            </div>
        )
    }
)

export {AppearTimeline, type AppearTimelineProps, type AppearTimelineRef}