import { transMatrix } from './func.js';
import { calcDeterminant } from './func.js';
import { inverseMatrix } from './func.js';
import { multMatrixAtNumber } from './func.js';
import { multMatrix } from './func.js';
import { matrixPow } from './func.js';
import { createInput } from './func.js';

const inputList = document.querySelector('.calcArea_matrixInput');
const button = document.getElementById('go-button');
const actionChoise = document.querySelector('.action_choise');
const calcArea = document.querySelector('.calcArea_matrixInput');
const outDiv = document.querySelector('.resultOutput_result');
const matrixSizeChoise = document.querySelector('.matrix_size');
const newInput = document.createElement('div');
newInput.className = 'matrixInput2';

matrixSizeChoise.onchange = () => {
  if (matrixSizeChoise[0].selected) {
    calcArea.style.width = '170px';
    calcArea.innerHTML = createInput(2);
    if (actionChoise.options[5].selected) {
      newInput.style.width = '170px';
      newInput.textAlign = 'center';
      newInput.innerHTML = createInput(2);
    }
  }
  if (matrixSizeChoise[1].selected) {
    calcArea.style.width = '270px';
    calcArea.innerHTML = createInput(3);
    if (actionChoise.options[5].selected) {
      newInput.style.width = '270px';
      newInput.textAlign = 'center';
      newInput.innerHTML = createInput(3);
    }
  }
};

actionChoise.onchange = () => {
  if (!!actionChoise.options[2].selected || !!actionChoise.options[1].selected || !!actionChoise.options[0].selected) {
    newInput.style.display = 'none';
    calcArea.before(newInput);
    return;
  }
  if (actionChoise.options[3].selected) {
    newInput.style.display = 'block';
    newInput.innerHTML = `
    <span>Множення на</span> <input type="number" class="numInput" id="num1">
    `;
    calcArea.before(newInput);
    return;
  }
  if (actionChoise.options[4].selected) {
    newInput.style.display = 'block';
    newInput.innerHTML = `
    <span>Степінь</span> <input type="number" class="numInput" id="num1">
    `;
    calcArea.before(newInput);
    return;
  }
  if (actionChoise.options[5].selected) {
    newInput.style.display = 'inline-block';
    if (matrixSizeChoise[0].selected) {
      newInput.style.width = '170px';
      newInput.textAlign = 'center';
      newInput.innerHTML = createInput(2);
    }
    if (matrixSizeChoise[1].selected) {
      newInput.innerHTML = createInput(3);
    }
    calcArea.before(newInput);
    return;
  }
};

function main() {
  const matrix = [];
  const matrix2 = [];
  let count = 0;
  let count2 = 0;
  if (matrixSizeChoise[0].selected) {
    for (let i = 0; i < 2; i++) {
      matrix[i] = [];
      for (let j = 0; j < 2; j++) {
        matrix[i][j] = +inputList.querySelectorAll('input')[count++].value;
      }
    }
  }
  if (matrixSizeChoise[1].selected) {
    for (let i = 0; i < 3; i++) {
      matrix[i] = [];
      for (let j = 0; j < 3; j++) {
        matrix[i][j] = +inputList.querySelectorAll('input')[count++].value;
      }
    }
  }

  const num1 = document.getElementById('num1');
  const mtrCopy = [...matrix];
  let res;
  if (actionChoise.options[0].selected) res = calcDeterminant(matrix);
  if (actionChoise.options[1].selected) res = transMatrix(matrix);
  if (actionChoise.options[2].selected) res = inverseMatrix(matrix);
  if (actionChoise.options[3].selected)res = multMatrixAtNumber(mtrCopy, +num1.value);
  if (actionChoise.options[4].selected) res = matrixPow(+num1.value, mtrCopy);
  if (actionChoise.options[5].selected) {
    if (matrixSizeChoise[1].selected) {
      for (let i = 0; i < 3; i++) {
        matrix2[i] = [];
        for (let j = 0; j < 3; j++) {
          matrix2[i][j] = +newInput.querySelectorAll('input')[count2++].value;
        }
      }
    }
    if (matrixSizeChoise[0].selected) {
      for (let i = 0; i < 2; i++) {
        matrix2[i] = [];
        for (let j = 0; j < 2; j++) {
          matrix2[i][j] = +newInput.querySelectorAll('input')[count2++].value;
        }
      }
    }
    res = multMatrix(matrix2, matrix);
  }
  outDiv.innerHTML = res;
}

button.addEventListener('click', main);