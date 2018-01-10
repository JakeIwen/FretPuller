export const romanIvls = (ivl) => {
  let roman = romanize(ivl[0])
  return ivl[1]==='m' ? roman.toLowerCase() : roman
}
export const tuningAryToStg = ary => {
  let tuningStg = ary.map(note => /\d/.test(note) ? note : note + '2')
  console.log({tuningStg})
  return tuningStg
}

export const tuningStgToAry = stg => {
  let tuningAry = /\d/.test(stg) ? stg.split(/(\w?.\d)/).slice(0,-1) : null
  debugger
  console.log({tuningAry})
  return tuningAry
}



function romanize (num) {
	if (!+num)
		return false;
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
