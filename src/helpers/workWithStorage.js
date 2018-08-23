export const saveToLocalStorage = (data, name) =>
  localStorage.setItem(name, JSON.stringify(data));

export const loadFromLocalStorage = (defaultValue, name) => {
  if (!localStorage[name]) saveToLocalStorage(defaultValue, name);

  return JSON.parse(localStorage.getItem(name));
};
