import {useForm} from 'react-hook-form'
import {Dropdown} from '../input/dropdown/Dropdown'
import {CalendarInput} from '../input/calendar/Calendar'
import {CheckboxInput} from '../input/checkbox/Checkbox'
import {PhoneNumberInput} from '../input/phone/PhoneNumberInput'
import {PhotoInput} from '../input/photo/PhotoInput'
import {ProgressInput} from '../input/slider/ProgressInput'
import type {FieldConfig, SelectionNode} from '../Form'
import type {ComponentSize} from '../../provider'
import {checkboxOptions, colorOptions, noop, shortSteps} from './formFixtures'

type F = Record<string, any>

export function DropdownWrapper({
    size = 'md',
    selection = colorOptions,
    placeholder,
    errorMsg = null,
}: {
    size?: ComponentSize
    selection?: SelectionNode[]
    placeholder?: string
    errorMsg?: string | null
}) {
    const { register, watch, setValue } = useForm<F>()
    const field: FieldConfig<F> = {
        name: 'val', label: 'Department', type: 'dropdown',
        required: false, validationFn: noop,
        inputConfig: { size, dropDown: { selection, placeholder } },
    }
    return (
        <Dropdown
            field={field}
            registerFn={register}
            currentValue={watch('val')}
            setValueFn={setValue}
            errorMsg={errorMsg}
        />
    )
}

export function CalendarWrapper({
    size = 'md',
    defaultValue,
    errorMsg = null,
}: {
    size?: ComponentSize
    defaultValue?: string
    errorMsg?: string | null
}) {
    const { register, watch, setValue } = useForm<F>({ defaultValues: { date: defaultValue } })
    const field: FieldConfig<F> = {
        name: 'date', label: 'Select Date', type: 'calendar',
        required: false, validationFn: noop,
        inputConfig: { size },
    }
    return (
        <CalendarInput
            field={field}
            registerFn={register}
            currentValue={watch('date')}
            setValueFn={setValue}
            errorMsg={errorMsg}
        />
    )
}

export function CheckboxWrapper({
    size = 'md',
    defaultValues,
    errorMsg = null,
}: {
    size?: ComponentSize
    defaultValues?: string[]
    errorMsg?: string | null
}) {
    const { register, watch, setValue } = useForm<F>({ defaultValues: { hobbies: defaultValues } })
    const field: FieldConfig<F> = {
        name: 'hobbies', label: 'Interests', type: 'checkbox',
        required: false, validationFn: noop,
        inputConfig: { size, checkbox: { selection: checkboxOptions } },
    }
    return (
        <CheckboxInput
            field={field}
            registerFn={register}
            currentValue={watch('hobbies') ?? []}
            setValueFn={setValue}
            errorMsg={errorMsg}
        />
    )
}

export function PhoneWrapper({
    size = 'md',
    defaultValue,
    countryWhiteList,
    errorMsg = null,
}: {
    size?: ComponentSize
    defaultValue?: string
    countryWhiteList?: string[]
    errorMsg?: string | null
}) {
    const { register, watch, setValue } = useForm<F>({ defaultValues: { phone: defaultValue } })
    const field: FieldConfig<F> = {
        name: 'phone', label: 'Phone Number', type: 'phone',
        required: false, validationFn: noop,
        inputConfig: { size, phone: { countryWhiteList } },
    }
    return (
        <PhoneNumberInput
            field={field}
            registerFn={register}
            currentValue={watch('phone')}
            setValueFn={setValue}
            errorMsg={errorMsg}
        />
    )
}

export function PhotoWrapper({
    size = 'md',
    initialImg,
    onDelete,
    errorMsg = null,
}: {
    size?: ComponentSize
    initialImg?: string
    onDelete?: () => void
    errorMsg?: string | null
}) {
    const { register, watch, setValue } = useForm<F>()
    const field: FieldConfig<F> = {
        name: 'photo', label: 'Profile Photo', type: 'photo',
        required: false, validationFn: noop,
        inputConfig: { size, photo: { initialImg, onDelete } },
    }
    return (
        <PhotoInput
            field={field}
            registerFn={register}
            currentValue={watch('photo')}
            setValueFn={setValue}
            errorMsg={errorMsg}
        />
    )
}

export function ProgressWrapper({
    size = 'md',
    steps = shortSteps,
    showAllSteps = true,
    defaultValue,
    errorMsg = null,
}: {
    size?: ComponentSize
    steps?: { label: string; value: any }[]
    showAllSteps?: boolean
    defaultValue?: string
    errorMsg?: string | null
}) {
    const { register, watch, setValue } = useForm<F>({ defaultValues: { step: defaultValue } })
    const field: FieldConfig<F> = {
        name: 'step', label: 'Choose Plan', type: 'progress',
        required: false, validationFn: noop,
        inputConfig: { size, progress: { steps, showAllSteps } },
    }
    return (
        <ProgressInput
            field={field}
            registerFn={register}
            currentValue={watch('step')}
            setValueFn={setValue}
            errorMsg={errorMsg}
        />
    )
}
