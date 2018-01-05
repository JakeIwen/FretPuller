import {Interval } from 'tonal'

let ivls = Interval.names()
let colors = ['#e6194b','#3cb44b','#ffe119','#0082c8','#f58231','#911eb4','#46f0f0','#f032e6','#d2f53c','#fabebe', '#008080', '#e6beff']
let ivlColors = {}
for (var i = 0; i < ivls.length; i++) {
  ivlColors[ivls[i]] = colors[i]
}

export default ivlColors
