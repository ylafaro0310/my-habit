import React from 'react';
import styled from 'styled-components';

const StyledCard: React.FC = ({ children }) => <Card>{children}</Card>;

const Card = styled.div`
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgb(0, 0, 0, 0.2);
  padding: 0.1rem;
  margin-bottom: 0.5em;
`;

export default StyledCard;
