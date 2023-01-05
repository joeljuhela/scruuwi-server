export default (mac) => {
  return mac.replaceAll(":", "").toLowerCase();
};
