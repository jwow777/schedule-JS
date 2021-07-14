export default class DateColumns {
  constructor(data) {
    this._data = data;
  }

  _getTemplateDate() {
    const dateElement = document
      .querySelector("#template-date")
      .content.querySelector(".content__header-block_day")
      .cloneNode(true);
    return dateElement;
  }

  generateDate() {
    this._element = this._getTemplateDate();
    // console.log(this._data);
    // // Добавим данные

    // Вернём элемент наружу
    return this._element;
  }

  // День недели
  // handleChangeDayPerWeek(year, month, day) {
  //   let date = new Date(year, month, day);
  //   let weekday = date.getDay();
  //   if (weekday === 0) {
  //     return "Вс";
  //   } else if (weekday === 1) {
  //     return "Пн";
  //   } else if (weekday === 2) {
  //     return "Вт";
  //   } else if (weekday === 3) {
  //     return "Ср";
  //   } else if (weekday === 4) {
  //     return "Чт";
  //   } else if (weekday === 5) {
  //     return "Пт";
  //   } else if (weekday === 6) {
  //     return "Сб";
  //   }
  // };
}
