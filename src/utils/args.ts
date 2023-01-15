export const args = () => {
  let argum: string[] | string = process.argv.slice(2);

  if (argum[0].startsWith('--')) {
    argum = argum[0].slice(2);
  }
  return argum;
};
// console.log(args());
