import { useState } from "react";

// Components
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import FormFeedbackMessage from "../form-feedback-message/form-feedback-message.component";
import RemoveComponent from "../remove-component/remove-component.component";

// Utilities
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

// Style
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [error, setError] = useState(null);
  const [feedbackType, setFeedbackType] = useState(null);
  const [FormFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = FormFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
    setError(null);
  };

  const signInWithGoogle = async () => {
    setFeedbackType(null);
    try {
      await signInWithGooglePopup();
    } catch (err) {
      console.log(err);
      setFeedbackType("error");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...FormFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedbackType(null);

    // Create user ref in firebase
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
      setFeedbackType("success");
      resetFormFields();
    } catch (err) {
      setFeedbackType("error");
      switch (err.code) {
        case "auth/wrong-password":
          setError("Invalid email or password");
          break;
        case "auth/user-not-found":
          setError("Invalid email or password");
          break;
        default:
          setError("Oups, something bad happened");
      }
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account ?</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit} onClick={() => setError(null)}>
        <FormInput
          label="Email"
          id="email-signin"
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
          id="password-signin"
          inputOptions={{
            type: "password",
            required: true,
            onChange: handleChange,
            name: "password",
            value: password,
          }}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            onClick={() => signInWithGoogle()}
            buttonType="google"
          >
            Google Sign In
          </Button>
        </div>
        {feedbackType && (
          <RemoveComponent delay={10000}>
            <FormFeedbackMessage feedbackType={feedbackType}>
              {feedbackType === "error" ? error : "User successfully logged in"}
            </FormFeedbackMessage>
          </RemoveComponent>
        )}
      </form>
    </div>
  );
};

export default SignInForm;
