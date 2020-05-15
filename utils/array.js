const groupeArray = (arr, size) => {
  var step = 0, sliceArr = [], len = arr.length;
  while (step < len) {
    sliceArr.push(arr.slice(step, step += size));
  }
  return sliceArr;
}

module.exports = { groupeArray }