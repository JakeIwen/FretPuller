let first = [
  {
    "loc": {
      "crd": 4,
      "pos": 5
    },
    "midi": 64,
    "state": {
      "bgColor": "",
      "selectionText": "3M",
      "status": "unselected",
    }
  },
  {
    "loc": {
      "crd": 3,
      "pos": 5
    },
    "midi": 60,
    "state": {
      "bgColor": "",
      "selectionText": "1P",
      "status": "unselected"
    }
  }
]
let second = [
  {
    "loc": {
      "crd": 5,
      "pos": 6
    },
    "midi": 64,
    "state": {
      "bgColor": "",
      "selectionText": "3M",
      "status": "unselected",
    }
  },
  {
    "loc": {
      "crd": 1,
      "pos": 0
    },
    "midi": 60,
    "state": {
      "bgColor": "",
      "selectionText": "1P",
      "status": "unselected"
    }
  }
]
let third = [
  {
    "loc": {
      "crd": 1,
      "pos": 5
    },
    "midi": 64,
    "state": {
      "bgColor": "",
      "selectionText": "3M",
      "status": "unselected",
    }
  },
  {
    "loc": {
      "crd": 1,
      "pos": 5
    },
    "midi": 60,
    "state": {
      "bgColor": "",
      "selectionText": "1P",
      "status": "unselected"
    }
  }
]


I'm trying to build chord names with sets of substrings. Basically a tonic and some subnames are selected form a list, and combine a tonic with each of the string permutations of the subname array

For example, selecting `tonic = A` and `['M', '7', 'add4', '#'] will eventually hit on `A#M7add4`

I want to use existing selections to generate options for additional selection via
