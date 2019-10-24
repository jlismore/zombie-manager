import {
  HTMLSelect,
  IHTMLSelectProps,
  IInputGroupProps,
  InputGroup,
  INumericInputProps,
  ITagInputProps,
  ITextAreaProps,
  NumericInput,
  TagInput,
  TagInputAddMethod,
  TextArea
} from "@blueprintjs/core";
import { FastFieldProps, FieldArrayRenderProps, FieldProps } from "formik";
import React from "react";

type FieldTypes<T> = FastFieldProps<T> | FieldProps<T>;
type FieldArrayTypes = FieldArrayRenderProps;

export const FormikSelect = <T extends any = any>({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}: FieldTypes<T> & IHTMLSelectProps) => (
  <div>
    <HTMLSelect {...field} {...props} />
    {touched[field.name] && errors[field.name] && (
      <div className="error">{errors[field.name]}</div>
    )}
  </div>
);

export const FormikInputGroup = <T extends any = any>({
  field,
  form: { touched, errors },
  ...props
}: FieldTypes<T> & IInputGroupProps) => (
  <div>
    <InputGroup {...field} {...props} />
    {touched[field.name] && errors[field.name] && (
      <div className="error">{errors[field.name]}</div>
    )}
  </div>
);

export const FormikTextArea = <T extends any = any>({
  field,
  form: { touched, errors },
  ...props
}: FieldTypes<T> & ITextAreaProps) => (
  <div>
    <TextArea {...field} {...props} />{" "}
    {touched[field.name] && errors[field.name] && (
      <div className="error">{errors[field.name]}</div>
    )}
  </div>
);

export const FormikNumericInput = <T extends any = any>({
  field: { onChange: _onChange, ...restField },
  form: { touched, errors, setFieldValue, setFieldTouched },
  setValueAsString,
  ...props
}: FieldTypes<T> & INumericInputProps & { setValueAsString?: boolean }) => {
  const handleValueChange = (
    valueAsNumber: number,
    valueAsString: string
  ): void => {
    const value = setValueAsString ? valueAsString : valueAsNumber;
    setFieldValue(restField.name, value);
    setFieldTouched(restField.name, true);
  };
  return (
    <div>
      <NumericInput
        {...restField}
        {...props}
        onValueChange={handleValueChange}
      />
      {touched[restField.name] && errors[restField.name] && (
        <div className="error">{errors[restField.name]}</div>
      )}
    </div>
  );
};

export const FormikTagInput = (props: FieldArrayTypes & ITagInputProps) => {
  const { push, remove, form, name, ...restProps } = props;
  const handleAdd = (values: string[], method: TagInputAddMethod) => {
    values.map(value => push(value));
  };
  const handleRemove = (_value: string, index: number) => remove(index);
  return (
    <TagInput
      {...restProps}
      onAdd={handleAdd}
      onRemove={handleRemove}
      values={form.values[name] ? form.values[name] : []}
    />
  );
};
