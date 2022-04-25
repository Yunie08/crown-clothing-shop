import { useState } from "react";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUphtmlForm = () => {
  const [error, setError] = useState(null);
  const [htmlFormFields, sethtmlFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = htmlFormFields;

  const resetFormFields = () => {
    sethtmlFormFields(defaultFormFields);
    setError(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      resetFormFields();
    } catch (err) {
      console.log(err.code);
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
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    sethtmlFormFields({ ...htmlFormFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account ?</h2>
      <span>Sign up with your email and password</span>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} onClick={() => setError(null)}>
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
            type: "text",
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
            type: "text",
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
            type: "text",
            required: true,
            onChange: handleChange,
            name: "confirmPassword",
            value: confirmPassword,
          }}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUphtmlForm;
