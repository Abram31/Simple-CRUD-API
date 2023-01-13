export const getUser = (url: Array<string>) => {
  const list = ['api', 'users'];
  const checkURL = url.filter((item) => list.includes(item));
  if (!(checkURL.length < 2)) {
    return url.slice(-1)[0];
  } else {
    return '';
  }
};
