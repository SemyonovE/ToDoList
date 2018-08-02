import { TOGGLE_LANG } from "../helpers/constants";
import {
  saveToLocalStorage,
  loadFromLocalStorage
} from "../helpers/workWithStorage";

const LANG = {
  en: {
    language: "en",
    toggleLanguage: "ru",
    authorDefault: "My",
    navbarTitles: ["Creating the new task", "Filters"],
    propmptText: "How can I call you?",
    appHeader: "ToDo List",
    createTaskTooltip: "Add the new task",
    emptyTitle: "The title of your new task is empty",
    emptyText: "The text of your new task is empty",
    filterTitles: [
      "Filtering tasks by importance",
      "Filtering tasks by completeness"
    ],
    importances: ["everything", "normal", "important", "very important"],
    displayMods: ["enerything", "currents", "completed"],
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
    toggleLanguageTooltip: "Toogle language"
  },
  ru: {
    language: "ru",
    toggleLanguage: "en",
    authorDefault: "Мой",
    navbarTitles: ["Новая задача", "Фильтры"],
    propmptText: "Как к вам обращаться?",
    appHeader: "список дел",
    createTaskTooltip: "Добавить новую задачу",
    emptyTitle: "Укажите название Вашей новой статьи",
    emptyText: "Укажите описание Вашей новой статьи",
    filterTitles: ["Фильтр задач по важности", "Фильтр задач по завершенности"],
    importances: ["все", "обычные", "важные", "обень важные"],
    displayMods: ["все", "текущие", "завершенные"],
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
    toggleLanguageTooltip: "Переключить язык"
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
