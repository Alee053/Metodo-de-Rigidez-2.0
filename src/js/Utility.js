function round(num, pres) {
  return +(Math.round(num + ("e+" + pres)) + ("e-" + pres));
}

export { round };
