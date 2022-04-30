import { FormInputLabel, Input, Group } from "./form-input.styles.jsx";

const FormInput = ({ label, id, inputOptions }) => {
  // note: shrink styling when the user has started filling the input
  return (
    <Group>
      <Input id={id} {...inputOptions} />
      {label && (
        <FormInputLabel htmlFor={id} shrink={inputOptions.value.length}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
