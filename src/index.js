import './styles.css';
// import Api from "./components/Api.js";
import dataJule from "./utils/api";
import Popup from "./components/Popup";
import TimeWorkSelector from "./components/TimeWorkSelector";
import UserRow from "./components/UserRow";
// import DateColumns from "./components/DateColumns";
import {
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
} from "./utils/constants";
import dateJule from './utils/api';

// const api = new Api({
//   baseUrl: "https://scripts.qexsystems.ru"
// });

let stateForm = {
  timeRed: {
    start: "06:00",
    end: "17:00"
  },
  timeYellow: {
    start: "11:00",
    end: "17:00"
  },
  timePurple: {
    start: "10:00",
    end: "17:00"
  },
  timeBlue: {
    start: "09:00",
    end: "17:00"
  },
  timeGreen: {
    start: "08:00",
    end: "17:00"
  }
};

// Вставляем дефолтные значения времени в инпуты времени в попапе настроек
inputTimeRedStart.value = stateForm.timeRed.start;
inputTimeRedEnd.value = stateForm.timeRed.end;
inputTimeYellowStart.value = stateForm.timeYellow.start;
inputTimeYellowEnd.value = stateForm.timeYellow.end;
inputTimePurpleStart.value = stateForm.timePurple.start;
inputTimePurpleEnd.value = stateForm.timePurple.end;
inputTimeBlueStart.value = stateForm.timeBlue.start;
inputTimeBlueEnd.value = stateForm.timeBlue.end;
inputTimeGreenStart.value = stateForm.timeGreen.start;
inputTimeGreenEnd.value = stateForm.timeGreen.end;

let currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth();
let day = currentDate.getDate();
let daysPerMonth;
let monthWord = currentDate.toLocaleString("ru", { month: "long" });

// const data = api.getUsersInfo(
//   `${month + 1 < 10 ? `0${month}` : month}.${year}`
// );

// console.log(dataJule);

const settingsPopup = new Popup(
  settingsPopupSelector,
  // Форма отправки в попапе настроек
  function handleSubmitForm(data) {
    stateForm = {
      ...stateForm,
      timeRed: {
        ...stateForm.timeRed,
        start: data.redStart,
        end: data.redEnd
      },
      timeYellow: {
        ...stateForm.timeYellow,
        start: data.yellowStart,
        end: data.yellowEnd
      },
      timePurple: {
        ...stateForm.timePurple,
        start: data.purpleStart,
        end: data.purpleEnd
      },
      timeBlue: {
        ...stateForm.timeBlue,
        start: data.blueStart,
        end: data.blueEnd
      },
      timeGreen: {
        ...stateForm.timeGreen,
        start: data.greenStart,
        end: data.greenEnd
      }
    };
    ['red', 'yellow', 'purple', 'blue', 'green'].forEach((item) => {
      handleChangeTimeAtTable(item);
    });
    this.close();
  }
);

const handleChangeTimeAtTable = (color) => {
  const colorSelector = [...contentForm.querySelectorAll(`div[data-color=${color}]`)];
  const input = [...contentForm.querySelectorAll(`.select__input[data-color=${color}]`)];
  colorSelector.forEach((item) => {
    if (color === 'red') {
      item.textContent = `${stateForm.timeRed.start}-${stateForm.timeRed.end}`;
      item.setAttribute("data-value", `${stateForm.timeRed.start}-${stateForm.timeRed.end}`);      
    } else if (color === 'yellow') {
      item.textContent = `${stateForm.timeYellow.start}-${stateForm.timeYellow.end}`;
      item.setAttribute("data-value", `${stateForm.timeYellow.start}-${stateForm.timeYellow.end}`);      
    } else if (color === 'purple') {
      item.textContent = `${stateForm.timePurple.start}-${stateForm.timePurple.end}`;
      item.setAttribute("data-value", `${stateForm.timePurple.start}-${stateForm.timePurple.end}`);      
    } else if (color === 'blue') {
      item.textContent = `${stateForm.timeBlue.start}-${stateForm.timeBlue.end}`;
      item.setAttribute("data-value", `${stateForm.timeBlue.start}-${stateForm.timeBlue.end}`);      
    } else if (color === 'green') {
      item.textContent = `${stateForm.timeGreen.start}-${stateForm.timeGreen.end}`;
      item.setAttribute("data-value", `${stateForm.timeGreen.start}-${stateForm.timeGreen.end}`);      
    }
  });
  input.forEach((item) => {
    const currentValue = item.closest('.select').querySelector('.select__current');
    item.value = currentValue.getAttribute('data-value');
    console.log(currentValue);
  })
}

