import {Note} from 'src/lib/tonal.min.js'

export const tokenize = (name) => {
  var p = Note.tokenize(name);
  if (p[0] === "") { return ["", name]; }

  // 6 and 7 and 9 11 13 are consider part of the chord
  if (p[0] !== "" && (
    p[2][0] === "6" || p[2][0] === "7" || p[2][0] === "9" ||
    (p[2][0] + p[2][1]) === "11" || (p[2][0] + p[2][1]) === "13")
  ) {
    return [p[0] + p[1], p[2] + p[3]];
  } else {
    return [p[0] + p[1] + p[2], p[3]];
  }
}
