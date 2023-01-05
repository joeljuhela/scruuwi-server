export default (mac: string): string => {
  return mac.replaceAll(":", "").toLowerCase();
};
