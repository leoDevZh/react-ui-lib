import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Form } from './Form'
import type { FormProps } from './Form'
import {
    noopSubmit,
    textFields,
    richFields,
    calendarProgressFields,
    photoCheckboxFields,
    validationFields,
    plainFields,
    allFields,
} from './__stories__/formFixtures'

type FormArgs = FormProps<Record<string, any>>

const meta: Meta<FormArgs> = {
    title: 'Form/Form',
    component: Form as React.ComponentType<FormArgs>,
    tags: ['autodocs'],
    argTypes: {
        componentSize: {
            control: 'select',
            options: ['xs', 'sm', 'md', 'lg', 'xl'],
        },
        fields:         { table: { disable: true } },
        onSubmitFn:     { table: { disable: true } },
        defaultValues:  { table: { disable: true } },
        onValuesChange: { table: { disable: true } },
        setErrorMsg:    { table: { disable: true } },
        submitIndicator:{ table: { disable: true } },
        children:       { table: { disable: true } },
    },
}

export default meta
type Story = StoryObj<FormArgs>

export const TextFields: Story = {
    args: { componentSize: 'sm', submitLabel: 'Save' },
    render: ({ componentSize, submitLabel }) => (
        <div style={{ maxWidth: '480px', padding: '1rem' }}>
            <Form componentSize={componentSize} submitLabel={submitLabel} fields={textFields} onSubmitFn={noopSubmit} />
        </div>
    ),
}

export const RichInputs: Story = {
    args: { componentSize: 'sm', submitLabel: 'Submit' },
    render: ({ componentSize, submitLabel }) => (
        <div style={{ maxWidth: '480px', padding: '1rem' }}>
            <Form componentSize={componentSize} submitLabel={submitLabel} fields={richFields} onSubmitFn={noopSubmit} />
        </div>
    ),
}

export const CalendarAndProgress: Story = {
    args: { componentSize: 'sm', submitLabel: 'Book' },
    render: ({ componentSize, submitLabel }) => (
        <div style={{ maxWidth: '480px', padding: '1rem' }}>
            <Form componentSize={componentSize} submitLabel={submitLabel} fields={calendarProgressFields} onSubmitFn={noopSubmit} />
        </div>
    ),
}

export const PhotoAndCheckbox: Story = {
    args: { componentSize: 'sm', submitLabel: 'Save Profile' },
    render: ({ componentSize, submitLabel }) => (
        <div style={{ maxWidth: '480px', padding: '1rem' }}>
            <Form componentSize={componentSize} submitLabel={submitLabel} fields={photoCheckboxFields} onSubmitFn={noopSubmit} />
        </div>
    ),
}

export const WithValidation: Story = {
    args: { componentSize: 'sm', submitLabel: 'Check' },
    render: ({ componentSize, submitLabel }) => (
        <div style={{ maxWidth: '480px', padding: '1rem' }}>
            <Form componentSize={componentSize} submitLabel={submitLabel} fields={validationFields} onSubmitFn={noopSubmit} />
        </div>
    ),
}

export const Submitting: Story = {
    args: { componentSize: 'sm', submitting: true },
    render: ({ componentSize, submitting }) => (
        <div style={{ maxWidth: '480px', padding: '1rem' }}>
            <Form componentSize={componentSize} submitting={submitting} fields={textFields} onSubmitFn={noopSubmit} />
        </div>
    ),
}

export const WithSuccessLabel: Story = {
    args: { componentSize: 'sm', submitLabel: 'Save', successLabel: 'Saved successfully!' },
    render: ({ componentSize, submitLabel, successLabel }) => (
        <div style={{ maxWidth: '480px', padding: '1rem' }}>
            <Form componentSize={componentSize} submitLabel={submitLabel} successLabel={successLabel} fields={validationFields} onSubmitFn={noopSubmit} />
        </div>
    ),
}

export const PlainVariant: Story = {
    args: { componentSize: 'sm', submitLabel: 'Sign In' },
    render: ({ componentSize, submitLabel }) => (
        <div style={{ maxWidth: '480px', padding: '1rem' }}>
            <Form componentSize={componentSize} submitLabel={submitLabel} fields={plainFields} onSubmitFn={noopSubmit} />
        </div>
    ),
}

export const KitchenSink: Story = {
    args: { componentSize: 'sm', submitLabel: 'Submit All' },
    render: ({ componentSize, submitLabel }) => (
        <div style={{ maxWidth: '480px', padding: '1rem' }}>
            <Form componentSize={componentSize} submitLabel={submitLabel} fields={allFields} onSubmitFn={noopSubmit} />
        </div>
    ),
}
