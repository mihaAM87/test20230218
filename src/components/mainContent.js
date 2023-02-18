import React, { useContext, Component } from 'react';
import { fetchAllContent } from '../store/actions/contentSrc';
import { useDispatch, useStore, connect } from 'react-redux';
import moment from 'moment';

const withRouter = (WrappedComponent) => (props) => {
  // etc... other react-router-dom v6 hooks

  return (
    <WrappedComponent
      {...props}
      // etc...
    />
  );
};

class MainContent extends Component {
  state = {
    reasponse: [],
    sportType: null,
    show: null,
  };

  // Перед отрисовкой интерфейса, инициализация входных данных из Redux
  UNSAFE_componentWillMount() {
    this.props.onFetchAllContent();
  }

  render() {
    let { response } = this.props;
    response = response || [];

    const mainDiv = [];

    mainDiv.push('container');

    moment.locale();
    let uniqueDates = [];
    let uniqueDatesArr = [];
    let errorCountArr = [];
    let timeCountArr = [];

    const dateFormat = function (date) {
      return moment(date, 'DD.MM.YYYY HH:mm:ss');
    };

    const dateShort = function (date) {
      return date.format('DD.MM.YYYY');
    };

    const dateDisplay = function (date) {
      return `"${date}"`;
    };

    response.forEach((element) => {
      const dateShortEl = dateShort(dateFormat(element.start));
      if (!uniqueDates.find((element1) => dateShortEl == element1)) {
        uniqueDates.push(dateShortEl);
      }
    });

    uniqueDatesArr = uniqueDates.map(function (element) {
      const start = dateDisplay(element);
      return start;
    });

    errorCountArr = uniqueDates.map((item1) =>
      response
        .filter((item2) => item1 === dateShort(dateFormat(item2.start)))
        .map(function (item2) {
          const count = item2.exam.filter(
            (item3) => item3.examInfoCheck == 0
          ).length;
          return count;
        })
        .reduce((sum, current) => sum + current, 0)
    );

    timeCountArr = uniqueDates
      .map((item1) =>
        response
          .filter((item2) => item1 === item2.start)
          .map(function (item2) {
            const formatedDateStart = dateFormat(item2.start);
            const formatedDateFinish = dateFormat(item2.finish);

            return moment.range(formatedDateFinish, formatedDateStart);
          })
          .reduce((sum, current) => sum + current, 0)
      )
      .map((element) => dateDisplay(moment(element).format('HH:mm:ss')));

    return (
      <div className="row">
        <h1>Тестовое задание</h1>
        <h2>
          1. Нужно сформировать массив уникальных дат (вычленить из поля start)
        </h2>
        <h2 id="uniqueDates">{`[${uniqueDatesArr.join(', ')}]`}</h2>
        <h2>
          2. Подсчитать количество ошибок для каждой даты (получить массив
          элементов, каждый из которых - количество ошибок, совершенных в
          соответствующий день). Ошибка определяется, когда поле examInfoCheck
          равно 0.
        </h2>
        <h2 id="errorCount">{`[${errorCountArr.join(', ')}]`}</h2>
        <h2>
          Дополнительное задание с применением библиотеки Moment.js (Не
          приступайте к выполнению этого задания и не тратьте время, если не
          имеете чёткого понимания решения) Для каждой даты подсчитайте
          количество потраченного времени (разница между полями start и finish)
        </h2>
        <h2 id="timeCount">{`[${timeCountArr.join(', ')}]`}</h2>
      </div>
    );
  }
}

// Регистрация параметров Redux
function mapStateToProps(state) {
  return {
    response: state.content.response,
  };
}

// Регистрация функций Redux
function mapDiaspatchToProps(dispatch) {
  return {
    onFetchAllContent: () => dispatch(fetchAllContent()),
  };
}

// // Вывод Основного компонента с подключённым к нему Redux
export default withRouter(
  connect(mapStateToProps, mapDiaspatchToProps)(MainContent)
);
