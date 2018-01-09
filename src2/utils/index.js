export const permute = (input) => {
  let usedChars = []
  let permArr = []
  let i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length === 0) {
      permArr.push(usedChars.slice());
    }
    permute(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr
}

// const majorSwap = (stType, newType) => {
//   let majOld = stType.substr(0, 2)==='Maj'
//   let majNew = newType.substr(0, 2)==='Maj'
//   let mOld = !majOld && stType[0]==='M'
//   let mNew = !majNew && newType[0]==='M'
//   if (majOld && mNew)
//     return newType.substr(1, 20).replace(stType.substr(3,20), '')
//   if (mOld && majNew)
//     return newType.substr(3, 20).replace(stType.substr(1,20), '')
//   return newType.replace(stType, '')
//
// }
