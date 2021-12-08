import {round} from "../../js/Utility";

const nerdamer = require("nerdamer/all.min");

function getEquations(matrizTotal, qValues, dValues, precision) {
  const equations = [];
  const completeEq = [];

  for (let i = 0; i < matrizTotal.length - 1; i++) {
    let currentEqu = qValues[i] + "=";
    let currentCompEqu = qValues[i] + "=";

    for (let j = 0; j < matrizTotal.length - 1; j++) {
      let coeficiente = dValues[j];
      let coeficienteComp = dValues[j];
      let positivo = true;
      let isNum = true;


      if (matrizTotal[i + 1][j + 1] == 0 || dValues[j] == 0) continue;

      let aux = dValues[j];

      if (isNaN(aux)) isNum = false;
      else aux = parseFloat(aux);

      if (isNum) {
        coeficiente *= matrizTotal[i + 1][j + 1];
        coeficiente = round(parseFloat(coeficiente), precision);
        coeficienteComp = parseFloat(coeficiente);

        if (coeficiente < 0) positivo = false;
      } else {
        if (matrizTotal[i + 1][j + 1] < 0) positivo = false;
        coeficiente =
          round(parseFloat(matrizTotal[i + 1][j + 1]), precision) + coeficiente;
        coeficienteComp = parseFloat(matrizTotal[i + 1][j + 1]) + coeficienteComp;
      }

      if (j !== 0) {
        if (!positivo || currentEqu[currentEqu.length - 1] === "=") {
          currentEqu += coeficiente;
          currentCompEqu += coeficienteComp;
        } else {
          currentEqu += "+" + coeficiente;
          currentCompEqu += "+" + coeficienteComp;
        }
      } else {
        currentEqu += coeficiente;
        currentCompEqu += coeficienteComp;
      }
    }
    if (currentEqu[currentEqu.length - 1] !== "=" || currentEqu[0] === "q") {
      if (currentEqu[currentEqu.length - 1] === "=") currentEqu += "0";
      equations.push(currentEqu);
      completeEq.push(currentCompEqu);
    }
  }
  return [equations, completeEq];
}

function solveAll(equations, precision) {
  const solvedEquations = nerdamer.solveEquations(equations);

  const stringEquations = [];

  for (let i = 0; i < solvedEquations.length; i++) {
    const newString =
      solvedEquations[i][0] +
      "=" +
      round(solvedEquations[i][1], precision);
    stringEquations.push(newString);
  }
  console.log({stringEquations, equations});
  return stringEquations;
}

export {getEquations, solveAll};