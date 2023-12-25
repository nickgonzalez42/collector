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
export declare type CollectionCardUpdateFormInputValues = {
    cardID?: string;
    quantity?: number;
    setID?: string;
};
export declare type CollectionCardUpdateFormValidationValues = {
    cardID?: ValidationFunction<string>;
    quantity?: ValidationFunction<number>;
    setID?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CollectionCardUpdateFormOverridesProps = {
    CollectionCardUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    cardID?: PrimitiveOverrideProps<TextFieldProps>;
    quantity?: PrimitiveOverrideProps<TextFieldProps>;
    setID?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CollectionCardUpdateFormProps = React.PropsWithChildren<{
    overrides?: CollectionCardUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    collectionCard?: any;
    onSubmit?: (fields: CollectionCardUpdateFormInputValues) => CollectionCardUpdateFormInputValues;
    onSuccess?: (fields: CollectionCardUpdateFormInputValues) => void;
    onError?: (fields: CollectionCardUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CollectionCardUpdateFormInputValues) => CollectionCardUpdateFormInputValues;
    onValidate?: CollectionCardUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CollectionCardUpdateForm(props: CollectionCardUpdateFormProps): React.ReactElement;
