const MAXSIZE = 500;

class Bar {
  constructor(
    lx = 0,
    ly = 0,
    A = 0,
    E = 0,
    I = 0,
    L = 0,
    num = [1, 2, 3, 4, 5, 6],
  ) {
    this.lx = lx;
    this.ly = ly;
    this.A = A;
    this.E = E;
    this.I = I;
    this.L = L;
    this.num = num;
    this.qf = Array(4).fill(0);
    this.k = 0;
    this.F = 0;

    this.matrix = Array(MAXSIZE)
      .fill(null)
      .map(() => Array(MAXSIZE).fill(0));
  }

  solveMatrix() {
    let AEL = (this.A * this.E) / this.L;
    let EI = this.E * this.I;
    let DOCEEIL3 = (12 * EI) / this.L ** 3;
    let SEISEIL2 = (6 * EI) / this.L ** 2;
    let CUATROEIL = (4 * EI) / this.L;
    let DOSEIL = CUATROEIL / 2;

    for (let i of this.num) {
      for (let j of this.num) {
        if (
          (i == this.num[0] && j == this.num[0]) ||
          (i == this.num[3] && j == this.num[3])
        ) {
          this.matrix[i][j] = AEL * this.lx ** 2 + DOCEEIL3 * this.ly ** 2;
        }
        if (
          (i == this.num[1] && j == this.num[1]) ||
          (i == this.num[4] && j == this.num[4])
        ) {
          this.matrix[i][j] = AEL * this.ly ** 2 + DOCEEIL3 * this.lx ** 2;
        }
        if (
          (i == this.num[2] && j == this.num[2]) ||
          (i == this.num[5] && j == this.num[5])
        ) {
          this.matrix[i][j] = CUATROEIL;
        }
        if (
          (i == this.num[1] && j == this.num[0]) ||
          (i == this.num[4] && j == this.num[3]) ||
          (i == this.num[0] && j == this.num[1]) ||
          (i == this.num[3] && j == this.num[4])
        ) {
          this.matrix[i][j] = (AEL - DOCEEIL3) * this.lx * this.ly;
        }
        if (
          (i == this.num[2] && j == this.num[0]) ||
          (i == this.num[5] && j == this.num[0]) ||
          (i == this.num[0] && j == this.num[2]) ||
          (i == this.num[0] && j == this.num[5])
        ) {
          this.matrix[i][j] = -SEISEIL2 * this.ly;
        }
        if (
          (i == this.num[2] && j == this.num[1]) ||
          (i == this.num[5] && j == this.num[1]) ||
          (i == this.num[1] && j == this.num[2]) ||
          (i == this.num[1] && j == this.num[5])
        ) {
          this.matrix[i][j] = SEISEIL2 * this.lx;
        }
        if (
          (i == this.num[4] && j == this.num[2]) ||
          (i == this.num[5] && j == this.num[4]) ||
          (i == this.num[2] && j == this.num[4]) ||
          (i == this.num[4] && j == this.num[5])
        ) {
          this.matrix[i][j] = -SEISEIL2 * this.lx;
        }
        if (
          (i == this.num[3] && j == this.num[0]) ||
          (i == this.num[0] && j == this.num[3])
        ) {
          this.matrix[i][j] = -(AEL * this.lx ** 2) - DOCEEIL3 * this.ly ** 2;
        }
        if (
          (i == this.num[4] && j == this.num[0]) ||
          (i == this.num[3] && j == this.num[1]) ||
          (i == this.num[0] && j == this.num[4]) ||
          (i == this.num[1] && j == this.num[3])
        ) {
          this.matrix[i][j] = -((AEL - DOCEEIL3) * this.lx * this.ly);
        }
        if (
          (i == this.num[4] && j == this.num[1]) ||
          (i == this.num[1] && j == this.num[4])
        ) {
          this.matrix[i][j] = -(AEL * this.ly ** 2) + DOCEEIL3 * this.lx ** 2;
        }
        if (
          (i == this.num[5] && j == this.num[2]) ||
          (i == this.num[2] && j == this.num[5])
        ) {
          this.matrix[i][j] = DOSEIL;
        }
        if (
          (i == this.num[3] && j == this.num[2]) ||
          (i == this.num[2] && j == this.num[3]) ||
          (i == this.num[3] && j == this.num[5]) ||
          (i == this.num[5] && j == this.num[3])
        ) {
          this.matrix[i][j] = SEISEIL2 * this.ly;
        }
      }
    }
  }
}


export {Bar};

