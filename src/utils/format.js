export const romanIvls = (ivl) => {
  const roman = romanize(ivl.replace(/\D/g, ''))
  return (ivl[1]==='m' || ivl[1]==='d') ? roman.toLowerCase() : roman
}
export const accFormat = text =>
  text.replace(/b/g, '\u266D').replace(/#/g, '\u266F')

export const readFormat = chord => {
  if(chord==='' || chord==='M') return 'major'
  else if(chord==='m') return 'minor'
  else return accFormat(chord)
}

export const btnFormat = (ext) => {
  switch (ext) {
    case 'o': return 'dim'
    case '+': return 'aug'
    case 'm': return 'min'
    case 'M': return 'Maj'
    default : return ext
  }
}

function romanize (num) {
	if (!+num) return false
	const	digits = String(+num).split("")
	const	key = [
    "","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
    "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
    "","I","II","III","IV","V","VI","VII","VIII","IX"
  ]
	let	roman = ""
	let	i = 3
	while (i--)
		roman = (key[+digits.pop() + (i * 10)] || "") + roman;
	return Array(+digits.join("") + 1).join("M") + roman;
}
