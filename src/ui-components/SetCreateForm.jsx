/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { createSet } from "../graphql/mutations";
export default function SetCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    releaseType: "",
    releaseOrder: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [releaseType, setReleaseType] = React.useState(
    initialValues.releaseType
  );
  const [releaseOrder, setReleaseOrder] = React.useState(
    initialValues.releaseOrder
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setReleaseType(initialValues.releaseType);
    setReleaseOrder(initialValues.releaseOrder);
    setErrors({});
  };
  const validations = {
    name: [],
    releaseType: [],
    releaseOrder: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name,
          releaseType,
          releaseOrder,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: createSet.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "SetCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              releaseType,
              releaseOrder,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <SelectField
        label="Release type"
        placeholder="Please select an option"
        isDisabled={false}
        value={releaseType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              releaseType: value,
              releaseOrder,
            };
            const result = onChange(modelFields);
            value = result?.releaseType ?? value;
          }
          if (errors.releaseType?.hasError) {
            runValidationTasks("releaseType", value);
          }
          setReleaseType(value);
        }}
        onBlur={() => runValidationTasks("releaseType", releaseType)}
        errorMessage={errors.releaseType?.errorMessage}
        hasError={errors.releaseType?.hasError}
        {...getOverrideProps(overrides, "releaseType")}
      >
        <option
          children="Starter deck"
          value="STARTER_DECK"
          {...getOverrideProps(overrides, "releaseTypeoption0")}
        ></option>
        <option
          children="Booster"
          value="BOOSTER"
          {...getOverrideProps(overrides, "releaseTypeoption1")}
        ></option>
        <option
          children="Promo"
          value="PROMO"
          {...getOverrideProps(overrides, "releaseTypeoption2")}
        ></option>
        <option
          children="Gift set"
          value="GIFT_SET"
          {...getOverrideProps(overrides, "releaseTypeoption3")}
        ></option>
      </SelectField>
      <TextField
        label="Release order"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={releaseOrder}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              releaseType,
              releaseOrder: value,
            };
            const result = onChange(modelFields);
            value = result?.releaseOrder ?? value;
          }
          if (errors.releaseOrder?.hasError) {
            runValidationTasks("releaseOrder", value);
          }
          setReleaseOrder(value);
        }}
        onBlur={() => runValidationTasks("releaseOrder", releaseOrder)}
        errorMessage={errors.releaseOrder?.errorMessage}
        hasError={errors.releaseOrder?.hasError}
        {...getOverrideProps(overrides, "releaseOrder")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
