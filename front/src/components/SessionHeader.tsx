import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type SessionHeaderProps = {
  habitName: string;
  backTo: string;
  nextTo?: string;
};
const SessionHeader: React.FC<SessionHeaderProps> = ({
  habitName,
  backTo,
  nextTo,
}) => (
  <Header>
    <Link to={backTo}>戻る</Link>
    <Title>{habitName}</Title>
    <div>{nextTo ? <Link to={nextTo}>新規追加</Link> : null}</div>
  </Header>
);
export default SessionHeader;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 2rem;

  & a {
    text-decoration: none;
  }
  & a,
  a:visited {
    color: black;
  }
`;

const Title = styled.div`
  font-size: large;
  font-weight: bold;
`;
