
class User {

  constructor(emailAddress, firstName, lastName, regDate) {
    this.userData = {
      emailAddress,
      firstName,
      lastName,
      registrationDate,
    }
  }

  save() {
    this.sendData()
  }

  sendData() {
    fetch(url, {
      method: 'post',
      headers: { "Content-type": "application/json" },
      body: {...this.userData}
    })
    .then(json)
    .then( (data) => console.log('User data saved:', data) )
    .catch( (error) => console.log('Request failed:', error) )
  }

}

class Admin extends User {

  save() {
    this.emailAddress.endsWith('@fool') && this.sendData()
  }

}
