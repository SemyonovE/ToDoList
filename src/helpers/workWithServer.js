const url = "https://todolist.7ионов.рф/todoserver.php";
const headers = {
  Accept: "application/json",
  "Content-type": "application/json; charset=UTF-8"
};

export function saveToServer(data, field) {
  loadFromServer({
    [field]: JSON.stringify(data[field]),
    email: data.email
  });
}

export function loadFromServer(data, callFunction = () => {}) {
  fetch(url, {
    headers: headers,
    method: "POST",
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        response.json().then(json => {
          callFunction(checkStatus(json));
        }).catch(err => {
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
}

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
