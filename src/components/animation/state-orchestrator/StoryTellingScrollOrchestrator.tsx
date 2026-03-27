import {Children, cloneElement, HTMLAttributes, isValidElement, RefObject, useRef} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import {ScrollTrigger} from "gsap/ScrollTrigger";

interface StoryTellingAnimationItemRef {
    addToTimeline: (tl: gsap.core.Timeline, index: number) => string[]
}

interface StoryTellingOrchestratorProps extends HTMLAttributes<HTMLDivElement> {
    revertOnUpdate?: boolean
    horizontal?: boolean
    scroller?: HTMLElement | null
    trigger?: RefObject<any>
    start?: string
    end?: string
    toggleActions?: string
    markers?: boolean
}

const StoryTellingScrollOrchestrator = (
    {
        revertOnUpdate = true,
        horizontal = false,
        scroller,
        trigger,
        start = 'top top',
        end = 'bottom bottom',
        toggleActions = 'play none none none',
        markers = false,
        children,
        className
    }: StoryTellingOrchestratorProps
) => {

    const childRefs = useRef<StoryTellingAnimationItemRef[]>([])
    const divRef = useRef<HTMLDivElement>(null)
    const stepsRef = useRef<string[]>([])

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)

        const master = gsap.timeline({
            scrollTrigger: {
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

                    master.tweenTo(stepsRef.current[stepIdx]!, {overwrite: true})
                },
                markers,
            }
        })

        stepsRef.current = []
        for (const child of childRefs.current) {
            const i = childRefs.current.indexOf(child);
            stepsRef.current.push(...child.addToTimeline(master, i))
        }
    }, {dependencies: [scroller], revertOnUpdate})

    function cloneChildren() {
        return Children.map(children, (child, index) => {
            if (!isValidElement(child)) return child

            return cloneElement(child as any, {
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

}

export {StoryTellingScrollOrchestrator, type StoryTellingAnimationItemRef, type StoryTellingOrchestratorProps}