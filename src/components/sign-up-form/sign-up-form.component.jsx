import { useState } from "react";

// Components
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import FormFeedbackMessage from "../form-feedback-message/form-feedback-message.component";
import RemoveComponent from "../remove-component/remove-component.component";

// Utilities
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

//Styles
import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [error, setError] = useState(null);
  const [feedbackType, setFeedbackType] = useState(null);
  const [FormFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = FormFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedbackType(null);

    // Check passwords match
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    // Create user ref in firebase
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      // Create user data in firebase database
      await createUserDocumentFromAuth(user, { displayName });
      setFeedbackType("success");
      resetFormFields();
    } catch (err) {
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("This user already exists");
          break;
        case "auth/invalid-email":
          setError("Invalid email");
          break;
        default:
          setError("Oups, something bad happened");
      }
      setFeedbackType("error");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...FormFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account ?</h2>
      <span>Sign up with your email and password</span>

      <form onSubmit={handleSubmit} onClick={() => setFeedbackType(null)}>
        <FormInput
          label="Display Name"
          id="display-name-signup"
          inputOptions={{
            type: "text",
            required: true,
            onChange: handleChange,
            name: "displayName",
            value: displayName,
          }}
        />
        <FormInput
          label="Email"
          id="email-signup"
          inputOptions={{
            type: "email",
            required: true,
            onChange: handleChange,
            name: "email",
            value: email,
          }}
        />
        <FormInput
          label="Password"
          id="password-signup"
          inputOptions={{
            type: "password",
            required: true,
            onChange: handleChange,
            name: "password",
            value: password,
          }}
        />
        <FormInput
          label="Confirm Password"
          id="confirm-password-signup"
          inputOptions={{
            type: "password",
            required: true,
            onChange: handleChange,
            name: "confirmPassword",
            value: confirmPassword,
          }}
        />

        <Button type="submit">Sign Up</Button>
        {feedbackType && (
          <RemoveComponent delay={10000}>
            <FormFeedbackMessage feedbackType={feedbackType}>
              {feedbackType === "error"
                ? error
                : "User account successfully created"}
            </FormFeedbackMessage>
          </RemoveComponent>
        )}
      </form>
    </div>
  );
};

export default SignUpForm;
