import { loadFromLocalStorage } from "./workWithStorage";

const url = "https://todolist.7ионов.рф/todoserver.php";
const headers = {
  Accept: "application/json",
  "Content-type": "application/json; charset=UTF-8"
};

export const requestToServer = data => {
  const options = {
    headers: headers,
    method: "POST",
    body: JSON.stringify(data)
  };
  return fetch(url, options)
    .then(res => res.json())
    .catch(err => {
      console.log("Server is not available!", err);
      return null;
    });
};

export const saveData = (list, field) => {
  requestToServer({
    [field]: JSON.stringify(list),
    email: loadFromLocalStorage("", "email")
  });
  return list;
};
