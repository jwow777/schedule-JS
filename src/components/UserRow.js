import TimeWorkSelector from "./TimeWorkSelector";

export default class UserRow {
  constructor(data, stateForm) {
    this._data = data[1].date;
    this._stateForm = stateForm;
    this._name = data[1].name;
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
    Object.entries(this._data).forEach((dataDayUser) => {
      const select = new TimeWorkSelector(dataDayUser, this._stateForm);
      const selectElement = select.generateSelector();
      // Добавляем в DOM
      this._element.append(selectElement);
    });
    this._username = this._element.querySelector(".content__users-title_name");
    // // Добавим данные
    this._username.textContent = this._name;
    // Вернём элемент наружу
    return this._element;
  }
}
