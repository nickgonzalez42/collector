/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SetCreateFormInputValues = {
    name?: string;
    releaseType?: string;
    releaseOrder?: number;
};
export declare type SetCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    releaseType?: ValidationFunction<string>;
    releaseOrder?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SetCreateFormOverridesProps = {
    SetCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    releaseType?: PrimitiveOverrideProps<SelectFieldProps>;
    releaseOrder?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SetCreateFormProps = React.PropsWithChildren<{
    overrides?: SetCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SetCreateFormInputValues) => SetCreateFormInputValues;
    onSuccess?: (fields: SetCreateFormInputValues) => void;
    onError?: (fields: SetCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SetCreateFormInputValues) => SetCreateFormInputValues;
    onValidate?: SetCreateFormValidationValues;
} & React.CSSProperties>;
export default function SetCreateForm(props: SetCreateFormProps): React.ReactElement;
