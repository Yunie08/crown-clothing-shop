import styled from "styled-components";

export const FeedbackMessage = styled.p`
  color: ${({ feedbackType }) =>
    feedbackType === "error" ? "#ff0033" : "#008000"};
`;
