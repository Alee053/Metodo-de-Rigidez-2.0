function round(num, pres) {
  num = num.toString();
  let term = "", ini = "";
  let e = false;
  for (let i of num) {
    if (i === 'e' || e) {
      e = true;
      term += i;
    } else {
      ini += i;
    }
  }
  ini = parseFloat(ini);
  return (+(Math.round(ini + ("e+" + pres)) + ("e-" + pres))).toString() + term;
}

function solveTotalMatrix(matrixArray, maxNum) {
  const totalMatrix = Array(maxNum + 1)
    .fill(null)
    .map(() => Array(maxNum + 1).fill(0));
  for (let i = 0; i <= maxNum; i++) {
    for (let j = 0; j <= maxNum; j++) {
      for (let k = 0; k < matrixArray.length; k++) {
        if (i === 0) totalMatrix[i][j] = j;
        if (j === 0) totalMatrix[i][j] = i;
        totalMatrix[i][j] += matrixArray[k][i][j];
      }
    }
  }
  return totalMatrix;
}

export {round, solveTotalMatrix};
