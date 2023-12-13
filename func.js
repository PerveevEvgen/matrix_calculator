function validateMatrix(firstMatrix, secMatrix) {
   if (secMatrix !== undefined) {
     return { firstMatrixColLen: firstMatrix[0].length,
       firstMatrixRowLen: firstMatrix.length,
       secMatrixColLen: secMatrix[0].length,
       secMatrixRowLen: secMatrix.length,
     };
   }
   return { columsLength: firstMatrix[0].length,
     rowsLength: firstMatrix.length
   };
 }
 
 export function transMatrix(matrix) {
   const matrixParam = validateMatrix(matrix);
   const resMtr = [];
   for (let i = 0; i < matrixParam.rowsLength; i++) {
     resMtr[i] = [];
     for (let j = 0; j < matrixParam.columsLength; j++) {
       resMtr[i][j] = matrix[j][i];
     }
   }
   return resMtr;
 }
 
 export function multMatrixAtNumber(mtr, number) {
  const matrixParam = validateMatrix(mtr);
  const resMtr = [];
  for (let i = 0; i < matrixParam.rowsLength; i++) {
    resMtr[ i ] = [];
    for (let j = 0; j < matrixParam.columsLength; j++) {
      resMtr[i][j] = number * mtr[i][j];
    }
  }
  return resMtr;
}
 
 export function multMatrix(M1, M2) {
   const matrixParams = validateMatrix(M1, M2);
   const resMtr = [];
   if (matrixParams.firstMatrixColLen !== matrixParams.secMatrixRowLen) return false;
   for (let i = 0; i < (M1.length + M2.length) / 2; i++) {
     resMtr[i] = [];
   }
   for (let k = 0; k < matrixParams.secMatrixColLen; k++) {
     for (let i = 0; i < matrixParams.firstMatrixRowLen; i++) {
       let t = 0;
       for (let j = 0; j < matrixParams.secMatrixRowLen; j++) {
         t += M1[i][j] * M2[j][k];
       }
       resMtr[i][k] = t;
     }
   }
   return resMtr;
 }
 
 export function matrixPow(num, mtr) {
   if (num === 1) {
     return mtr;
   }
   return multMatrix(mtr, matrixPow(num - 1, mtr));
 }
 
 export function calcDeterminant(mtr) {
   const len = mtr.length;
   if (len === 1) {
     return mtr[0][0];
   }
   if (len === 2) {
     return mtr[0][0] * mtr[len - 1][len - 1] - mtr[0][len - 1] * mtr[len - 1][0];
   }
   return mtr.reduce((p, c, i, a) => {
     const sign = i % 2 === 0 ? 1 : -1;
     let minor = a.slice(0);
     minor.splice(0, 1);
     minor = minor.map(res => {
       res = res.slice(0);
       res.splice(i, 1);
       return res;
     });
     return p + (sign * mtr[0][i] * calcDeterminant(minor));
   }, 0);
 }
 
 function copyArray(array) {
   const res = [];
   for (let i = 0; i < array.length; i++) {
     res[i] = [];
     for (let j = 0; j < array.length; j++) {
       res[i][j] = array[i][j];
     }
   }
   return res;
 }
 
 export function inverseMatrix(mtr) {
   let mtrCopy = copyArray(mtr);
   const det = calcDeterminant(mtr);
   let inverseMatr;
   if (det === 0) {
     inverseMatr = 'Оберненої матриці не існує';
   }
   if (mtr.length === 2) {
     inverseMatr = [];
     for (let i = 0; i < mtr.length; i++) {
       inverseMatr[i] = [];
       for (let j = 0; j < mtr.length; j++) {
         inverseMatr[i][j] = +(mtr[j][i] / det).toFixed(2);
       }
     }
   }
   if (mtr.length === 3) {
     inverseMatr = [];
     for (let i = 0; i < mtrCopy.length; i++) {
       mtrCopy.splice(i, 1);
       inverseMatr[i] = [];
       for (let j = 0; j < mtrCopy.length + 1; j++) {
         mtrCopy[0].splice(j, 1);
         mtrCopy[1].splice(j, 1);
         inverseMatr[i][j] = ((mtrCopy[0][0] * mtrCopy[1][1] - mtrCopy[1][0] * mtrCopy[0][1]) / det).toFixed(2);
         mtrCopy = copyArray(mtr);
         mtrCopy.splice(i, 1);
       }
       mtrCopy = copyArray(mtr);
     }
   }
   return transMatrix(inverseMatr);
 }
 
 export function createInput(elementLen) {
   const input = '<input type="number" class="matrxInput"></input>';
   let res = '';
   for (let i = 0; i < elementLen * elementLen; i++) {
     res = res.concat(input);
   }
   return res;
 }