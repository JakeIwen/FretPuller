import { Chord } from 'tonal'

export const findChordFromNames = ({tonic, sf, typeArr, extArr }) => {

  let usedChars = []
  let permArr = []
  let permuteInput = typeArr.concat(extArr)
  let perMutes = permute(permuteInput)
  !perMutes.length && perMutes.push('')
  // debugger
  console.log('permutes', {tonic, sf, typeArr, extArr , perMutes})
  for (var i = 0; i < perMutes.length; i++) {
    let searchableName = tonic + sf + perMutes[i]
    if (Chord.exists(searchableName))
      return searchableName
  }
  return 'unknown'

  function permute(input) {

    var i, ch;
    for (i = 0; i < input.length; i++) {
      ch = input.splice(i, 1)[0]
      usedChars.push(ch)
      if (input.length === 0) {
        permArr.push(usedChars.slice().join(''));
      }
      permute(input);
      input.splice(i, 0, ch);
      usedChars.pop();
    }
    return permArr
  }
}
