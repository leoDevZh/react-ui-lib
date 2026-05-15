import {
    Children,
    cloneElement,
    forwardRef,
    HTMLAttributes,
    isValidElement,
    RefObject,
    useImperativeHandle,
    useRef,
    useState
} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";

interface StoryTellingAnimationItemRef {
    addToTimeline: (tl: gsap.core.Timeline, index: number) => string[]
}

interface StoryTellingOrchestratorRef {
    next: () => void
    previous: () => void
    goTo: (idx: number) => void
}

interface StoryTellingOrchestratorProps extends HTMLAttributes<HTMLDivElement> {
    triggerMode?: 'scroll' | 'manual'
    ease?: string
    duration?: number
    delay?: number
    revertOnUpdate?: boolean
    horizontal?: boolean
    scroller?: HTMLElement | null
    trigger?: RefObject<any>
    start?: string
    end?: string
    toggleActions?: string
    markers?: boolean
}

const StoryTellingOrchestrator = forwardRef<StoryTellingOrchestratorRef, StoryTellingOrchestratorProps>((
    {
        triggerMode = 'scroll',
        ease = 'none',
        duration = 1,
        delay = 0,
        revertOnUpdate = true,
        horizontal = false,
        scroller,
        trigger,
        start = 'top top',
        end = 'bottom top',
        toggleActions = 'play none none none',
        markers = false,
        children,
        className
    },
    ref
) => {
    const childRefs = useRef<StoryTellingAnimationItemRef[]>([])
    const divRef = useRef<HTMLDivElement>(null)
    const stepsRef = useRef<string[]>([])
    const masterRef = useRef<gsap.core.Timeline>(null)
    const [currentIdx, setCurrentIdx] = useState(0)

    useGSAP(() => {
        masterRef.current = gsap.timeline({paused: true, ease, duration, delay})

        if (triggerMode === 'scroll') {
            gsap.registerPlugin(ScrollTrigger)
            ScrollTrigger.create({
                horizontal,
                scroller: scroller,
                trigger: trigger?.current ?? divRef.current,
                pin: true,
                start,
                end,
                toggleActions,
                onUpdate: (self) => {
                    const steps = stepsRef.current.length
                    const stepIdx = Math.floor(self.progress * steps)
                    masterRef.current?.tweenTo(stepsRef.current[stepIdx]!, {overwrite: true})
                },
                markers,
            })
        }

        stepsRef.current = []
        for (const child of childRefs.current) {
            const i = childRefs.current.indexOf(child);
            stepsRef.current.push(...child.addToTimeline(masterRef.current, i))
        }
    }, {dependencies: [scroller], revertOnUpdate})

    useImperativeHandle(ref, () => ({
        next: () => {
            const stepIdx = Math.min(currentIdx + 1, stepsRef.current.length - 1)
            masterRef.current?.tweenTo(stepsRef.current[stepIdx]!, {overwrite: true})
            setCurrentIdx(stepIdx)
        },
        previous: () => {
            const stepIdx = Math.max(currentIdx - 1, 0)
            masterRef.current?.tweenTo(stepsRef.current[stepIdx]!, {overwrite: true})
            setCurrentIdx(stepIdx)
        },
        goTo: (idx) => {
            const stepIdx = Math.max(0, Math.min(idx, (stepsRef.current.length - 1)))
            masterRef.current?.tweenTo(stepsRef.current[stepIdx]!, {overwrite: true})
            setCurrentIdx(stepIdx)
        }
    }))

    function cloneChildren() {
        return Children.map(children, (child, index) => {
            if (!isValidElement(child)) return child

            return cloneElement(child as any, {
                // @ts-ignore
                ...child.props,
                ref: (el: StoryTellingAnimationItemRef) => {
                    if (el) childRefs.current[index] = el
                }
            })
        })
    }

    return (
        <div ref={divRef} className={className}>
            {cloneChildren()}
        </div>
    )
})

export {
    StoryTellingOrchestrator,
    type StoryTellingAnimationItemRef,
    type StoryTellingOrchestratorProps,
    type StoryTellingOrchestratorRef
}