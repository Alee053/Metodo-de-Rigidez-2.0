const MAXSIZE = 500;

class Bar {
  constructor(lx = 0, ly = 0, A = 0, E = 0, L = 0, num = [1, 2, 3, 4]) {
    this.lx = lx;
    this.ly = ly;
    this.A = A;
    this.E = E;
    this.L = L;
    this.num = num;
    this.k = 0;
    this.qf = 0;

    this.matrix = Array(MAXSIZE)
      .fill(null)
      .map(() => Array(MAXSIZE).fill(0));
  }

  solveMatrix() {
    this.k = (this.A * this.E) / this.L;

    for (let i of this.num) {
      for (let j of this.num) {
        if (
          (i === this.num[0] && j === this.num[0]) ||
          (i === this.num[2] && j === this.num[2])
        ) {
          this.matrix[i][j] = this.lx * this.lx;
        }
        if (
          (i === this.num[1] && j === this.num[1]) ||
          (i === this.num[3] && j === this.num[3])
        ) {
          this.matrix[i][j] = this.ly * this.ly;
        }
        if (
          (i === this.num[0] && j === this.num[2]) ||
          (i === this.num[2] && j === this.num[0])
        ) {
          this.matrix[i][j] = this.lx * this.lx * -1;
        }
        if (
          (i === this.num[3] && j === this.num[1]) ||
          (i === this.num[1] && j === this.num[3])
        ) {
          this.matrix[i][j] = this.ly * this.ly * -1;
        }
        if (
          (i === this.num[1] && j === this.num[0]) ||
          (i === this.num[0] && j === this.num[1]) ||
          (i === this.num[3] && j === this.num[2]) ||
          (i === this.num[2] && j === this.num[3])
        ) {
          this.matrix[i][j] = this.lx * this.ly;
        }
        if (
          (i === this.num[0] && j === this.num[3]) ||
          (i === this.num[1] && j === this.num[2]) ||
          (i === this.num[2] && j === this.num[1]) ||
          (i === this.num[3] && j === this.num[0])
        ) {
          this.matrix[i][j] = this.lx * this.ly * -1;
        }
        this.matrix[i][j] *= this.k;
      }
    }
  }

  solveQf(dArray) {
    this.qf = 0;
    if (dArray.length < 3) return;
    this.qf += (-this.lx) * dArray[this.num[0]] * this.k;
    this.qf += (-this.ly) * dArray[this.num[1]] * this.k;
    this.qf += (this.lx) * dArray[this.num[2]] * this.k;
    this.qf += (this.ly) * dArray[this.num[3]] * this.k;
    console.log(this.qf);
  }
}

export {Bar};
