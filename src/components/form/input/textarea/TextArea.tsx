import {FieldValues, type Path, UseFormRegister, UseFormSetValue} from "react-hook-form";
import {FieldConfig} from "../../Form";
import React, {useLayoutEffect, useRef} from "react";
import style from "./textArea.module.css"

interface TextAreaProps<T extends FieldValues> extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    field: FieldConfig<T>
    errorMsg: null | string
    register: UseFormRegister<T>
    currentValue: any
    setValue: UseFormSetValue<T>
}

const TextArea = <T extends FieldValues,>({ field, register, currentValue, setValue, errorMsg, className }: TextAreaProps<T>) => {
    const divRef = useRef<HTMLDivElement>(null)
    const errorRef = useRef<HTMLSpanElement>(null)

    const containerClasses = [className, style.container, errorMsg ? style.error : ''].filter(Boolean).join(' ')
    const limitClasses = [style.limit, field.inputConfig?.max ? '' : style.hide].filter(Boolean).join(' ')
    const textClasses = [style.text, currentValue?.length > 0 ? style.content : ''].filter(Boolean).join(' ')

    useLayoutEffect(() => {
        if (divRef?.current) {
            const computedStyle = window.getComputedStyle(divRef.current)
            divRef.current.style.setProperty('--calc-font-size', computedStyle.fontSize)
        }
        if (errorRef?.current) {
            const computedStyle = window.getComputedStyle(errorRef.current)
            divRef?.current?.style.setProperty('--calc-error-height', computedStyle.height)
        }
    }, [errorMsg]);

    function limitChars(event: any) {
        const newValue: string = event.target.value
        if (field.inputConfig?.max && newValue.length > field.inputConfig?.max) {
            setValue(field.name as Path<T>, newValue.substring(0, field.inputConfig?.max) as any)
        }
    }

    return (
        <div
            className={containerClasses}
            ref={divRef}
        >
            <label className={style.label}>{field.label}</label>
            <textarea
                className={textClasses}
                rows={field.inputConfig?.rows ?? 10}
                {...register(field.name as Path<T>, {
                    onChange: limitChars,
                    required: field.required,
                    validate: field.validationFn
                })}
            />
            <span className={limitClasses}>
                {`${currentValue?.length ?? 0}/${field.inputConfig?.max ?? 200}`}
            </span>
            <span ref={errorRef} className={style.errorSpan}>{errorMsg}</span>
        </div>
    )
}

export {TextArea, type TextAreaProps}