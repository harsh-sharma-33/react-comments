import React from 'react'
import { ButtonColor, ButtonType, IButtonGeneratorInput } from '../../interfaces/IButtonGeneratorInput'
import styles from './Button.module.css'
type Props = {
    buttonGeneratorInput: IButtonGeneratorInput;
    params?: any[]; // Taking custom parameters for callback function
    children: any
}

const Button = (props: Props) => {
    /**
     * Function is responsible for providing classNames to the button
     */
    const classNames = (function () {
        let color = ''
        let type = ''
        if (props.buttonGeneratorInput.buttonType === ButtonType.FLAT) {
            type = styles.flat
        }
        if (props.buttonGeneratorInput.buttonType === ButtonType.STROKED) {
            type = styles.stroked
        }
        if (props.buttonGeneratorInput.buttonColor === ButtonColor.PRIMARY) {
            color = styles.primary
        }
        if (props.buttonGeneratorInput.buttonColor === ButtonColor.WARN) {
            color = styles.warn
        }
        return `${color} ${type} ${styles.button}`

    })()

    return (
        <button className={classNames} style={props.buttonGeneratorInput.style} onClick={() => { props.buttonGeneratorInput.function(props.buttonGeneratorInput, props.params) }} >{props.children}</button>
    )
}

export default Button