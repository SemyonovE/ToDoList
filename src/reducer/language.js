import { TOGGLE_LANG } from "../helpers/constants";
import {
  saveToLocalStorage,
  loadFromLocalStorage
} from "../helpers/workWithStorage";

// Dictionary
const LANG = {
  en: {
    language: "en",
    defaultDefine: "My",
    propmptText: "How do you see this list (for example 'nice' or 'Mike's)",
    appHeader: "ToDo List",
    createTaskTooltip: "Add the new task",
    clearFilterTooltip: "Clear filters",
    clearSorterTooltip: "Clear sorter",
    emptyTitle: "The title of your new task is empty",
    emptyText: "The text of your new task is empty",
    sorterTitle: "Sorting task by",
    filterTitles: [
      "Filtering tasks by importance",
      "Filtering tasks by completeness"
    ],
    importances: ["everything", "normal", "important", "very important"],
    displayMods: ["enerything", "currents", "completed"],
    sorters: [
      "default",
      "title",
      "date",
      "first important",
      "first unimportant"
    ],
    titleTitle: "Title",
    titleText: "Text",
    titleDate: "Date",
    titleImportance: "Importance",
    from: "for",
    to: "done",
    withoutDate: "date don't set",
    setChangesTooltip: "Set changes",
    cancelChangesTooltip: "Cansel changes",
    importanceTooltip: "Importance of the task",
    editTTaskooltip: "Edit the task",
    completeTaskTooltip: "Toggle the task as complete",
    incompleteTaskTooltip: "Return the task as incomplete",
    deleteTaskTooltip: "Delete the task",
    toggleLanguageTooltip: "Toggle language",
    exitButtonTooltip: "Exit",
    toggleTaskListStyleToggle: "Change ange list style task",
    loginModalTitles: {
      title: "Login or register",
      login: "Login",
      loginText: "Enter email",
      password: "Password",
      passwordText: "Enter password",
      remember: "Remember me",
      forget: "Forget password",
      forgetEmail: "Set your email:",
      forgetPassword: "Set new password:",
      forgetMessage: "See the instructions on the email",
      come: "Come in"
    }
  },
  ru: {
    language: "ru",
    defaultDefine: "Мой",
    propmptText: "Каким Вы видите этот список (например 'хороший' или 'Васин')",
    appHeader: "список дел",
    createTaskTooltip: "Добавить новую задачу",
    clearFilterTooltip: "Очистить фильтры",
    clearSorterTooltip: "Сбросить сортировку",
    emptyTitle: "Укажите название Вашей новой статьи",
    emptyText: "Укажите описание Вашей новой статьи",
    sorterTitle: "Сортировка задач по",
    filterTitles: ["Фильтр задач по важности", "Фильтр задач по завершенности"],
    importances: ["все", "обычные", "важные", "очень важные"],
    displayMods: ["все", "текущие", "завершенные"],
    sorters: [
      "умолчанию",
      "заголовку",
      "дате",
      "сначала важные",
      "сначала неважные"
    ],
    titleTitle: "Название",
    titleText: "Описание",
    titleDate: "Дата",
    titleImportance: "Важность",
    from: "на",
    to: "готово",
    withoutDate: "дата не задана",
    setChangesTooltip: "Сохранить изменения",
    cancelChangesTooltip: "Отменить изменения",
    importanceTooltip: "Важность задачи",
    editTTaskooltip: "Редактировать задачу",
    completeTaskTooltip: "Пометить как завершенная",
    incompleteTaskTooltip: "Пометить как незавершенная",
    deleteTaskTooltip: "Удалить задачу",
    toggleLanguageTooltip: "Переключить язык",
    exitButtonTooltip: "Выйти",
    toggleTaskListStyleToggle: "Сменить стиль списка задач",
    loginModalTitles: {
      title: "Войти или зарегистрироваться",
      login: "Логин",
      loginText: "Введите email",
      password: "Пароль",
      passwordText: "Введите пароль",
      remember: "Запомнить меня",
      forget: "Забыл пароль",
      forgetEmail: "Укажите Ваш email:",
      forgetPassword: "Задайте новый пароль:",
      forgetMessage: "Смотрите инструкции на указанном email",
      come: "Войти"
    }
  }
};

export default (
  language = LANG[loadFromLocalStorage("en", "language")],
  action
) => {
  const { type, payload } = action;

  if (type === TOGGLE_LANG) {
    saveToLocalStorage(payload.language, "language");

    return LANG[payload.language];
  }

  return language;
};
