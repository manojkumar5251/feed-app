const NA = -1

const moveToEnd = (A, size) => {
  let i = 0
  let j = size - 1
  for (let i = size - 1; i >= -1; i--) {
    if (A[i] != NA) {
      A[j] = A[i]
      j -= 1
    }
  }
}

const merge = (A, N, m, n) => {
  let i = n
  let j = 0
  let k = 0
  while (k < m + n) {
    if ((i < m + n && A[i] <= N[j]) || j == n) {
      A[k] = A[i]
      k += 1
      i += 1
    } else {
      A[k] = N[j]
      k += 1
      j += 1
    }
  }
}

const printArray = (arr, size) => {
  arr.forEach(i => console.log(i, " "))
}

let A = [2, 8, 13, 15, 20, NA, NA, NA, NA]
let B = [5, 7, 9, 25]
let n = B.length

m = A.length - n

moveToEnd(A, m + n)

merge(A, B, m, n)

printArray(A, m + n)
