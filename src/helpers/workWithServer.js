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
    .then(res => checkStatus(res))
    .catch(err => {
      console.log("Server is not available!", err);
      return null;
    });
};

export const saveData = (list, field) => {
  requestToServer({
    [field]: JSON.stringify(list),
    email: loadFromLocalStorage("", "userName")
  });
  return list;
};

function checkStatus(res) {
  switch (res.status) {
    case "ok":
      return res;
    case "error":
      alert(res.what);
      return null;
    default:
      alert("Fatal error");
      return null;
  }
}
