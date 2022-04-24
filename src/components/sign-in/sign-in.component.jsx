import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    try {
      // user is he only data we are interested in here
      const { user } = await signInWithGooglePopup();
      const userDocRef = await createUserDocumentFromAuth(user);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={() => logGoogleUser()}>Sign in with Google</button>
    </div>
  );
};

export default SignIn;
