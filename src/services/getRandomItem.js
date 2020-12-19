export default (arr) => {
  const { length } = arr;
  return arr[Math.floor(Math.random() * length)];
};
