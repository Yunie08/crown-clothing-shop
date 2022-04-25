import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [error, setError] = useState(null);
  const [FormFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = FormFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
    setError(null);
  };

  const signInWithGoogle = async () => {
    try {
      // user is he only data we are interested in here
      const { user } = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...FormFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create user ref in firebase
    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          setError("Wrong email or password");
          break;
        default:
          setError("Oups, something bad happened");
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account ?</h2>
      <span>Sign up with your email and password</span>

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
          id="password-signup"
          inputOptions={{
            type: "password",
            required: true,
            onChange: handleChange,
            name: "password",
            value: password,
          }}
        />
        {error && <p>{error}</p>}
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
      </form>
    </div>
  );
};

export default SignInForm;