// Месяц с заглавной буквы
const firstCharacter = (str) => {
  return (monthWord = str[0].toUpperCase() + str.slice(1));
};

// Открытие попапа с настройками
const openSettings = () => settingsPopup.open();

// Проверка на високосный год
const isLeapYear = (year) => {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
};

// Количество дней в месяце
const handleChangeDaysPerMonth = (month, year) => {
  if (
    month === 0 ||
    month === 2 ||
    month === 4 ||
    month === 6 ||
    month === 7 ||
    month === 9 ||
    month === 11
  ) {
    return (daysPerMonth = 31);
  } else if (month === 3 || month === 5 || month === 8 || month === 10) {
    return (daysPerMonth = 30);
  } else {
    isLeapYear(year) ? (daysPerMonth = 29) : (daysPerMonth = 28);
  }
};

// День недели
const handleChangeDayPerWeek = (year, month, day) => {
  let date = new Date(year, month, day);
  let weekday = date.getDay();
  if (weekday === 0) {
    return "Вс";
  } else if (weekday === 1) {
    return "Пн";
  } else if (weekday === 2) {
    return "Вт";
  } else if (weekday === 3) {
    return "Ср";
  } else if (weekday === 4) {
    return "Чт";
  } else if (weekday === 5) {
    return "Пт";
  } else if (weekday === 6) {
    return "Сб";
  }
};

// Добавление колонок с датой
const createColumnsOfDay = (daysPerMonth, month, year) => {
  let currentMonth = month + 1;
  for (let day = 1; day <= daysPerMonth; day++) {
    contentHeader.insertAdjacentHTML(
      "beforeend",
      `<div class="content__header-block content__header-block_day">
        <p class="content__header-title content__header-title_month">
        ${day}.${currentMonth < 10 ? `0${currentMonth}` : currentMonth}</p>
        <p class="content__header-title content__header-title_day-of-week">${handleChangeDayPerWeek(
          year,
          month,
          day
        )}</p>
      </div>`
    );
  }
};

const userList = (dataMonth) => {
  Object.entries(dataMonth).forEach((dataUser) => {
    const user = new UserRow(dataUser, stateForm);
    const userElement = user.generateSelector();
    // Добавляем в DOM
    contentForm.append(userElement);
  })
}

// Удаление старых колонок с датами
const removeOldDays = () => {
  let arrayColumns = document.querySelectorAll(".content__header-block_day");
  for (let i = 0; i < arrayColumns.length; i++) {
    arrayColumns[i].remove();
  }
};

const removeOldWorks = () => {
  let arrayColumns = document.querySelectorAll(".content__users");
  for (let i = 0; i < arrayColumns.length; i++) {
    arrayColumns[i].remove();
  }
};

const bodyHead = (year, month, day) => {
  removeOldDays();
  removeOldWorks();
  currentDate = new Date(year, month, day);
  monthWord = currentDate.toLocaleString("ru", { month: "long" });
  firstCharacter(monthWord);
  dataTextSeletor.textContent = `${monthWord} ${year}`;
  handleChangeDaysPerMonth(month, year);
  createColumnsOfDay(daysPerMonth, month, year);
  userList(dateJule, stateForm);
};

// Переключение на пред месяц
const handleChangePrevMonth = () => {
  if (month === 0) {
    month = 11;
    year = year - 1;
    bodyHead(year, month, day);
  } else {
    month = month - 1;
    bodyHead(year, month, day);
  }
};

// Переключение на след месяц
const handleChangeNextMonth = () => {
  if (month === 11) {
    month = 0;
    year = year + 1;
    bodyHead(year, month, day);
  } else {
    month = month + 1;
    bodyHead(year, month, day);
  }
};

firstCharacter(monthWord);
dataTextSeletor.textContent = `${monthWord} ${year}`;
handleChangeDaysPerMonth(month, year);
createColumnsOfDay(daysPerMonth, month, year);
userList(dateJule, stateForm);

settingsPopup.setEventListeners();
prevMonthButton.addEventListener("click", handleChangePrevMonth);
nextMonthButton.addEventListener("click", handleChangeNextMonth);
settingsButton.addEventListener("click", openSettings);
