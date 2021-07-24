import './styles.css';
import Api from "./components/Api.js";
import Popup from "./components/Popup";
import UserRow from "./components/UserRow";
import {
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
  inputTimeGreenEnd
} from "./utils/constants";

let currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth();
let currentMonth = month + 1 < 10 ? `0${month + 1}` : month + 1;
let currentYear = currentDate.getFullYear();
let day = currentDate.getDate();
let daysPerMonth;
let monthWord = currentDate.toLocaleString("ru", { month: "long" });

const api = new Api({
  baseUrl: "https://scripts.qexsystems.ru/kmrd/schedule/settings.php"
});

// Хранилище
let globalData = {};
let globalSettings = [];
let stateForm = {};

Promise.all([api.getUsersInfo(`${currentMonth}.${year}`), api.getSettings()])
.then(([usersData, settingsData]) => {
  globalData = usersData;
  globalSettings = settingsData;

  stateForm = {
    timeRed: {
      start: globalSettings[0].substr(0,5),
      end: globalSettings[0].substr(6)
    },
    timeYellow: {
      start: globalSettings[1].substr(0,5),
      end: globalSettings[1].substr(6)
    },
    timePurple: {
      start: globalSettings[2].substr(0,5),
      end: globalSettings[2].substr(6)
    },
    timeBlue: {
      start: globalSettings[3].substr(0,5),
      end: globalSettings[3].substr(6)
    },
    timeGreen: {
      start: globalSettings[4].substr(0,5),
      end: globalSettings[4].substr(6)
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

  userList(globalData, stateForm);
})
.catch((err) => console.log(err));

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
    // Запрос на сохранение настроек
    let formdata = new FormData();
    formdata.append("action", "schedule");
    formdata.append("time[]", `${stateForm.timeRed.start}-${stateForm.timeRed.end}`);
    formdata.append("time[]", `${stateForm.timeYellow.start}-${stateForm.timeYellow.end}`);
    formdata.append("time[]", `${stateForm.timePurple.start}-${stateForm.timePurple.end}`);
    formdata.append("time[]", `${stateForm.timeBlue.start}-${stateForm.timeBlue.end}`);
    formdata.append("time[]", `${stateForm.timeGreen.start}-${stateForm.timeGreen.end}`);

    api.saveSettings(formdata)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
    // Закрытие попапа настроек
    this.close();
  }
);

// Функция изменения значений в списке
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
  })
};

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
  for (let day = 1; day <= daysPerMonth; day++) {
    let correctionMonth = month + 1 < 10 ? `0${month + 1}` : month + 1;
    contentHeader.insertAdjacentHTML(
      "beforeend",
      `<div class="content__header-block content__header-block_day">
        <p class="content__header-title content__header-title_month">
        ${day}.${correctionMonth}</p>
        <p class="content__header-title content__header-title_day-of-week">${handleChangeDayPerWeek(
          year,
          month,
          day
        )}</p>
      </div>`
    );
  }
};

const handleSubmit = () => {
  let sumbitObj = {};
  let days = {};
  const allUserRows = [...contentForm.querySelectorAll('.content__users')];
  allUserRows.forEach((user) => {
    const dataUser = user.querySelector('.select__input');
    const id = dataUser.getAttribute('data-id');
    const name = dataUser.getAttribute('data-name');
    const dataUserInputs = [...user.querySelectorAll('.select__input')];
    dataUserInputs.forEach((input) => {
      const day = input.getAttribute('data-day');
      const value = input.value;
      days = { ...days, [day]: value};    
    })
    sumbitObj = { ...sumbitObj, [id]: { name, date: days }}
  })
  const resultObj = {
    action: 'save',
    date: currentMonth + '.' + currentYear,
    users: sumbitObj,
  }
  // Отправка данных на сервер
  api.postUsersInfo(resultObj)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
}

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
  // Здесь запрос с даннымы за месяц
  let correctionMonth = month + 1;
  currentMonth = month + 1 < 10 ? `0${correctionMonth}` : `${correctionMonth}`;
  currentYear = String(year);
  const date = `${correctionMonth < 10 ? `0${correctionMonth}` : correctionMonth}.${year}`;
  api.getUsersInfo(date)
  .then((res) => {
    globalData = res;
    userList(globalData, stateForm);    
  })
  .catch((err) => console.log(err));
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

settingsPopup.setEventListeners();
prevMonthButton.addEventListener("click", handleChangePrevMonth);
nextMonthButton.addEventListener("click", handleChangeNextMonth);
saveButton.addEventListener("click", handleSubmit);
settingsButton.addEventListener("click", openSettings);