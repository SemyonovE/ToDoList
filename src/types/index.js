import { PropTypes, shape, string } from "prop-types";

export const optionType = shape({
  value: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
});

export const taskType = shape({
  id: string.isRequired,
  title: string.isRequired,
  text: string.isRequired,
  date: string,
  importance: string.isRequired,
  finished: string.isRequiredg
});
