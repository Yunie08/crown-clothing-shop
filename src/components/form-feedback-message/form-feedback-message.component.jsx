import { FeedbackMessage } from "./form-feedback-message.styles.jsx";

const FormFeedbackMessage = ({ feedbackType, children }) => {
  return (
    feedbackType && (
      <FeedbackMessage feedbackType={feedbackType}>{children}</FeedbackMessage>
    )
  );
};

export default FormFeedbackMessage;
