export function saveToLocalStorage(data, name) {
  return localStorage.setItem(name, JSON.stringify(data));
}

export function loadFromLocalStorage(defaultValue, name) {
  if (!localStorage[name]) saveToLocalStorage(defaultValue, name);
  
  return JSON.parse(localStorage.getItem(name));
}
