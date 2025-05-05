// export const isSessionValid = (): boolean => {
//   const expiresAt = localStorage.getItem("sessionExpiresAt");
//   if (!expiresAt) return false;

//   const now = new Date().getTime();
//   return now < parseInt(expiresAt, 10);
// };


export const isSessionValid = (): boolean => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const expiresAt = localStorage.getItem("sessionExpiresAt");

  if (!isLoggedIn || !expiresAt) return false;

  const now = new Date().getTime();
  return now < parseInt(expiresAt, 10);
};

