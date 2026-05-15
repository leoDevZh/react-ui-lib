import {forwardRef, HTMLAttributes, useImperativeHandle, useRef} from "react";
import {StoryTellingAnimationItemRef} from "../../../../animation";
import styles from './basicPath.module.css'
import {ComponentSize} from "../../../../provider";

interface BasicPathItemProps extends HTMLAttributes<HTMLDivElement> {
    position?: 'first' | 'mid' | 'last'
    duration?: number
}

interface BasicPathItemProps {
    size?: ComponentSize
    length?: number
}

const BasicPathItem = forwardRef<StoryTellingAnimationItemRef, BasicPathItemProps>(
    ({className, size, position = 'mid', duration = .1, onClick, length = 3}, ref) => {
        const progRef = useRef<HTMLDivElement>(null)
        const dotRef = useRef<HTMLDivElement>(null)

        const finalClass = [className, styles.container, styles[size ?? 'md'], styles[position ?? 'mid'], renderFull() ? styles.full : ''].join(' ')

        function renderFull() {
            return length <= 3
        }

        useImperativeHandle(ref, () => ({
            addToTimeline: (tl, index) => {
                if (position === 'first') {
                    tl.addLabel('SELECTED' + index)
                        .to(dotRef.current, {
                            ease: 'none',
                            delay: 0,
                            duration: .1,
                            scale: 1
                        })
                        .to(progRef.current, {
                            width: renderFull() ? '100%' : '50%',
                            ease: 'none',
                            delay: 0,
                            duration: renderFull() ? duration * 2 : duration
                        }, "<")

                    return ['SELECTED' + index]
                } else if (position === 'mid') {
                    tl.to(progRef.current, {width: '50%', ease: 'none', delay: 0, duration: duration})
                        .to(dotRef.current, {
                            backgroundColor: 'var(--colors-action-primary)',
                            ease: 'none',
                            delay: 0,
                            duration: .1,
                            scale: 1.1
                        }, ">-.1")
                        .addLabel('SELECTED' + index)
                        .to(dotRef.current, {
                            ease: 'none',
                            delay: 0,
                            duration: .1,
                            scale: 1
                        })
                        .to(progRef.current, {width: '100%', ease: 'none', delay: 0, duration: duration}, "<")

                    return ['SELECTED' + index]
                } else {
                    tl.to(progRef.current, {
                        width: renderFull() ? '100%' : '50%',
                        ease: 'none',
                        delay: 0,
                        duration: renderFull() ? duration * 2 : duration
                    })
                        .to(dotRef.current, {
                            backgroundColor: 'var(--colors-action-primary)',
                            ease: 'none',
                            delay: 0,
                            duration: .1,
                            scale: 1.1
                        }, ">-.1")
                        .addLabel('SELECTED' + index)

                    return ['SELECTED' + index]
                }
            }
        }))

        return (
            <div className={finalClass} onClick={onClick}>
                <div ref={progRef} className={styles.progress}/>
                <div className={styles.path}/>
                <div ref={dotRef} className={styles.dot}/>
            </div>
        )
    }
)

export {BasicPathItem}