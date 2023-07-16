import { CSSProperties } from "react";

export interface IButtonGeneratorInput {
    buttonType: ButtonType;
    buttonColor: ButtonColor;
    style?: CSSProperties;
    function: (buttonRef: IButtonGeneratorInput, params?: any[]) => void
}

export enum ButtonType {
    FLAT = 'FLAT',
    STROKED = 'STROKED'

}

export enum ButtonColor {
    PRIMARY = 'PRIMARY',
    WARN = 'WARN'
} 