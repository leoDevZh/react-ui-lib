import {
    type FieldValues,
    type Path,
    type SubmitHandler,
    useForm,
    UseFormRegister,
    UseFormSetValue
} from "react-hook-form";
import {BasicInput} from "./input/basic/BasicInput";
import React, {Dispatch, PropsWithChildren, SetStateAction, useEffect, useLayoutEffect, useMemo, useRef} from "react";
import {Button} from "../button";
import {ComponentSize} from "../provider";
import styles from "./form.module.css"
import {TextArea} from "./input/textarea/TextArea";
import {Dropdown} from "./input/dropdown/Dropdown";
import {PhoneNumberInput} from "./input/phone/PhoneNumberInput";
import {CalendarInput} from "./input/calendar/Calendar";
import {CheckboxInput} from "./input/checkbox/Checkbox";

interface InputConfig {
    size?: ComponentSize
    // Textarea
    textArea?: TextAreaConfig
    // Dropdown
    dropDown?: DropDownConfig
    // Phone
    phone?: PhoneConfig
    // Calendar
    calendar?: CalendarConfig
    // general
    autocomplete?: "name" | "given-name" | "family-name" | "email" | "tel" | "address-line1" | "address-line2" | "address-level2" | "address-level1" | "postal-code" | "country-name" | "new-password" | "current-password" | "organization"
    // Checkbox
    checkbox?: CheckboxConfig
}

interface TextAreaConfig {
    rows?: number
    max?: number
}

interface DropDownConfig {
    selection?: SelectionNode[]
    placeholder?: string
    dropdownHeight?: string
}

interface SelectionNode {
    label: string
    value: any
    option?: React.ReactNode,
    placeholderOption?: React.ReactNode
}

interface PhoneConfig {
    countryWhiteList?: string[]
}

interface CalendarConfig {
    yearsToSelect?: number[]
}

interface CheckboxConfig {
    selection?: SelectionNode[]
}

interface FieldConfig<T extends FieldValues> {
    name: keyof T
    label: string
    type: "text" | "number" | "password" | "email" | "textarea" | "dropdown" | "phone" | "calendar" | "checkbox"
    required: boolean | string
    validationFn: (value: any) => boolean | string
    inputConfig?: InputConfig
}

interface FormProps<T extends FieldValues> extends PropsWithChildren, React.FormHTMLAttributes<HTMLFormElement> {
    fields: FieldConfig<T>[],
    onSubmitFn: SubmitHandler<T>
    submitLabel?: string
    componentSize?: ComponentSize,
    errorMsg?: string,
    setErrorMsg?: Dispatch<SetStateAction<string | undefined>>
    onValuesChange?: (values: T) => void
}

interface InputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
    field: FieldConfig<T>
    errorMsg: null | string
    registerFn: UseFormRegister<T>
    currentValue: any
    setValueFn: UseFormSetValue<T>
}

const Form = <T extends FieldValues, >({
                                           fields,
                                           onSubmitFn,
                                           submitLabel,
                                           componentSize = 'sm',
                                           children,
                                           className,
                                           errorMsg,
                                           setErrorMsg,
                                           onValuesChange
                                       }: FormProps<T>) => {
    const {
        handleSubmit,
        register,
        formState: {isSubmitting, errors, isDirty},
        watch,
        setValue,
        trigger
    } = useForm<T>()
    const formRef = useRef<HTMLFormElement>(null)

    useLayoutEffect(() => {
        if (formRef.current) {
            const computedStyles = window.getComputedStyle(formRef.current)
            formRef.current.style.setProperty('--calc-font-size', computedStyles.fontSize)
        }
    }, []);

    const finalClass = [className, styles.form].join(' ')

    const values = watch()
    const stableValues = useMemo(() => values, [JSON.stringify(values)])

    useEffect(() => {
        if (setErrorMsg) {
            setErrorMsg(undefined)
        }
        if (onValuesChange) {
            onValuesChange(stableValues)
        }
    }, [stableValues])

    useEffect(() => {
        if (isDirty) {
            trigger()
        }
    }, [fields]);

    function getInput(field: FieldConfig<T>) {
        const errorMsg = (errors[field.name]?.message as string) ?? null
        switch (field.type) {
            case "number":
            case "text":
            case "password":
            case "email":
                return (
                    <BasicInput
                        field={field}
                        errorMsg={errorMsg}
                        registerFn={register}
                        currentValue={watch(field.name as Path<T>)}
                        setValueFn={setValue}
                    />
                )
            case "textarea":
                return <TextArea
                    field={field}
                    registerFn={register}
                    errorMsg={errorMsg}
                    currentValue={watch(field.name as Path<T>)}
                    setValueFn={setValue}
                />
            case "dropdown":
                return <Dropdown
                    field={field}
                    errorMsg={errorMsg}
                    registerFn={register}
                    currentValue={watch(field.name as Path<T>)}
                    setValueFn={setValue}
                />
            case "phone":
                return <PhoneNumberInput
                    field={field}
                    errorMsg={errorMsg}
                    registerFn={register}
                    currentValue={watch(field.name as Path<T>)}
                    setValueFn={setValue}
                />
            case "calendar":
                return <CalendarInput
                    field={field}
                    errorMsg={errorMsg}
                    registerFn={register}
                    currentValue={watch(field.name as Path<T>)}
                    setValueFn={setValue}
                />
            case "checkbox":
                return <CheckboxInput
                    field={field}
                    errorMsg={errorMsg}
                    registerFn={register}
                    currentValue={watch(field.name as Path<T>)}
                    setValueFn={setValue}
                />
        }
    }

    return (
        <form className={finalClass} onSubmit={handleSubmit(onSubmitFn)} ref={formRef}>
            {
                fields.map((field) => (
                    <div key={field.label}>
                        {getInput(field)}
                    </div>
                ))
            }
            {errorMsg ? <div className={styles.error}>{errorMsg}</div> : ''}
            {children ? children : <Button disabled={isSubmitting} label={submitLabel ?? "Submit"} type="submit" size={componentSize}/>}
        </form>
    )
}

export { Form, type FieldConfig, type FormProps, type SelectionNode, type InputProps }