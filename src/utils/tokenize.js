import {Note} from '../../src/lib/tonal.min.js'

export const tokenize = (name) => {
  const p = Note.tokenize(name);
  if (p[0] === "") return ["", name];
  const pos1 = p[2][0]
  const pos2 = pos1 + p[2][1]
  // 6 and 7 and 9 11 13 are consider part of the chord
  if (
    pos1 === "4" ||
    pos1 === "5" ||
    pos1 === "6" ||
    pos1 === "7" ||
    pos1 === "9" ||
    pos2 === "11" || 
    pos2 === "13"
  )
    return [p[0] + p[1], p[2] + p[3]];
   else
    return [p[0] + p[1] + p[2], p[3]];

}
