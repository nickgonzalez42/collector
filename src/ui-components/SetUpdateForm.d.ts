/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type SetUpdateFormInputValues = {
    name?: string;
};
export declare type SetUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SetUpdateFormOverridesProps = {
    SetUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SetUpdateFormProps = React.PropsWithChildren<{
    overrides?: SetUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    set?: any;
    onSubmit?: (fields: SetUpdateFormInputValues) => SetUpdateFormInputValues;
    onSuccess?: (fields: SetUpdateFormInputValues) => void;
    onError?: (fields: SetUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SetUpdateFormInputValues) => SetUpdateFormInputValues;
    onValidate?: SetUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SetUpdateForm(props: SetUpdateFormProps): React.ReactElement;
