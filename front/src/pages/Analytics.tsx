import React from 'react';

import dayjs from '../lib/dayjs-ja';
import StyledCard from '../components/Card';

class Analytics extends React.Component {
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
          tr.push(<td></td>);
          continue;
        }
        tr.push(<td>{date.format('DD')}</td>);
        date = date.add(1, 'd');
      }
      tbody.push(<tr>{tr}</tr>);
    }
    return (
      <>
        <div>
          {dayjs()
            .set('month', month)
            .format('YYYY年MM月')}
        </div>
        <table>
          <thead>
            <th>日</th>
            <th>月</th>
            <th>火</th>
            <th>水</th>
            <th>木</th>
            <th>金</th>
            <th>土</th>
          </thead>
          <tbody>{tbody}</tbody>
        </table>
      </>
    );
  }
  render() {
    return <StyledCard>{this.calendar(dayjs().get('month'))}</StyledCard>;
  }
}

export default Analytics;
