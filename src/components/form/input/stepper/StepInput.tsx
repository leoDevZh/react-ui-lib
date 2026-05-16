import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import {FieldValues, Path} from 'react-hook-form'
import {InputProps} from '../../Form'
import {useTheme} from '../../../provider'
import styles from './stepInput.module.css'

const StepInput = <T extends FieldValues>({
    field,
    registerFn,
    errorMsg,
    currentValue,
    setValueFn,
    className
}: InputProps<T>) => {
    const { theme } = useTheme()
    const steps = field.inputConfig?.step?.steps ?? []
    const initialIdx = Math.max(0, steps.findIndex(s => s.value === currentValue))
    const [currentIdx, setCurrentIdx] = useState(initialIdx)
    const containerRef = useRef<HTMLDivElement>(null)

    const fillPct = steps.length > 1
        ? (currentIdx / (steps.length - 1)) * 100
        : 0

    useLayoutEffect(() => {
        if (containerRef.current) {
            const computed = window.getComputedStyle(containerRef.current)
            containerRef.current.style.setProperty('--calc-font-size', computed.fontSize)
        }
    }, [])

    useEffect(() => {
        const step = steps[currentIdx]
        if (step) {
            setValueFn(field.name as Path<T>, step.value, { shouldValidate: true })
        }
    }, [currentIdx])

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'ArrowRight' && currentIdx < steps.length - 1) {
            e.preventDefault()
            setCurrentIdx(i => i + 1)
        } else if (e.key === 'ArrowLeft' && currentIdx > 0) {
            e.preventDefault()
            setCurrentIdx(i => i - 1)
        }
    }

    const finalClass = [
        className,
        styles.container,
        styles[field.inputConfig?.size ?? 'md'],
        errorMsg ? styles.error : ''
    ].filter(Boolean).join(' ')

    const centerLabelClass = [
        styles.centerLabel,
        theme.style === 'morphism' ? styles.morphism : styles.classic
    ].filter(Boolean).join(' ')

    const currentLabel = steps[currentIdx]?.label

    return (
        <div ref={containerRef} className={finalClass}>
            <input
                type="hidden"
                {...registerFn(field.name as Path<T>, {
                    required: field.required,
                    validate: field.validationFn
                })}
            />
            <label className={styles.fieldLabel}>{field.label}</label>
            <div
                className={styles.trackArea}
                role="group"
                aria-label={field.label}
                onKeyDown={handleKeyDown}
                tabIndex={-1}
            >
                <div className={styles.trackWrapper}>
                    <div className={styles.trackLine}>
                        <div
                            className={styles.trackFill}
                            style={{ width: `${fillPct}%` }}
                        />
                    </div>
                    <div className={styles.nodesRow}>
                        {steps.map((_, idx) => (
                            <button
                                key={`StepInput-${idx}`}
                                type="button"
                                className={[
                                    styles.node,
                                    idx < currentIdx ? styles.nodePast : '',
                                    idx === currentIdx ? styles.nodeActive : ''
                                ].filter(Boolean).join(' ')}
                                onClick={() => setCurrentIdx(idx)}
                                aria-pressed={idx === currentIdx}
                                tabIndex={idx === currentIdx ? 0 : -1}
                            />
                        ))}
                    </div>
                </div>
                {currentLabel !== undefined && (
                    <div className={centerLabelClass}>
                        <div className={styles.centerLabelContent}>
                            {currentLabel}
                        </div>
                    </div>
                )}
            </div>
            <span className={styles.errorSpan}>{errorMsg}</span>
        </div>
    )
}

export { StepInput }
