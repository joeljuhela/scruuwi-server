export const parseBasicAuthHeader = (header: string): [string, string] => {
  const b64Decoded: string = atob(header.substring(6));
  const [username, ...passwordParts] = b64Decoded.split(":");
  const password: string = passwordParts.join(":");
  return [username, password];
};
