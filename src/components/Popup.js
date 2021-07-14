export default class Popup {
  constructor(popupSelector, handleSubmitForm) {
    this._popupSelector = popupSelector;
    this._popupForm = this._popupSelector.querySelector(".popup__form");
    this._inputList = [...this._popupForm.querySelectorAll(".popup__input")];
    this._buttonCancel = this._popupSelector.querySelector(
      ".popup__button-form_cancel"
    );
    this._handleSubmitForm = handleSubmitForm;
    this._handleClickCancel = this._handleClickCancel.bind(this);
  }

  open() {
    this._popupSelector.classList.add("popup_opened");
    this._buttonCancel.addEventListener("click", this._handleClickCancel);
  }

  close() {
    this._popupSelector.classList.remove("popup_opened");
    this._buttonCancel.removeEventListener("click", this._handleClickCancel);
  }

  _handleClickCancel(evt) {
    if (evt.target === this._buttonCancel) this.close();
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );
    return this._formValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }
}
