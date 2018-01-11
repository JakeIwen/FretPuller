import { Chord } from 'tonal'

export const findChordFromNames = ({tonic, typeArr, extArr }) => {

  let usedChars = []
  let permArr = []
  let permuteInput = typeArr.concat(extArr)
  console.log({permuteInput});
  let perMutes = permute(permuteInput)
  console.log({perMutes});
  for (var i = 0; i < perMutes.length; i++) {
    let searchableName = tonic + perMutes[i]
    if (Chord.exists(searchableName))
      return searchableName
  }
  return 'unknown'

  function permute(input) {

    var i, ch;
    for (i = 0; i < input.length; i++) {
      ch = input.splice(i, 1)[0];
      usedChars.push(ch);
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
