function round(number, pres = 4) {
  return number % 1 ? parseFloat(number).toFixed(pres) : number;
}

export { round };
