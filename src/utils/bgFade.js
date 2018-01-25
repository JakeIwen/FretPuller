import {Animated} from 'react-native'

export const hexToRGBGray = (hex) => {
    let bigint = parseInt(hex.replace('#', '0x'), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    let avg = (r+g+b)/3
    return `rgb(${avg}, ${avg}, ${avg})`
}

export const animateLoop = (elem) => {
  Animated.loop(
    Animated.sequence([
      Animated.timing(elem, {
        toValue: 100,
        duration: 500,
      }),
      Animated.timing(elem, {
        toValue: 0,
        duration: 500
      })
    ]),
    {
      iterations: 10
    }
  ).start()
}

// const invertHexColor = (hexTripletColor) => {
//   let color = hexTripletColor;
//   color = color.substring(1); // remove #
//   color = parseInt(color, 16); // convert to integer
//   color = 0xFFFFFF ^ color; // invert three bytes
//   color = color.toString(16); // convert to hex
//   color = ("000000" + color).slice(-6); // pad with leading zeros
//   color = "#" + color; // prepend #
//   return color;
// }
//
// const interpolateFade = (elem, bgColor) =>{
//   elem.interpolate({
//     inputRange: [0, 100],
//     outputRange: [bgColor, '#FFFFFF'],
//   })
// }
