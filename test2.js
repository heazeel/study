/*
 * @Description: 
 * @Author: hezhijie
 * @Date: 2021-03-24 00:34:03
 * @LastEditors: hezhijie
 * @LastEditTime: 2021-03-25 23:05:04
 */

p1 = new Promise((resolve, reject) => {
  console.log('1');
  setTimeout(() => {
    resolve();
  }, 0);
})
p2 = new Promise((resolve, reject) => {
  console.log('2');
  resolve();
})
p1.then(() => {
  console.log('3')
})
p2.then(() => {
  console.log('4')
})
