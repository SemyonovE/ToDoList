import moment from "moment";

export default (first, second, sorterMode) => {
  switch (sorterMode) {
    case -1:
      return 0;
    case 1:
      if (first.title.toLowerCase() > second.title.toLowerCase()) return 1;
      else return -1;
    case 2:
      return first.date && second.date
        ? Math.sign(moment(first.date).utc() - moment(second.date).utc())
        : first.date
          ? -1
          : 1;
    case 3:
      return Math.sign(second.importance - first.importance);
    case 4:
      return Math.sign(first.importance - second.importance);
    default:
      return 0;
  }
};
