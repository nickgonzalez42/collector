/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps } from "@aws-amplify/ui-react";
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
export declare type CollectionUpdateFormInputValues = {};
export declare type CollectionUpdateFormValidationValues = {};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CollectionUpdateFormOverridesProps = {
    CollectionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
} & EscapeHatchProps;
export declare type CollectionUpdateFormProps = React.PropsWithChildren<{
    overrides?: CollectionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    collection?: any;
    onSubmit?: (fields: CollectionUpdateFormInputValues) => CollectionUpdateFormInputValues;
    onSuccess?: (fields: CollectionUpdateFormInputValues) => void;
    onError?: (fields: CollectionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CollectionUpdateFormInputValues) => CollectionUpdateFormInputValues;
    onValidate?: CollectionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CollectionUpdateForm(props: CollectionUpdateFormProps): React.ReactElement;
