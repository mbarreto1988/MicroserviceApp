export const isSessionValid = (): boolean => {
  const expiresAt = localStorage.getItem("sessionExpiresAt");
  if (!expiresAt) return false;

  const now = new Date().getTime();
  return now < parseInt(expiresAt, 10);
};
