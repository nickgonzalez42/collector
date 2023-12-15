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
export declare type CollectionCardCreateFormInputValues = {
    cardID?: string;
    quantity?: number;
};
export declare type CollectionCardCreateFormValidationValues = {
    cardID?: ValidationFunction<string>;
    quantity?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CollectionCardCreateFormOverridesProps = {
    CollectionCardCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    cardID?: PrimitiveOverrideProps<TextFieldProps>;
    quantity?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CollectionCardCreateFormProps = React.PropsWithChildren<{
    overrides?: CollectionCardCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CollectionCardCreateFormInputValues) => CollectionCardCreateFormInputValues;
    onSuccess?: (fields: CollectionCardCreateFormInputValues) => void;
    onError?: (fields: CollectionCardCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CollectionCardCreateFormInputValues) => CollectionCardCreateFormInputValues;
    onValidate?: CollectionCardCreateFormValidationValues;
} & React.CSSProperties>;
export default function CollectionCardCreateForm(props: CollectionCardCreateFormProps): React.ReactElement;
