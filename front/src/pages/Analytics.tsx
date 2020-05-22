import React from 'react';
import styled from 'styled-components';

import dayjs from '../lib/dayjs-ja';
import StyledCard from '../components/Card';

type AnalyticsState = {
  month: number;
};
class Analytics extends React.Component<{}, AnalyticsState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      month: Number(dayjs().format('M')),
    };
    this.onChangeMongh = this.onChangeMongh.bind(this);
  }

  onChangeMongh(add = true): void {
    const { month } = this.state;
    if (add) {
      this.setState({ month: month + 1 });
    } else {
      this.setState({ month: month - 1 });
    }
  }

  calendar(month: number) {
    const dateMonth = dayjs().set('month', month);
    const startOfDay = dateMonth.startOf('month');
    const endOfDay = dateMonth.endOf('month');
    let date = dateMonth.startOf('month');
    let tr = [];
    const tbody = [];
    for (let i = 0; !date.isAfter(endOfDay); i++) {
      tr = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < startOfDay.day()) || date.isAfter(endOfDay)) {
          tr.push(<td align='center' key={j}></td>);
          continue;
        }
        tr.push(
          <td align='center' key={j}>
            {date.format('D')}
          </td>,
        );
        date = date.add(1, 'd');
      }
      tbody.push(<tr key={i}>{tr}</tr>);
    }
    return (
      <>
        <Header>
          <div
            onClick={() => {
              this.onChangeMongh(false);
            }}
          >
            <span className='fas fa-angle-left' />
          </div>
          <div>
            {dayjs()
              .set('month', month)
              .format('YYYY年MM月')}
          </div>
          <div
            onClick={() => {
              this.onChangeMongh(true);
            }}
          >
            <span className='fas fa-angle-right' />
          </div>
        </Header>
        <Table>
          <thead>
            <tr>
              <th>日</th>
              <th>月</th>
              <th>火</th>
              <th>水</th>
              <th>木</th>
              <th>金</th>
              <th>土</th>
            </tr>
          </thead>
          <tbody>{tbody}</tbody>
        </Table>
      </>
    );
  }
  render() {
    return <StyledCard>{this.calendar(this.state.month - 1)}</StyledCard>;
  }
}

export default Analytics;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  &:nth-child(1),
  :nth-child(3) {
    cursor: pointer;
  }
`;

const Table = styled.table`
  width: 70%;
  margin: 0 auto;
  & td {
    width: 2rem;
    height: 2rem;
    background: #55f;
    border-radius: 0%;
    content: '';
  }
`;
