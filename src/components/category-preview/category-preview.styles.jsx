import styled from "styled-components";
import { Link } from "react-router-dom";

export const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;
export const Title = styled(Link)`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;
`;

export const Preview = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr) auto;
  column-gap: 20px;
`;

export const SeeMore = styled(Link)`
  width: 28px;
  font-size: 28px;
  cursor: pointer;
  margin: auto 0;
  opacity: 0.6;

  &:hover {
    opacity: 0.95;
  }
`;
