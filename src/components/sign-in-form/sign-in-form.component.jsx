import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// Components
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component";
import FormFeedbackMessage from "../form-feedback-message/form-feedback-message.component";
import RemoveComponent from "../remove-component/remove-component.component";

// Redux
import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";

// Style
import { SignInContainer, ButtonsContainer } from "./sign-in-form.styles.jsx";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [feedbackType, setFeedbackType] = useState(null);
  const [FormFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = FormFields;
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
    setError(null);
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...FormFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    dispatch(emailSignInStart(email, password));
    // event.preventDefault();
    // setFeedbackType(null);

    // // Create user ref in firebase
    // try {
    //   setFeedbackType("success");
    //   resetFormFields();
    //   setTimeout(navigate("/"), 2000);
    // } catch (err) {
    //   setFeedbackType("error");
    //   switch (err.code) {
    //     case "auth/wrong-password":
    //       setError("Invalid email or password");
    //       break;
    //     case "auth/user-not-found":
    //       setError("Invalid email or password");
    //       break;
    //     default:
    //       setError("Oups, something bad happened");
    //   }
    // }
  };

  return (
    <SignInContainer>
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
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            onClick={() => signInWithGoogle()}
            buttonType={BUTTON_TYPES_CLASSES.google}
          >
            Google Sign In
          </Button>
        </ButtonsContainer>
        {feedbackType && (
          <RemoveComponent delay={10000}>
            <FormFeedbackMessage feedbackType={feedbackType}>
              {feedbackType === "error" ? error : "User successfully logged in"}
            </FormFeedbackMessage>
          </RemoveComponent>
        )}
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
