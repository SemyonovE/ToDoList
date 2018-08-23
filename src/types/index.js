import { number, shape, string, oneOf } from "prop-types";

export const optionType = shape({
  value: number.isRequired,
  title: string.isRequired
});

export const taskType = shape({
  id: oneOf[(string.isRequired, undefined)],
  title: string.isRequired,
  text: string.isRequired,
  date: string,
  importance: string.isRequired,
  finished: string.isRequiredg
});
