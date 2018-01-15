import { Chord } from '/src/lib/tonal.min.js'

export const findChordFromNames = ({tonic, sf, type, extArr }) => {

  let usedChars = []
  let permArr = []
  let permuteInput = [type].concat(extArr)
  // debugger
  let name = tryPermutes(permuteInput, tonic, sf, type, extArr)
  if (name) return name
  permuteInput = permuteInput.map(item => item.replace('maj', 'Maj'))
  name = tryPermutes(permuteInput, tonic, sf, type, extArr)
  if (name) return name
  return 'unknown'

  function tryPermutes(permuteInput, tonic, sf, type, extArr) {
    let perMutes = permute(permuteInput)
    !perMutes.length && perMutes.push('')
    console.log('permutes', {tonic, sf, type, extArr , perMutes})
    for (var i = 0; i < perMutes.length; i++) {
      let searchableName = tonic + sf + perMutes[i]
      if (Chord.exists(searchableName))
        return searchableName
    }
  }

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
