import {ButtonHTMLAttributes} from "react";
import {ComponentSize} from "../../provider";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string
    size?: ComponentSize
}