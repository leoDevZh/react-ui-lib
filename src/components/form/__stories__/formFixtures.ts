import type { FieldConfig, SelectionNode } from '../Form'

type F = Record<string, any>

export const noop = (): boolean => true
export const noopSubmit = async (_data: unknown): Promise<void> => {}

export const PLACEHOLDER_IMG =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect width='100' height='100' fill='%23667eea'/%3E%3Ccircle cx='50' cy='38' r='15' fill='white' opacity='.9'/%3E%3Cellipse cx='50' cy='75' rx='22' ry='14' fill='white' opacity='.9'/%3E%3C/svg%3E"

export const colorOptions: SelectionNode[] = [
    { label: 'Design', value: 'design' },
    { label: 'Engineering', value: 'engineering' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Product', value: 'product' },
    { label: 'Support', value: 'support' },
]

export const checkboxOptions: SelectionNode[] = [
    { label: 'Hiking', value: 'hiking' },
    { label: 'Reading', value: 'reading' },
    { label: 'Cooking', value: 'cooking' },
    { label: 'Photography', value: 'photography' },
    { label: 'Gaming', value: 'gaming' },
    { label: 'Travel', value: 'travel' },
]

export const shortSteps = [
    { label: 'Basic', value: 'basic' },
    { label: 'Pro', value: 'pro' },
    { label: 'Enterprise', value: 'enterprise' },
]

export const longSteps = [
    { label: 'Starter', value: 'starter' },
    { label: 'Basic', value: 'basic' },
    { label: 'Pro', value: 'pro' },
    { label: 'Business', value: 'business' },
    { label: 'Enterprise', value: 'enterprise' },
]

export const textFields: FieldConfig<F>[] = [
    { name: 'name', label: 'Full Name', type: 'text', required: 'Required', validationFn: noop, inputConfig: { text: { placeholder: 'John Doe' } } },
    { name: 'age', label: 'Age', type: 'number', required: false, validationFn: noop },
    { name: 'email', label: 'Email', type: 'email', required: 'Required', validationFn: (v) => /\S+@\S+\.\S+/.test(v) || 'Invalid email address' },
    { name: 'password', label: 'Password', type: 'password', required: 'Required', validationFn: (v) => (v?.length ?? 0) >= 8 || 'Minimum 8 characters' },
]

export const richFields: FieldConfig<F>[] = [
    { name: 'bio', label: 'Biography', type: 'textarea', required: false, validationFn: noop, inputConfig: { textArea: { rows: 4, max: 200 } } },
    { name: 'category', label: 'Department', type: 'dropdown', required: 'Required', validationFn: noop, inputConfig: { dropDown: { selection: colorOptions, placeholder: 'Select department' } } },
    { name: 'phone', label: 'Phone Number', type: 'phone', required: false, validationFn: noop },
]

export const calendarProgressFields: FieldConfig<F>[] = [
    { name: 'date', label: 'Appointment Date', type: 'calendar', required: 'Required', validationFn: noop, inputConfig: { calendar: { yearsToSelect: [2024, 2025, 2026, 2027] } } },
    { name: 'plan', label: 'Subscription Plan', type: 'progress', required: false, validationFn: noop, inputConfig: { progress: { steps: shortSteps, showAllSteps: true } } },
]

export const photoCheckboxFields: FieldConfig<F>[] = [
    { name: 'photo', label: 'Profile Photo', type: 'photo', required: false, validationFn: noop },
    { name: 'hobbies', label: 'Interests', type: 'checkbox', required: false, validationFn: noop, inputConfig: { checkbox: { selection: checkboxOptions } } },
]

export const validationFields: FieldConfig<F>[] = [
    { name: 'email', label: 'Email Address', type: 'email', required: 'Email is required', validationFn: (v) => /^[^\s@]+@[^\s@]+\.com$/.test(v) || 'Must be a valid .com address' },
]

export const plainFields: FieldConfig<F>[] = [
    { name: 'name', label: 'Name', type: 'text', required: false, validationFn: noop, inputConfig: { isPlain: true, text: { placeholder: 'John Doe' } } },
    { name: 'email', label: 'Email', type: 'email', required: false, validationFn: noop, inputConfig: { isPlain: true } },
    { name: 'password', label: 'Password', type: 'password', required: false, validationFn: noop, inputConfig: { isPlain: true } },
]

export const allFields: FieldConfig<F>[] = [
    { name: 'firstName', label: 'First Name', type: 'text', required: 'Required', validationFn: noop, inputConfig: { text: { placeholder: 'John' } } },
    { name: 'age', label: 'Age', type: 'number', required: false, validationFn: noop },
    { name: 'email', label: 'Email', type: 'email', required: 'Required', validationFn: (v) => /\S+@\S+\.\S+/.test(v) || 'Invalid email' },
    { name: 'password', label: 'Password', type: 'password', required: 'Required', validationFn: (v) => (v?.length ?? 0) >= 8 || 'Min 8 chars' },
    { name: 'bio', label: 'Bio', type: 'textarea', required: false, validationFn: noop, inputConfig: { textArea: { rows: 3, max: 150 } } },
    { name: 'category', label: 'Department', type: 'dropdown', required: false, validationFn: noop, inputConfig: { dropDown: { selection: colorOptions, placeholder: 'Select' } } },
    { name: 'phone', label: 'Phone', type: 'phone', required: false, validationFn: noop },
    { name: 'date', label: 'Start Date', type: 'calendar', required: false, validationFn: noop },
    { name: 'hobbies', label: 'Interests', type: 'checkbox', required: false, validationFn: noop, inputConfig: { checkbox: { selection: checkboxOptions } } },
    { name: 'photo', label: 'Avatar', type: 'photo', required: false, validationFn: noop },
    { name: 'plan', label: 'Plan', type: 'progress', required: false, validationFn: noop, inputConfig: { progress: { steps: shortSteps, showAllSteps: true } } },
]
