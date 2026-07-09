import {ButtonHTMLAttributes, ReactNode} from "react";
import {ComponentSize} from "../../provider";
import {LoadingIndicator} from "../../indicator";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string
    size?: ComponentSize
    icon?: ReactNode
    drawIcon?: boolean
    invert?: boolean
    simpleColor?: boolean
    accentColor?: string
    loading?: boolean
    loadingIndicator?: LoadingIndicator
}