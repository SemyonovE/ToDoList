import Cookies from "js-cookie";
import moment from "moment";

const defaultField = "userdata";

export const setCookies = (userdata, field = defaultField) => {
  Cookies.set(field, JSON.stringify(userdata), {
    expires: moment()
      .add(3, "month")
      .toDate()
  });
};

export const getCookies = (field = defaultField) => {
  const data = Cookies.get(field);
  return data && JSON.parse(data);
};

export const removeCookies = (field = defaultField) => Cookies.remove(field);
