import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type HabitHeaderProps = {
  habitName: string;
  backTo: string;
  nextTo?: string;
};
const HabitHeader: React.FC<HabitHeaderProps> = ({
  habitName,
  backTo,
  nextTo,
}) => (
  <Header>
    <HeaderLeft>
      <Link to={backTo}>
        <span className='fas fa-angle-left' />
      </Link>
    </HeaderLeft>
    <Title>{habitName}</Title>
    <HeaderRight>
      {nextTo ? (
        <Link to={nextTo}>
          <span className='fas fa-edit' />
        </Link>
      ) : null}
    </HeaderRight>
  </Header>
);
export default HabitHeader;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  height: 2rem;
  background: #fff;
  margin-bottom: 5px;
  border-bottom: 1px solid #ddd;

  & a {
    text-decoration: none;
  }
  & a,
  a:visited {
    color: black;
  }
`;

const HeaderLeft = styled.div`
  width: 3rem;
  padding-left: 1rem;
  padding-top: 0.2rem;
`;

const Title = styled.div`
  font-size: large;
  font-weight: bold;
`;

const HeaderRight = styled.div`
  width: 2.5rem;
  padding-top: 0.2rem;
`;
