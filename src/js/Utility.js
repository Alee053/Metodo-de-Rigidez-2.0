function round(num, pres) {
  return +(Math.round(num + ("e+" + pres)) + ("e-" + pres));
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

export { round, solveTotalMatrix };
