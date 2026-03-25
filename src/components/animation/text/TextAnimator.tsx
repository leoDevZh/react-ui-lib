import React, {forwardRef, RefObject, useImperativeHandle, useRef} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import {useGSAP} from "@gsap/react";
import TweenVars = gsap.TweenVars;

interface TextAnimatorProps extends React.HTMLAttributes<HTMLDivElement> {
    animation?: 'fade' | 'slide-left' | 'slide-right' | 'slide-up' | 'slide-down' | 'scale-x' | 'scale-y' | 'scale',
    customAnimation?: TweenVars,
    triggerMode?: 'manual' | 'scroll'
    duration?: number
    stagger?: number
    ease?: string
    type?: 'words' | 'lines' | 'chars'
    mask?: boolean
    revertOnUpdate?: boolean

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

    onStart?: () => void
    onUpdate?: () => void
    onRepeat?: () => void
    onReverseComplete?: () => void
    onComplete?: () => void
}

interface TextAnimatorRef {
    play: () => void;
    pause: () => void;
    restart: () => void;
    reverse: () => void;
}

const TextAnimator = forwardRef<TextAnimatorRef, TextAnimatorProps>(
    (
        {
            children,
            className,
            animation = 'slide-right',
            customAnimation,
            triggerMode = 'scroll',
            duration = .5,
            stagger = .05,
            ease = 'none',
            type = 'words',
            mask = false,
            revertOnUpdate = false,
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
        }, ref) => {

        const divRef = useRef<HTMLDivElement>(null)
        const animRef = useRef<gsap.core.Tween | null>(null)
        const splitRef = useRef<SplitText | null>(null)

        useGSAP(() => {
            if (!divRef.current) return

            const target = divRef.current.querySelector("p, span, h1, h2, h3, h4, h5, h6") || divRef.current

            let targets: Element[] = []
            if (type === 'chars') {
                targets = splitChars(target)
            } else {
                const split = new SplitText(target, {type: type, mask: mask} as any)
                splitRef.current = split
                targets =
                    type === 'words'
                        ? split.words
                        : split.lines
            }

            gsap.registerPlugin(SplitText)
            animRef.current = gsap.from(targets, initConfig())
        }, {revertOnUpdate})

        useImperativeHandle(ref, () => ({
            play: () => animRef.current?.play(),
            pause: () => animRef.current?.pause(),
            restart: () => animRef.current?.restart(),
            reverse: () => animRef.current?.reverse(),
        }))

        function splitChars(target: Element) {
            const originalAriaLabel = target.getAttribute('aria-label')

            const text = target.textContent || "";
            if (!originalAriaLabel) target.setAttribute('aria-label', text)
            target.textContent = "";

            const t = text
                .split("")
                .map((char) => {
                    const span = document.createElement("span")
                    span.textContent = char === " " ? "\u00A0" : char
                    span.style.display = "inline-block"
                    target.appendChild(span)
                    return span
                })
            return t
        }

        function initConfig(): TweenVars {
            let tweenVars: gsap.TweenVars = {
                ...initAnimationType(),
                paused: triggerMode === 'manual',
                stagger: stagger,
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
                    scroller: scroller?.current ?? undefined,
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
    }
)

export {TextAnimator, type TextAnimatorRef, type TextAnimatorProps}