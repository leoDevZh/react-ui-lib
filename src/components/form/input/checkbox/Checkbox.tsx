import {InputProps} from "../../Form";
import {FieldValues, Path} from "react-hook-form";
import styles from './checkbox.module.css'
import {useLayoutEffect, useRef} from "react";
import {SvgDraw, SvgDrawRef} from "../../../svg";

const CheckboxInput = <T extends FieldValues, >({
                                                    className,
                                                    field,
                                                    errorMsg,
                                                    registerFn,
                                                    currentValue
                                                }: InputProps<T>) => {
    const divRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)
    const checkRefs = useRef<(SvgDrawRef | null)[]>([])
    const finalClasses = [className, styles.container, styles[field.inputConfig?.size ?? 'md'], errorMsg ? styles.error : ''].filter(Boolean).join(' ')

    useLayoutEffect(() => {
        if (divRef?.current) {
            const computedStyle = window.getComputedStyle(divRef.current)
            divRef.current.style.setProperty('--calc-font-size', computedStyle.fontSize)
        }
        if (gridRef?.current) {
            const items = Array.from(gridRef.current.children) as HTMLElement[]
            const maxWidth = items.reduce((max, el) => {
                const w = el.getBoundingClientRect().width
                return w > max ? w : max
            }, 0)
            divRef?.current?.style.setProperty('--checkbox-min-width', `${maxWidth}px`)
        }
    }, []);

    function clickMe(ref: SvgDrawRef | null, value: any) {
        if (currentValue instanceof Array && currentValue.includes(value)) {
            ref?.reverse()
        } else {
            ref?.play()
        }
    }

    return (
        <div className={finalClasses} ref={divRef}>
            <label className={styles.label}>
                {field.label}
            </label>
            <div className={styles.gridContainer} ref={gridRef}>
                {field.inputConfig?.checkbox?.selection?.map((option, idx) => {
                    if (currentValue instanceof Array && currentValue.includes(option.value)) {
                        setTimeout(() => {
                            checkRefs.current[idx]?.play()
                        }, 250)
                    }
                    // @ts-ignore
                    // @ts-ignore
                    return (
                        <div className={styles.checkbox} key={option.label}>
                            <div className={styles.checkboxContainer}>
                                <SvgDraw
                                    ref={(el) => {
                                        checkRefs.current[idx] = el
                                    }}
                                    duration={.2}
                                    className={styles.checkDraw}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M4 12L10 18L20 6"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </SvgDraw>
                                <input
                                    id={`${String(field.name)}-${option.value}`}
                                    //@ts-ignore
                                    onClick={() => clickMe(checkRefs.current[idx], option.value)}
                                    type="checkbox"
                                    value={option.value}
                                    {...registerFn(field.name as Path<T>, {
                                        required: field.required,
                                        validate: field.validationFn
                                    })}
                                />
                            </div>
                            <label className={styles.checkboxLabel}
                                   htmlFor={`${String(field.name)}-${option.value}`}>{option.label}</label>
                        </div>)
                })}
            </div>
            <span className={styles.errorSpan}>{errorMsg}</span>
        </div>
    )

}

export {CheckboxInput}