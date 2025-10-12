import {
    forwardRef,
    type PropsWithChildren,
    RefObject,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useRef
} from "react";
import gsap from 'gsap';
import MorphSVGPlugin from "gsap/MorphSVGPlugin";
import {ScrollTrigger} from "gsap/ScrollTrigger";

interface SvgMorphProps extends PropsWithChildren {
    triggerMode?: 'manual' | 'scroll'
    duration?: number
    ease?: string
    onStart?: () => void
    onUpdate?: () => void
    onRepeat?: () => void
    onReverseComplete?: () => void
    onComplete?: () => void

    //ScrollTrigger
    horizontal?: boolean
    scroller?: RefObject<any>
    trigger?: RefObject<any>
    pin?: boolean
    pinSpacing?: string
    start?: string
    end?: string
    toggleActions?: string
    scrub?: boolean | number
    markers?: boolean

    //Morph
    endPath: string
    type?: 'linear' | 'rotational'
    shapeIdx?: number | 'auto'
    map?: 'size' | 'position' | 'complexity' | undefined
}

interface SvgMorphRef {
    play: () => void;
    pause: () => void;
    restart: () => void;
    reverse: () => void;
}

const SvgMorph = forwardRef<SvgMorphRef, SvgMorphProps>(
    (
        {
            triggerMode = 'manual',
            duration = 1,
            ease = 'none',
            onStart = () => {},
            onUpdate = () => {},
            onRepeat = () => {},
            onReverseComplete = () => {},
            onComplete = () => {},
            horizontal = false,
            scroller,
            trigger,
            pin = false,
            pinSpacing = true,
            start = 'top center',
            end,
            toggleActions = 'play none none none',
            scrub = false,
            markers = false,
            endPath,
            type = 'linear',
            shapeIdx = 'auto',
            map,
            children
        },
        ref
    ) => {

        const container = useRef<HTMLDivElement>(null)
        const animRef = useRef<gsap.core.Tween | null>(null);

        const useIsomorphicLayoutEffect = (typeof window !== "undefined") ? useLayoutEffect : useEffect;

        useIsomorphicLayoutEffect(() => {
            const pathElement = container?.current?.querySelector("path")
            if (!pathElement) return
            const ctx = gsap.context(() => {
                gsap.registerPlugin(MorphSVGPlugin)

                animRef.current = gsap.to(pathElement!, initTweenVars())
            })

            return () => ctx.revert()
        }, [])

        useImperativeHandle(ref, () => ({
            play: () => animRef.current?.play(),
            pause: () => animRef.current?.pause(),
            restart: () => animRef.current?.restart(),
            reverse: () => animRef.current?.reverse(),
        }))

        function initTweenVars(): gsap.TweenVars {
            let tweenVars: gsap.TweenVars = {
                paused: triggerMode === 'manual',
                duration: duration,
                ease: ease,
                morphSVG: {
                    shape: endPath,
                    type,
                    shapeIndex: shapeIdx,
                    map
                },
                onStart: onStart,
                onUpdate: onUpdate,
                onRepeat: onRepeat,
                onReverseComplete: onReverseComplete,
                onComplete: onComplete
            }

            if(triggerMode === 'scroll') {
                gsap.registerPlugin(ScrollTrigger)

                tweenVars.scrollTrigger = {
                    horizontal,
                    scroller: scroller?.current ?? undefined,
                    trigger: trigger?.current ?? container.current,
                    pin,
                    pinSpacing,
                    start,
                    end,
                    toggleActions,
                    scrub,
                    markers
                }
            }

            return tweenVars
        }

        return <div ref={container}>{children}</div>
    })

export {SvgMorph, type SvgMorphRef, type SvgMorphProps}