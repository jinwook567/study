let fs = require("fs");
//let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
let input = fs.readFileSync("./sample.txt").toString().trim().split("\n");

const [N, L, R] = input.shift().split(" ").map(Number);
const coordinate = [];
for (let i = 0; i < N; i++) {
  coordinate.push(input.shift().split(" ").map(Number));
}

class Queue {
  constructor() {
    this.front = 0;
    this.rear = 0;
    this.queue = [];
  }

  enqueue(data) {
    this.queue[this.rear++] = data;
  }

  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front++;
    return value;
  }

  size() {
    return this.rear - this.front;
  }
}

const dy = [1, -1, 0, 0];
const dx = [0, 0, -1, 1];

function solution2(N, R, L, coordinate) {
  function bfs(coordinate, union, position, num, visited) {
    const queue = new Queue();
    const [y, x] = position;
    queue.enqueue([y, x]);

    let isUnioned = false;
    while (queue.size() > 0) {
      const [y, x] = queue.dequeue();

      for (let i = 0; i < 4; i++) {
        const ny = dy[i] + y;
        const nx = dx[i] + x;

        if (ny < 0 || nx < 0 || nx >= N || ny >= N) continue;
        if (visited[ny][nx]) continue;

        const calculated = Math.abs(coordinate[ny][nx] - coordinate[y][x]);
        if (calculated >= L && calculated <= R) {
          queue.enqueue([ny, nx]);
          visited[ny][nx] = true;
          union[ny][nx] = num;
          isUnioned = true;
        }
      }
    }
    return isUnioned;
  }

  let answer = 0;

  function check(union) {
    return union.every((arr) => arr.every((v) => v === 0));
  }

  while (true) {
    answer++;
    const union = Array(N)
      .fill()
      .map(() => Array(N).fill(0));

    const visited = Array(N)
      .fill()
      .map(() => Array(N).fill(false));

    let cnt = 1;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (!visited[i][j]) {
          const isUnioned = bfs(coordinate, union, [i, j], cnt, visited);
          if (isUnioned) cnt++;
        }
      }
    }

    if (check(union)) {
      return answer - 1;
    }

    //?????? ?????? ??????, coordinate ??? ??????????????????.
    const sum = Array((N * N) / 2)
      .fill()
      .map(() => []);
    union.forEach((arr, y) =>
      arr.forEach((v, x) => {
        if (v !== 0) {
          sum[v].push([y, x]);
        }
      })
    );

    sum.forEach((arr) => {
      let sum = 0;
      arr.forEach(([y, x]) => {
        sum += coordinate[y][x];
      });

      const average = Math.floor(sum / arr.length);

      arr.forEach(([y, x]) => {
        coordinate[y][x] = average;
      });
    });
    //union ????????????, union check ?????? ??? ?????? 0????????? return ??????.
  }
}

function solution(N, R, L, coordinate) {
  //union?????? ?????? ????????? ?????????, ????????? ?????? ????????? ?????????.
  function dfs(coordinate, union, position, num, visited) {
    const [y, x] = position;
    if (y < 0 || x < 0 || x >= N || y >= N) return false;
    if (visited[y][x]) return false;
    visited[y][x] = true;

    let isUnioned = false;
    for (let i = 0; i < 4; i++) {
      const ny = dy[i] + y;
      const nx = dx[i] + x;
      //?????? ?????? (?????? ????????? ???????????? ????????????.)
      if (ny < 0 || nx < 0 || nx >= N || ny >= N) continue;
      const calculated = Math.abs(coordinate[ny][nx] - coordinate[y][x]);

      //???????????????????????? ?????????.
      if (calculated >= L && calculated <= R) {
        //????????? ????????? ????????????, ????????? ???????????????,
        union[y][x] = num;
        dfs(coordinate, union, [ny, nx], num, visited);
        isUnioned = true;
      }
    }

    return isUnioned;
  }

  let answer = 0;

  function check(union) {
    return union.every((arr) => arr.every((v) => v === 0));
  }

  while (true) {
    answer++;
    const union = Array(N)
      .fill()
      .map(() => Array(N).fill(0));

    const visited = Array(N)
      .fill()
      .map(() => Array(N).fill(false));

    let cnt = 1;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        if (!visited[i][j]) {
          const isUnioned = dfs(coordinate, union, [i, j], cnt, visited);
          if (isUnioned) cnt++;
        }
      }
    }

    if (check(union)) {
      return answer - 1;
    }

    //?????? ?????? ??????, coordinate ??? ??????????????????.
    const sum = Array(N * N)
      .fill()
      .map(() => []);
    union.forEach((arr, y) =>
      arr.forEach((v, x) => {
        if (v !== 0) {
          sum[v].push([y, x]);
        }
      })
    );

    sum.forEach((arr) => {
      let sum = 0;
      arr.forEach(([y, x]) => {
        sum += coordinate[y][x];
      });

      const average = Math.floor(sum / arr.length);

      arr.forEach(([y, x]) => {
        coordinate[y][x] = average;
      });
    });
    //union ????????????, union check ?????? ??? ?????? 0????????? return ??????.
  }
}

//while??? ????????? count??? ???????????? dfs ????????????, ?????? ????????? ????????? ????????? ??? ??? ????????????.

//const r = solution(N, R, L, coordinate);
const r2 = solution2(N, R, L, coordinate);
console.log(r2);
