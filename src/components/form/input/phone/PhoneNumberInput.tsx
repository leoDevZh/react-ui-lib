import {FieldValues, Path, useForm} from "react-hook-form";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {InputProps, SelectionNode} from "../../Form";
import {Dropdown} from "../dropdown/Dropdown";
import countries from "./assets/countries.json"
import style from "./phoneNumber.module.css"
import styles from "../basic/basicInput.module.css";

interface FlagFormType {
    country: string
    phoneNr: string
}

interface Country {
    name: string
    full_name: string
    dial_code: string
    flag: string
}

const OptionComp = ({country}: {country:Country}) => {
    return (
        <div style={{display: 'flex', gap: 'var(--spacing-lg)', alignItems: 'center', fontSize: 'var(--typography-fontSize-xs)'}}>
            <img src={country.flag} width={24} alt={country.full_name}/>
            <span>{country.full_name}</span>
        </div>
    )
}

let countriesSelection: SelectionNode[] = countries.map((c1: Country) => {
    return {
        label: c1.full_name,
        value: c1.full_name,
        option: <OptionComp country={c1}/>,
        placeholderOption: <img src={c1.flag} width={18} alt={c1.full_name}/>
    }})
    .sort((c1, c2) => c1.label.localeCompare(c2.label))

const PhoneNumberInput = <T extends FieldValues,> ({field, registerFn, errorMsg, currentValue, setValueFn, className}: InputProps<T>) => {
    const {register, watch, setValue} = useForm<FlagFormType>()
    const divRef = useRef<HTMLDivElement>(null)
    const errorRef = useRef<HTMLSpanElement>(null)

    const [dialCode, setDialCode] = useState<string | undefined>(undefined)

    const containerClasses = [className, style.container, errorMsg ? style.error : '', styles[field?.inputConfig?.size ?? 'md']].filter(Boolean).join(' ')
    const inputWrapperClasses = [style.inputContainer, (watch('country') || currentValue) ? style.selected : '' ].filter(Boolean).join(' ')

    useLayoutEffect(() => {
        if (divRef.current) {
            const computedStyle = window.getComputedStyle(divRef.current)
            divRef.current.style.setProperty('--calc-font-size', computedStyle.fontSize)
        }
        if (errorRef?.current) {
            const computedStyle = window.getComputedStyle(errorRef.current)
            divRef?.current?.style.setProperty('--calc-error-height', computedStyle.height)
        }
    }, []);

    useEffect(() => {
        if (!dialCode) {
            setValueFn(field.name as Path<T>, '' as any)
            return
        }
        setValueFn(field.name as Path<T>, dialCode + watch('phoneNr') as any)
    }, [dialCode, watch('phoneNr')]);

    useEffect(() => {
        if (field.inputConfig?.phone?.countryWhiteList) {
            countriesSelection = countriesSelection.filter(c => field.inputConfig?.phone?.countryWhiteList?.includes(c.label.toLowerCase()))
        }
    }, []);

    return (
        <div
            ref={divRef}
            className={containerClasses}
        >
            <label className={style.label}>{field.label}</label>
            <div
                className={inputWrapperClasses}
            >
                <Dropdown
                    className={style.countrySelect}
                    field={{
                        name: 'country',
                        label: '',
                        type: 'dropdown',
                        required: false,
                        validationFn: () => true,
                        inputConfig: {
                            dropDown: {
                                ...field.inputConfig?.dropDown,
                                placeholder: ' ',
                                selection: countriesSelection
                            },
                        }
                    }}
                    registerFn={register}
                    currentValue={watch('country')}
                    errorMsg={null}
                    setValueFn={(_, value) => {
                        setValue('country', value)
                        setDialCode(countries.filter(c => c.full_name === value)?.pop()?.dial_code)
                    }}
                />
                <span>{dialCode}</span>
                <input
                    type={'tel'}
                    {...register('phoneNr')}
                />
            </div>
            <div
                {...registerFn(field.name as Path<T>,{
                    required: field.required,
                    validate: field.validationFn
                })}>
            </div>
            <span ref={errorRef} className={style.errorSpan}>{errorMsg}</span>
        </div>
    )
}

export {PhoneNumberInput}