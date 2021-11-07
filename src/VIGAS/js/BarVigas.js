const MAXSIZE = 500;

class Bar {
  constructor(E = 0, I = 0, L = 0, num = [1, 2, 3, 4]) {
    this.E = E;
    this.I = I;
    this.L = L;
    this.num = num;
    this.matrix = Array(MAXSIZE)
      .fill(null)
      .map(() => Array(MAXSIZE).fill(0));
  }

  solveMatrix() {
    const k = this.I * this.E;

    for (let i of this.num) {
      for (let j of this.num) {
        if (
          (i === this.num[0] && j === this.num[0]) ||
          (i === this.num[2] && j === this.num[2])
        ) {
          this.matrix[i][j] = (k * 12) / this.L ** 3;
        }
        if (
          (i === this.num[1] && j === this.num[1]) ||
          (i === this.num[3] && j === this.num[3])
        ) {
          this.matrix[i][j] = (k * 4) / this.L;
        }
        if (
          (i === this.num[0] && j === this.num[2]) ||
          (i === this.num[2] && j === this.num[0])
        ) {
          this.matrix[i][j] = ((k * 12) / this.L ** 3) * -1;
        }
        if (
          (i === this.num[3] && j === this.num[1]) ||
          (i === this.num[1] && j === this.num[3])
        ) {
          this.matrix[i][j] = (k * 2) / this.L;
        }
        if (
          (i === this.num[1] && j === this.num[0]) ||
          (i === this.num[0] && j === this.num[1]) ||
          (i === this.num[0] && j === this.num[3]) ||
          (i === this.num[3] && j === this.num[0])
        ) {
          this.matrix[i][j] = (k * 6) / this.L ** 2;
        }
        if (
          (i === this.num[3] && j === this.num[2]) ||
          (i === this.num[2] && j === this.num[3]) ||
          (i === this.num[1] && j === this.num[2]) ||
          (i === this.num[2] && j === this.num[1])
        ) {
          this.matrix[i][j] = ((k * 6) / this.L ** 2) * -1;
        }
      }
    }
  }
}

export { Bar };
