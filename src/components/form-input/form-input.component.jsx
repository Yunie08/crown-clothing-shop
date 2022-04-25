import "./form-input.styles.scss";

const FormInput = ({ label, id, inputOptions }) => {
  return (
    <div className="group">
      <input id={id} {...inputOptions} className="form-input" />
      {label && (
        <label
          htmlFor={id}
          className={`${
            inputOptions.value.length && "shrink"
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
