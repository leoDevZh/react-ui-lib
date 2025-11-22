import {FieldValues, Path, UseFormRegister} from "react-hook-form";
import styles from "./basicInput.module.css"
import {useLayoutEffect, useRef} from "react";
import {FieldConfig} from "../../Form";

interface TextInputProps<T extends FieldValues> extends React.FormHTMLAttributes<HTMLFormElement> {
    field: FieldConfig<T>
    errorMsg: null | string
    register: UseFormRegister<T>
    currentValue: any
}

const BasicInput = <T extends FieldValues,>({field, register, errorMsg, currentValue, className}: TextInputProps<T>) => {

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
                    {...register(field.name as Path<T>,
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

export {BasicInput, type TextInputProps}