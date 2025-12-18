import {FieldValues, type Path} from "react-hook-form";
import {InputProps} from "../../Form";
import {useLayoutEffect, useRef} from "react";
import style from "./textArea.module.css"

const TextArea = <T extends FieldValues,>({ field, registerFn, currentValue, setValueFn, errorMsg, className }: InputProps<T>) => {
    const divRef = useRef<HTMLDivElement>(null)
    const errorRef = useRef<HTMLSpanElement>(null)

    const containerClasses = [className, style.container, errorMsg ? style.error : ''].filter(Boolean).join(' ')
    const limitClasses = [style.limit, field.inputConfig?.textArea?.max ? '' : style.hide].filter(Boolean).join(' ')
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
        if (field.inputConfig?.textArea?.max && newValue.length > field.inputConfig?.textArea?.max) {
            setValueFn(field.name as Path<T>, newValue.substring(0, field.inputConfig?.textArea?.max) as any)
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
                rows={field.inputConfig?.textArea?.rows ?? 10}
                {...registerFn(field.name as Path<T>, {
                    onChange: limitChars,
                    required: field.required,
                    validate: field.validationFn
                })}
            />
            <span className={limitClasses}>
                {`${currentValue?.length ?? 0}/${field.inputConfig?.textArea?.max ?? 200}`}
            </span>
            <span ref={errorRef} className={style.errorSpan}>{errorMsg}</span>
        </div>
    )
}

export {TextArea}