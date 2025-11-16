import {FieldValues, Path, UseFormRegister, UseFormSetValue} from "react-hook-form";
import {FieldConfig, SelectionNode} from "../../Form";
import style from "./dropdown.module.css";
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import styles from "../basic/basicInput.module.css";

interface DropdownInputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
    field: FieldConfig<T>
    errorMsg: null | string
    register: UseFormRegister<T>
    currentValue: any
    setValue: UseFormSetValue<T>
}

const Dropdown = <T extends FieldValues,> ({ field, register, errorMsg, setValue, currentValue, className }: DropdownInputProps<T>) => {
    const [openDropdown, setOpenDropDown] = useState<boolean>(false)

    const divRef = useRef<HTMLDivElement>(null)

    const containerClasses = [className, style.container, errorMsg ? style.error : '', styles[field?.inputConfig?.size ?? 'md']].filter(Boolean).join(' ')
    let dropdownClasses = [style.dropdown, openDropdown ? style.open : ''].filter(Boolean).join(' ')
    let placeholderClasses = [style.placeholder, openDropdown ? style.open : '', (openDropdown || currentValue) ? style.selected : ''].filter(Boolean).join(' ')

    useEffect(() => {
        if (!field.inputConfig?.placeholder) {
            setValue(field.name as Path<T>, field.inputConfig?.selection?.at(0)?.value)
        }
    }, []);
    
    useEffect(() => {
        dropdownClasses = [style.dropdown, openDropdown ? style.open : ''].filter(Boolean).join(' ')
        placeholderClasses = [style.placeholder, openDropdown ? style.open : '', (openDropdown || currentValue) ? style.selected : ''].filter(Boolean).join(' ')

    }, [openDropdown])

    useLayoutEffect(() => {
        if (divRef?.current) {
            const computedStyle = window.getComputedStyle(divRef.current)
            divRef.current.style.setProperty('--calc-font-size', computedStyle.fontSize)
            divRef.current.style.setProperty('--calc-width', computedStyle.width)
            if (field.inputConfig?.dropdownHeight) {
                divRef.current.style.setProperty('--dropdown-height', field.inputConfig.dropdownHeight)
            }
        }
    }, []);

    function renderOption(opt: SelectionNode, key = opt.label, isPlaceHolder = false) {
        let child: string | React.ReactNode = opt.label
        if (opt.option) {
            child = opt.option
        }
        if (opt.placeholderOption && isPlaceHolder) {
            child = opt.placeholderOption
        }
        return (
            <div
                key={key}
                className={style.option}
                onClick={() => {
                    setValue(field.name as Path<T>, opt.value, {shouldValidate: true})
                    setOpenDropDown(false)
                }}
            >
                <span>
                    {child}
                </span>
            </div>
        )
    }

    function renderPlaceholder() {
        const emptyPh = field.inputConfig?.placeholder ?? ''
        const retAr = field.inputConfig?.selection?.
        filter(opt => opt.value === currentValue)?.
        map(opt => renderOption(opt, '__key__', true))
        const ret = retAr!.pop()
        return ret ? ret : <span>{emptyPh}</span>
    }

    return (
        <div
            ref={divRef}
            className={containerClasses}
        >
            <label className={style.label}>{field.label}</label>

            <div
                className={placeholderClasses}
                onClick={() => setOpenDropDown(!openDropdown)}
                onBlur={() => setOpenDropDown(false)}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') setOpenDropDown(true)
                }}
                tabIndex={0}
            >
                <div className={style.placeholderWrapper}>
                    {renderPlaceholder()}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="5.63599 8.22168 12.72791 7.77822" className={style.icon}><path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z" /></svg>
                </div>
            </div>
            <div
                className={dropdownClasses}
                {...register(field.name as Path<T>,
                    {
                        required: field.required,
                        validate: field.validationFn
                    }
                )}
            >
                <div className={style.dropdownInner}>
                    {field.inputConfig?.selection?.map((opt) => renderOption(opt))}
                </div>
            </div>
            <span className={style.errorSpan}>{errorMsg}</span>
        </div>
    )
}

export {Dropdown, type DropdownInputProps}