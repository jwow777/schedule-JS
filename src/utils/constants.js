const dataTextSeletor = document.querySelector(".header__data-text");
const prevMonthButton = document.querySelector(".header__data-button_prev");
const nextMonthButton = document.querySelector(".header__data-button_next");
const settingsPopupSelector = document.querySelector(".popup");
const saveButton = document.querySelector(".header__button_save");
const settingsButton = document.querySelector(".header__button_settings");
const contentForm = document.querySelector(".content__form");
const contentHeader = document.querySelector(".content__header");

const popupForm = document.querySelector(".popup__form");
const inputTimeRedStart = popupForm.querySelector("input[name='redStart']");
const inputTimeRedEnd = popupForm.querySelector("input[name='redEnd']");
const inputTimeYellowStart = popupForm.querySelector(
  "input[name='yellowStart']"
);
const inputTimeYellowEnd = popupForm.querySelector("input[name='yellowEnd']");
const inputTimePurpleStart = popupForm.querySelector(
  "input[name='purpleStart']"
);
const inputTimePurpleEnd = popupForm.querySelector("input[name='purpleEnd']");
const inputTimeBlueStart = popupForm.querySelector("input[name='blueStart']");
const inputTimeBlueEnd = popupForm.querySelector("input[name='blueEnd']");
const inputTimeGreenStart = popupForm.querySelector("input[name='greenStart']");
const inputTimeGreenEnd = popupForm.querySelector("input[name='greenEnd']");

export {
  dataTextSeletor,
  prevMonthButton,
  nextMonthButton,
  settingsPopupSelector,
  saveButton,
  settingsButton,
  contentForm,
  contentHeader,
  inputTimeRedStart,
  inputTimeRedEnd,
  inputTimeYellowStart,
  inputTimeYellowEnd,
  inputTimePurpleStart,
  inputTimePurpleEnd,
  inputTimeBlueStart,
  inputTimeBlueEnd,
  inputTimeGreenStart,
  inputTimeGreenEnd,
};
