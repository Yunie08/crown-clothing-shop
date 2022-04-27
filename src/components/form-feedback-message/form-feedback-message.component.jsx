import "./form-feedback-message.styles.scss";

const FEEDBACK_TYPES = {
  error: "error",
  success: "success",
};

const FormFeedbackMessage = ({ feedbackType, children }) => {
  return (
    feedbackType && (
      <p className={`feedback-message ${FEEDBACK_TYPES[feedbackType]}`}>
        {children}
      </p>
    )
  );
};

export default FormFeedbackMessage;
