import React from "react";
import { Flex, Input, Label, Textarea } from "theme-ui";

const InputField = ({
  placeholder,
  inputType,
  value,
  handleChange,
  min,
  type,
}) => {
  switch (type) {
    case "input":
      return (
        <Input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          variant="forms.input.inputForm"
          min={min}
        />
      );
    case "textarea":
      return (
        <Textarea
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          variant="forms.textarea.story"
        />
      );
  }
};
const FormField = ({
  labelName,
  placeholder,
  inputType,
  value,
  handleChange,
  type,
  min,
}) => {
  return (
    <Flex
      sx={{
        flex: "1",
        width: "100%",
        flexDirection: "column",
      }}
    >
      {labelName && <Label variant="forms.label.inputLabel">{labelName}</Label>}
      <InputField
        placeholder={placeholder}
        inputType={inputType}
        value={value}
        handleChange={handleChange}
        type={type}
        min={min}
      />
    </Flex>
  );
};

export default FormField;
