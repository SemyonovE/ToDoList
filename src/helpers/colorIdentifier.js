export default color => {
  const tempColor =
    color.length < 6
      ? color[1].repeat(2) + color[2].repeat(2) + color[3].repeat(2)
      : color.substring(1);
  const r = parseInt(tempColor.substring(0, 2), 16);
  const g = parseInt(tempColor.substring(2, 4), 16);
  const b = parseInt(tempColor.substring(4, 6), 16);
  return 1 - (0.299 * r + 0.587 * g + 0.114 * b) / 255 < 0.5;
};
