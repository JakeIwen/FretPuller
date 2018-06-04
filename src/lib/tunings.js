export const tuningsNested = {
	"Mandolin": {
		"Standard": ["G3", "D4", "A4", "E5"],
		"Mandola": ["C3", "G3", "D4", "A4"]
	},

	"Bass": {
		"Standard": ["E1", "A1", "D2", "G2"]
	},

	"Guitar": {
		"Standard": ["E2", "A2", "D3", "G3", "B3", "E4"],
		"Drop D": ["D2", "A2", "D3", "G3", "B3", "E4"],
		"Celtic": ["D2", "A2", "D3", "G3", "A3", "D4"],
		"Open D": ["D2", "A2", "D3", "F#3", "A3", "D4"],
		"Open G": ["D2", "G2", "D2", "G2", "B3", "D4"],
	},

	"Ukelele": {
		"Standard": ["G4", "C4", "E4", "A4"],
		"Baritone": ["D3", "G3", "B3", "E4"]
	}
}

export const tunings = [{
		name: "Mandolin",
		value: ["G3", "D4", "A4", "E5"]
	},
	{
		name: "Mandola",
		value: ["C3", "G3", "D4", "A4"]
	},
	{
		name: "Bass",
		value: ["E1", "A1", "D2", "G2"]
	},
	{
		name: "Guitar",
		value: ["E2", "A2", "D3", "G3", "B3", "E4"]
	},
	{
		name: "Drop D",
		value: ["D2", "A2", "D3", "G3", "B3", "E4"]
	},
	{
		name: "Celtic",
		value: ["D2", "A2", "D3", "G3", "A3", "D4"]
	},
	{
		name: "Open D",
		value: ["D2", "A2", "D3", "F#3", "A3", "D4"]
	},
	{
		name: "Open G",
		value: ["D2", "G2", "D2", "G2", "B3", "D4"]
	},
	{
		name: "Bariton Uke",
		value: ["D3", "G3", "B3", "E4"]
	},
	{
		name: "Ukelele",
		value: ["G4", "C4", "E4", "A4"]
	}
]

export const stringsOnly = tunings.map( t => (t.value || []).join('') )
