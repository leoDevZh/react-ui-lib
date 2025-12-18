import {FieldValues, Path} from "react-hook-form";
import styles from "./basicInput.module.css"
import {useLayoutEffect, useRef} from "react";
import {InputProps} from "../../Form";

const BasicInput = <T extends FieldValues,>({field, registerFn, errorMsg, currentValue, className}: InputProps<T>) => {

    const divRef = useRef<HTMLDivElement>(null);
    const errorRef = useRef<HTMLSpanElement>(null)
    const finalClasses = [className, styles.container , styles[field?.inputConfig?.size ?? 'md'], currentValue ? styles.content : '', errorMsg ? styles.error : ''].filter(Boolean).join(' ')

    useLayoutEffect(() => {
        if (divRef?.current) {
            const computedStyle = window.getComputedStyle(divRef.current)
            divRef.current.style.setProperty('--calc-font-size', computedStyle.fontSize)
        }
        if (errorRef?.current) {
            const computedStyle = window.getComputedStyle(errorRef.current)
            divRef?.current?.style.setProperty('--calc-error-height', computedStyle.height)
        }
    }, [errorMsg])

    return (
        <div
            className={finalClasses}
            ref={divRef}
        >
            <label className={styles.label}>
                {field.label}
            </label>
            <div className={styles.wrapper}>
                <input
                    type={field.type}
                    autoComplete={field.inputConfig?.autocomplete}
                    {...registerFn(field.name as Path<T>,
                        {
                            required: field.required,
                            validate: field.validationFn
                        }
                    )}
                />
            </div>
            <span ref={errorRef}>{errorMsg}</span>
        </div>
    )
}

export {BasicInput}