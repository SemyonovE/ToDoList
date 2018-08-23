import { loadFromLocalStorage } from "./workWithStorage";

const url = "https://todolist.7ионов.рф/todoserver.php";
const headers = {
  Accept: "application/json",
  "Content-type": "application/json; charset=UTF-8"
};

export const requestToServer = (data, callFunction = () => {}) => {
  const options = {
    headers: headers,
    method: "POST",
    body: JSON.stringify(data)
  };
  fetch(url, options)
    .then(res => {
      if (res.ok) {
        res
          .json()
          .then(res => {
            callFunction(checkStatus(res));
          })
          .catch(err => {
            console.log("Server is not available!", err);
          });
      } else {
        console.log("Download from server failed.");
        callFunction(
          checkStatus({
            status: "error",
            what: "server"
          })
        );
      }
    })
    .catch(err => {
      console.log("Server is not available!", err);
    });
};

export const saveData = (list, field) => {
  requestToServer({
    [field]: JSON.stringify(list),
    email: loadFromLocalStorage("", "userName")
  });
  return list;
};

function checkStatus(response) {
  switch (response.status) {
    case "ok":
      return response;
    case "error":
      alert(response.what);
      return null;
    default:
      alert("Fatal error");
      return null;
  }
}
