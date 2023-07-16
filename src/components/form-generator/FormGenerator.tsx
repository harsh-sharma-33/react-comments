/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */

/**
 * Component is responsible for generating form using a JSON object 
 */

import React from 'react'
import { IFormField, IFormGeneratorInput } from '../../interfaces/IFormGeneratorInput'
import { FieldType } from '../../enums/FieldType'
import styles from './FormGenerator.module.css'

type Props = { data: IFormGeneratorInput; setFormData: any }

const FormGenerator = (props: Props) => {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        props.setFormData(((_pre: any) => {
            return {
                ..._pre,
                [e.target.name]: e.target.value
            }
        }))
    }

    return (
        <>
            {props.data.fields.map((field: IFormField, index: number) => {
                switch (field.type) {
                    case FieldType.TEXT:
                        return <input key={index} onChange={handleChange} className={styles.input} style={field.style} type="text" placeholder={field.placeHolder} name={field.name} />
                    default:
                        return ''
                }
            })}
        </>
    )
}

export default FormGenerator