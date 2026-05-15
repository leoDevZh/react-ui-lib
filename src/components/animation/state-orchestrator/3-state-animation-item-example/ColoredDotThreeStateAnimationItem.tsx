import {forwardRef, useImperativeHandle, useRef} from "react";
import {StoryTellingAnimationItemRef} from "../StoryTellingOrchestrator";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

const ColoredDotThreeStateAnimationItem = forwardRef<StoryTellingAnimationItemRef, object>(
    ({}, ref) => {
        const divRef = useRef<HTMLDivElement>(null)

        useGSAP(() => {
            gsap.set(divRef.current, {backgroundColor: 'red'})
        })

        useImperativeHandle(ref, () => ({
            addToTimeline: (tl, index) => {
                tl.addLabel('BEFORE' + index)
                    // Transition BEFORE -> ACTIVE
                    .to(divRef.current, {backgroundColor: 'green'})
                    .addLabel('ACTIVE' + index)
                    // Transition ACTIVE -> AFTER
                    .to(divRef.current, {backgroundColor: 'blue'})
                    .addLabel('AFTER' + index)

                return ['BEFORE' + index, 'ACTIVE' + index, 'AFTER' + index]
            }
        }))

        return (
            <div ref={divRef}
                 style={{display: 'block', width: '24px', height: '24px', borderRadius: 'var(--radius-round)'}}>
            </div>
        )
    }
)

export {ColoredDotThreeStateAnimationItem}