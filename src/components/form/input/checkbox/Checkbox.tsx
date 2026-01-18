import {InputProps} from "../../Form";
import {FieldValues, Path} from "react-hook-form";
import styles from './checkbox.module.css'
import {RefObject, useLayoutEffect, useRef} from "react";
import {SvgDraw, SvgDrawRef} from "../../../svg";

const CheckboxInput = <t extends FieldValues, >({
                                                    className,
                                                    field,
                                                    errorMsg,
                                                    registerFn,
                                                    currentValue
                                                }: InputProps<t>) => {
    const divRef = useRef<HTMLDivElement>(null)
    const gridRef = useRef<HTMLDivElement>(null)
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

    function clickMe(checkRef: RefObject<SvgDrawRef | null>, value: any) {
        console.log(currentValue)
        if (currentValue instanceof Array && currentValue.includes(value)) {
            checkRef?.current?.reverse()
        } else {
            checkRef?.current?.play()
        }
    }

    return (
        <div className={finalClasses} ref={divRef}>
            <label className={styles.label}>
                {field.label}
            </label>
            <div className={styles.gridContainer} ref={gridRef}>
                {field.inputConfig?.checkbox?.selection?.map(option => {
                    const checkRef = useRef<SvgDrawRef>(null)

                    return (
                        <div className={styles.checkbox} key={option.label}>
                            <div className={styles.checkboxContainer}>
                                <SvgDraw
                                    ref={checkRef}
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
                                    onClick={() => clickMe(checkRef, option.value)}
                                    type="checkbox"
                                    value={option.value}
                                    {...registerFn(field.name as Path<t>, {
                                        required: field.required,
                                        validate: field.validationFn
                                    })}
                                />
                            </div>
                            <label>{option.label}</label>
                        </div>)
                })}
            </div>
        </div>
    )

}

export {CheckboxInput}