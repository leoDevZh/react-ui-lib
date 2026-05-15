import {FieldValues, Path} from "react-hook-form";
import {InputProps} from "../../Form";
import styles from "./progressInput.module.css"
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {BasicPathItem} from "./basicpath/BasicPath";
import {StoryTellingOrchestrator, StoryTellingOrchestratorRef} from "../../../animation";


const ProgressInput = <T extends FieldValues, >({
                                                    field,
                                                    registerFn,
                                                    errorMsg,
                                                    currentValue,
                                                    className,
                                                    setValueFn
                                                }: InputProps<T>) => {

    const finalClass = [className, styles.container, styles[field?.inputConfig?.size ?? 'md'], errorMsg ? styles.error : '', renderFull() ? styles.full : ''].filter(Boolean).join(' ')

    const [currentValueIdx, setCurrentValueIdx] = useState<number>((field.inputConfig?.progress?.steps.findIndex(step => step.value === currentValue)! > 0) ? field.inputConfig?.progress?.steps.findIndex(step => step.value === currentValue)! : 0)
    const divRef = useRef<HTMLDivElement>(null)
    const sliderRef = useRef<StoryTellingOrchestratorRef>(null)

    function renderFull() {
        return field.inputConfig?.progress?.steps.length! <= 3
    }

    useLayoutEffect(() => {
        if (divRef?.current) {
            const computedStyle = window.getComputedStyle(divRef.current)
            divRef.current.style.setProperty('--calc-font-size', computedStyle.fontSize)
        }
    }, [])

    useEffect(() => {
        setValueFn(field.name as Path<T>, field.inputConfig?.progress?.steps.at(currentValueIdx)!.value, {shouldValidate: true})
        sliderRef.current?.goTo(currentValueIdx)
    }, [currentValueIdx]);

    function renderLabels() {
        if (field.inputConfig?.progress?.showAllSteps) {
            return (
                <>
                    {field.inputConfig.progress.steps.map((step, idx) => {
                        return (
                            <label key={idx} className={idx <= currentValueIdx ? styles.activeLabel : ''}
                                   onClick={() => setCurrentValueIdx(idx)}>{step.label}</label>
                        )
                    })}
                </>
            )
        } else {
            return (
                <>
                    <label onClick={() => setCurrentValueIdx(0)}
                           className={0 <= currentValueIdx ? styles.activeLabel : ''}>
                        {field.inputConfig?.progress?.steps.at(0)?.label}
                    </label>
                    <label
                        onClick={() => setCurrentValueIdx(field.inputConfig?.progress?.steps.length! - 1)}
                        className={(field.inputConfig?.progress?.steps.length! - 1) === currentValueIdx ? styles.activeLabel : ''}>
                        {field.inputConfig?.progress?.steps.at(field.inputConfig?.progress?.steps.length! - 1)?.label}
                    </label>
                </>
            )
        }
    }

    return (
        <div ref={divRef} className={finalClass}>
            <label className={styles.label}>
                {field.label}
            </label>
            <div
                className={styles.wrapper}
                {...registerFn(field.name as Path<T>,
                    {
                        required: field.required,
                        validate: field.validationFn
                    }
                )}
            >
                <div className={styles.labelContainer}>
                    {renderLabels()}
                </div>
                <StoryTellingOrchestrator ref={sliderRef} className={styles.slider} triggerMode='manual'>
                    {field.inputConfig?.progress?.steps.map((_, idx) => {
                        let position: any = 'mid'
                        if (idx === 0) {
                            position = 'first'
                        } else if (idx === (field.inputConfig?.progress?.steps.length! - 1)) {
                            position = 'last'
                        }
                        return <BasicPathItem
                            key={idx} size={field?.inputConfig?.size ?? 'md'}
                            position={position}
                            onClick={() => setCurrentValueIdx(idx)}
                            length={field.inputConfig?.progress?.steps.length ?? 0}
                        ></BasicPathItem>
                    })}
                </StoryTellingOrchestrator>
            </div>
            <span className={styles.errorSpan}>{errorMsg}</span>
        </div>
    )
}

export {ProgressInput}