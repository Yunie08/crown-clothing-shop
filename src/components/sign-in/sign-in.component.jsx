import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../sign-up-form/sign-up-form.component";

const SignIn = () => {
  const logGoogleUser = async () => {
    try {
      // user is he only data we are interested in here
      const { user } = await signInWithGooglePopup();
      await createUserDocumentFromAuth(user);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={() => logGoogleUser()}>Sign in with Google</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
