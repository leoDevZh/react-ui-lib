import React, {forwardRef, RefObject, useImperativeHandle, useRef} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {useGSAP} from "@gsap/react";
import TweenVars = gsap.TweenVars;

interface AnimationItemProps extends React.HTMLAttributes<HTMLDivElement> {
    animation?: 'fade' | 'slide-left' | 'slide-right' | 'slide-up' | 'slide-down' | 'scale-x' | 'scale-y' | 'scale',
    customAnimation?: TweenVars,
    triggerMode?: 'manual' | 'scroll'
    duration?: number
    ease?: string
    revertOnUpdate?: boolean

    horizontal?: boolean
    scroller?: HTMLElement | null
    trigger?: RefObject<any>
    pin?: boolean
    pinSpacing?: string
    start?: string
    end?: string
    toggleActions?: string
    scrub?: boolean | number
    markers?: boolean,

    onStart?: () => void
    onUpdate?: () => void
    onRepeat?: () => void
    onReverseComplete?: () => void
    onComplete?: () => void
}

interface AnimationItemRef {
    play: () => void;
    pause: () => void;
    restart: () => void;
    reverse: () => void;
}

const AnimationItem = forwardRef<AnimationItemRef, AnimationItemProps>((
    {
        children,
        className,
        animation = 'slide-right',
        customAnimation,
        triggerMode = 'scroll',
        duration = .5,
        ease = 'none',
        revertOnUpdate = true,
        horizontal = false,
        scroller,
        trigger,
        pin = false,
        pinSpacing,
        start = 'top center',
        end,
        toggleActions = 'play reverse play reverse',
        scrub = false,
        markers = false,
        onStart = () => {
        },
        onUpdate = () => {
        },
        onRepeat = () => {
        },
        onReverseComplete = () => {
        },
        onComplete = () => {
        }
    }, ref
) => {

    const divRef = useRef<HTMLDivElement>(null)
    const animRef = useRef<gsap.core.Tween | null>(null)

    useGSAP(() => {
        animRef.current = gsap.from(divRef.current, initConfig())

    }, {dependencies: [scroller], revertOnUpdate})

    useImperativeHandle(ref, () => ({
        play: () => animRef.current?.play(),
        pause: () => animRef.current?.pause(),
        restart: () => animRef.current?.restart(),
        reverse: () => animRef.current?.reverse(),
    }))

    function initConfig(): TweenVars {
        let tweenVars: gsap.TweenVars = {
            ...initAnimationType(),
            paused: triggerMode === 'manual',
            duration: duration,
            ease: ease,
            onStart: onStart,
            onUpdate: onUpdate,
            onRepeat: onRepeat,
            onReverseComplete: onReverseComplete,
            onComplete: onComplete
        }

        if (triggerMode === 'scroll') {
            gsap.registerPlugin(ScrollTrigger)

            tweenVars.scrollTrigger = {
                horizontal,
                scroller: scroller,
                trigger: trigger?.current ?? divRef.current,
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

    function initAnimationType(): TweenVars {
        let fromVars: gsap.TweenVars = {}
        switch (animation) {
            case 'fade':
                fromVars = {opacity: 0}
                break
            case 'slide-left':
                fromVars = {x: -1 * 50, opacity: 0}
                break;
            case 'slide-right':
                fromVars = {x: 50, opacity: 0}
                break
            case 'slide-up':
                fromVars = {y: 50, opacity: 0}
                break
            case 'slide-down':
                fromVars = {y: -1 * 50, opacity: 0}
                break
            case 'scale':
                fromVars = {scaleX: 0, scaleY: 0, opacity: 0}
                break
            case 'scale-x':
                fromVars = {scaleX: 0, opacity: 0}
                break
            case 'scale-y':
                fromVars = {scaleY: 0, opacity: 0}
                break
        }

        return customAnimation ? customAnimation : fromVars
    }

    return (
        <div ref={divRef} className={className}>
            {children}
        </div>
    )
})

export {AnimationItem, type AnimationItemProps, type AnimationItemRef}