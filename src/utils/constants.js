const dataTextSeletor = document.querySelector(".header__data-text");
const prevMonthButton = document.querySelector(".header__data-button_prev");
const nextMonthButton = document.querySelector(".header__data-button_next");
const settingsPopupSelector = document.querySelector(".popup");
const settingsButton = document.querySelector(".header__button-settings");
const contentForm = document.querySelector(".content__form");
const contentHeader = document.querySelector(".content__header");
const contentBody = document.querySelector(".content__users");

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

const username = document.querySelector(".content__users-title_name");

export {
  dataTextSeletor,
  prevMonthButton,
  nextMonthButton,
  settingsPopupSelector,
  settingsButton,
  contentForm,
  contentHeader,
  contentBody,
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
  username
};
