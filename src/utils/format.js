export const romanIvls = (ivl) => {
  let roman = romanize(ivl.replace(/\D/g, ''))
  return (ivl[1]==='m' || ivl[1]==='d') ? roman.toLowerCase() : roman
}
export const accFormat = text =>
  text.replace(/b/g, '\u266D').replace(/#/g, '\u266F')

function romanize (num) {
	if (!+num) return false;
	var	digits = String(+num).split(""),
		key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
		       "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
		       "","I","II","III","IV","V","VI","VII","VIII","IX"],
		roman = "",
		i = 3;
	while (i--)
		roman = (key[+digits.pop() + (i * 10)] || "") + roman;
	return Array(+digits.join("") + 1).join("M") + roman;
}
