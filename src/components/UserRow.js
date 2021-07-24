import TimeWorkSelector from "./TimeWorkSelector";

export default class UserRow {
  constructor(data, stateForm) {
    this._data = data;
    this._dataUserWork = data[1].date;
    this._stateForm = stateForm;
    this._name = data[1].name;
    this._userId = data[0];
    this._counter = Object.entries(this._dataUserWork).filter(arrDay => arrDay[1] !== '').length;
  }

  _getTemplate() {
    const userElement = document
      .querySelector("#template-user")
      .content.querySelector(".content__users")
      .cloneNode(true);

    return userElement;
  }

  generateSelector() {
    this._element = this._getTemplate();
    
    this._username = this._element.querySelector(".content__users-title_name");
    this._userWorkDays = this._element.querySelector(".content__users-title_number");
    // // Добавим данные
    this._username.textContent = this._name;
    this._userWorkDays.textContent = this._counter;

    Object.entries(this._dataUserWork).forEach((dataDayUser) => {
      const select = new TimeWorkSelector(dataDayUser, this._stateForm, this._userId, this._name, this._element, this._userWorkDays);
      const selectElement = select.generateSelector();
      // Добавляем в DOM
      this._element.append(selectElement);
    });
    // Вернём элемент наружу
    return this._element;
  }
}
