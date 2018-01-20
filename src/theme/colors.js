import { Interval, Note } from '/src/lib/tonal.min.js'
import {arrayRotate} from '/src/utils'
let ivls = Interval.names()
export const colors = [
  '#e6194b',
  '#3cb44b',
  '#ffe119',
  '#0082c8',
  '#f58231',
  '#911eb4',
  '#46f0f0',
  '#f032e6',
  '#d2f53c',
  '#fabebe',
  '#008080',
  '#e6beff'
  ]
let hashedColors = {}
for (var i = 0; i < ivls.length; i++) {
  hashedColors[ivls[i]] = colors[i]
}

export const tonicColors = (tonic) => arrayRotate([...colors], (12-Note.chroma(tonic)))
export const ivlColors = hashedColors
