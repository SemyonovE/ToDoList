export default (str) => {
  var hash = 0;
  for (let i = 0; i < str.length; i++) {
      hash = ~~(((hash << 5) - hash) + str.charCodeAt(i));
  }
  return hash;
}