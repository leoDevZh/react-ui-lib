import {ButtonHTMLAttributes, ReactNode} from "react";
import {ComponentSize} from "../../provider";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string
    size?: ComponentSize
    icon?: ReactNode
    drawIcon?: boolean
    invert?: boolean
    simpleColor?: boolean
    accentColor?: string
}