/*
 * @Description: 
 * @Author: hezhijie
 * @Date: 2021-03-15 16:52:42
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-03-24 00:33:49
 */

// function Foo () {
//   getName = function () {
//     console.log(1);
//   }
//   return this;
// }

// Foo.getName = function () {
//   console.log(2);
// }

// Foo.prototype.getName = function () {
//   console.log(3);
// }

// var getName = function () {
//   console.log(4);
// }

// function getName () {
//   console.log(5);
// }

// Foo.getName();
// getName();
// Foo().getName();
// getName();
// new (Foo.getName)();
// (new Foo()).getName();

let arr = [1, 4, 6, 9, 2, 4, 7, 5, 4, 9, 10, 15, 5];

let count = 0;

// 冒泡排序
function bubleSort (arr) {
  for (let i = 0; i < arr.length - 1; i++){
    for (let j = i + 1; j < arr.length; j++){
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
}

//选择排序
function selectSort (arr) {
  let min;
  for (let i = 0; i < arr.length - 1; i++){
    min = i;
    for (let j = i + 1; j < arr.length; j++){
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if (i != min) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
    }
  }
  return arr;
}

//插入排序
var insertSort = function(arr) {
  var len = arr.length;
  for (let i = 1; i < len; i++) {
    let j = i;
    let min = arr[i];
    while (--j > -1) {
      if (arr[j] > min) {
        arr[j + 1] = arr[j];
      } else {
        break;
      }
    }
    arr[j + 1] = min;
  }
  return arr;
};

//希尔排序
console.log(insertSort(arr));

// 二分查找
function binarySort (arr, target, left, right) {
  console.log(left, right);
  if (left > right) return -1;
  let mid = Math.floor((left + right) / 2);
  if (arr[mid] == target) {
    return mid;
  }
  else {
    if (arr[mid] < target) {
      return binarySort(arr, target, mid + 1, right);
    }
    return binarySort(arr, target, left, mid - 1);
  }
}
//console.log(binarySort(arr, 11, 0, 9));