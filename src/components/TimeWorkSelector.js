export default class TimeWorkSelector {
  constructor(data, stateForm, userId, name, userRow, userWorkDays) {
    this._data = data;
    this._day = data[0];
    this._time = data[1];
    this._stateForm = stateForm;
    this._userId = userId;
    this._name = name;
    this._userRow = userRow;
    this._userWorkDays = userWorkDays;
  }

  _getTemplateSelector() {
    const selectElement = document
      .querySelector("#template")
      .content.querySelector(".content__users-block_body")
      .cloneNode(true);

    return selectElement;
  }

  generateSelector() {
    this._element = this._getTemplateSelector();
    this._selectCurrent = this._element.querySelector(".select__current");
    this._selectList = this._element.querySelector(".select__list");
    this._selectInput = this._element.querySelector(".select__input");
    this._selectItem = [...this._element.querySelectorAll(".select__item")];
    this._selectItemEmpty = this._selectList.querySelector(".select__item_empty");
    this._selectItemRed = this._selectList.querySelector(".select__item_red");
    this._selectItemYellow = this._selectList.querySelector(".select__item_yellow");
    this._selectItemPurple = this._selectList.querySelector(".select__item_purple");
    this._selectItemBlue = this._selectList.querySelector(".select__item_blue");
    this._selectItemGreen = this._selectList.querySelector(".select__item_green");
    this._selectCurrentButtonAtList = this._element.querySelector(".select__item_current");
    // Вставляю данные с сервера
    this._selectInput.setAttribute("data-day", this._day);
    this._selectInput.setAttribute("data-id", this._userId);
    this._selectInput.setAttribute("data-name", this._name);
    this._selectInput.value = this._time;
    this._selectCurrent.setAttribute("data-value", this._time);
    this._selectCurrent.textContent = this._time;

    this._setEventListeners();

    // Добавим данные
    if (this._selectCurrent.getAttribute("data-value") === '') {
      this._selectCurrent.classList.add(`select__item_empty`);
      this._selectCurrent.setAttribute("data-color", "empty");
    }
    // Вставляю данные из настроек
    this._selectItemRed.textContent = `${this._stateForm.timeRed.start}-${this._stateForm.timeRed.end}`;
    this._selectItemYellow.textContent = `${this._stateForm.timeYellow.start}-${this._stateForm.timeYellow.end}`;
    this._selectItemPurple.textContent = `${this._stateForm.timePurple.start}-${this._stateForm.timePurple.end}`;
    this._selectItemBlue.textContent = `${this._stateForm.timeBlue.start}-${this._stateForm.timeBlue.end}`;
    this._selectItemGreen.textContent = `${this._stateForm.timeGreen.start}-${this._stateForm.timeGreen.end}`;
    
    this._selectItemRed.setAttribute("data-value", `${this._stateForm.timeRed.start}-${this._stateForm.timeRed.end}`);
    this._selectItemYellow.setAttribute("data-value", `${this._stateForm.timeYellow.start}-${this._stateForm.timeYellow.end}`);
    this._selectItemPurple.setAttribute("data-value", `${this._stateForm.timePurple.start}-${this._stateForm.timePurple.end}`);
    this._selectItemBlue.setAttribute("data-value", `${this._stateForm.timeBlue.start}-${this._stateForm.timeBlue.end}`);
    this._selectItemGreen.setAttribute("data-value", `${this._stateForm.timeGreen.start}-${this._stateForm.timeGreen.end}`);

    // Сравниваю данные из настроек и селектор
    if (this._selectCurrent.getAttribute("data-value") !== '') {
      if (this._selectCurrent.getAttribute("data-value") === `${this._stateForm.timeRed.start}-${this._stateForm.timeRed.end}`) {
        this._selectInput.setAttribute("data-color", "red");
        this._selectCurrent.setAttribute("data-color", "red");
        this._selectCurrent.classList.add(`select__item_red`);
      } else if (this._selectCurrent.getAttribute("data-value") === `${this._stateForm.timeYellow.start}-${this._stateForm.timeYellow.end}`) {
        this._selectInput.setAttribute("data-color", "yellow");
        this._selectCurrent.setAttribute("data-color", "yellow");
        this._selectCurrent.classList.add(`select__item_yellow`);        
      } else if (this._selectCurrent.getAttribute("data-value") === `${this._stateForm.timePurple.start}-${this._stateForm.timePurple.end}`) {
        this._selectInput.setAttribute("data-color", "purple");
        this._selectCurrent.setAttribute("data-color", "purple");
        this._selectCurrent.classList.add(`select__item_purple`);        
      } else if (this._selectCurrent.getAttribute("data-value") === `${this._stateForm.timeBlue.start}-${this._stateForm.timeBlue.end}`) {
        this._selectInput.setAttribute("data-color", "blue");
        this._selectCurrent.setAttribute("data-color", "blue");
        this._selectCurrent.classList.add(`select__item_blue`);        
      } else if (this._selectCurrent.getAttribute("data-value") === `${this._stateForm.timeGreen.start}-${this._stateForm.timeGreen.end}`) {
        this._selectInput.setAttribute("data-color", "green");
        this._selectCurrent.setAttribute("data-color", "green");
        this._selectCurrent.classList.add(`select__item_green`);        
      } else {
        return
      }
    }

    // Вернём элемент наружу
    return this._element;
  }

  _handleSelectOpen() {
    this._selectList.classList.add("select__list_show");
    let currentButtonItemValue = this._selectCurrent.getAttribute("data-value");
    let currentButtonItemColor = this._selectCurrent.getAttribute("data-color");
    let currentButtonClass = this._selectCurrent.className.split(" ")[1];
    let currentButtonText = this._selectCurrent.textContent;
    this._handleRemoveClasses(this._selectCurrentButtonAtList);
    // Вставляю текущие данные в список
    this._selectCurrentButtonAtList.classList.add(currentButtonClass);
    this._selectCurrentButtonAtList.textContent = currentButtonText;
    this._selectCurrentButtonAtList.setAttribute("data-value", `${currentButtonItemValue}`);
    this._selectCurrentButtonAtList.setAttribute("data-color", `${currentButtonItemColor}`);
  }

  _selectListHide() {
    this._selectList.classList.remove("select__list_show");
  }

  _handleRemoveClasses(elem) {
    elem.classList.remove(
      "select__item_empty",
      "select__item_red",
      "select__item_yellow",
      "select__item_purple",
      "select__item_blue",
      "select__item_green"
    );
  }

  _setEventListeners() {
    this._selectCurrent.addEventListener("click", () => {
      this._handleSelectOpen();
    });

    this._selectItem.forEach((item) => {
      // обрабатываем событие клик по элементу
      item.addEventListener("click", () => {
        let itemValue = item.getAttribute("data-value");
        let itemColor = item.getAttribute("data-color");
        let itemText = item.textContent;
        this._selectInput.value = itemValue;
        this._selectInput.setAttribute("data-color", `${itemColor}`);
        this._handleRemoveClasses(this._selectCurrent);
        this._selectCurrent.classList.add(`select__item_${itemColor}`);
        this._selectCurrent.textContent = itemText;
        this._selectCurrent.setAttribute("data-value", `${itemValue}`);
        this._selectCurrent.setAttribute("data-color", `${itemColor}`);
      
        this._userWorkDays.textContent = [...this._userRow.querySelectorAll('*:not(.select__item_empty).select__current')].length;
        this._selectListHide();
      });
    });

    document.addEventListener("mouseup", (e) => {
      if (!this._selectList.contains(e.target)) this._selectListHide();
    });
  }
}
