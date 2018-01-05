export default {
  statusMap: {
    selected: 'yellow',
    unselected: 'white',
  },
  octaveMap: {
    2: 'rgb(95, 190, 244)',
    3: 'rgb(135, 219, 244)',
    4: 'rgb(205, 240, 247)',
    5: 'rgb(242, 246, 247)',
  },
  intervalMap: (text) => {
    switch (text.replace(/\D/g,'')) {
      case '1':
        return 'red'
      case '3':
        return 'green'
      case '5':
        return 'orange'
      case '7':
        return 'yellow'
      default:
        return 'white'
    }
  }
}
