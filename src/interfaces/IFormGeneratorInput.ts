import { CSSProperties } from "react";
import { FieldType } from "../enums/FieldType"

export interface IFormGeneratorInput {
    fields: IFormField[];
}
export interface IFormField {
    name: string;
    type: FieldType;
    placeHolder: string;
    style?: CSSProperties

}