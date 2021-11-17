const button = document.querySelector('button')
const tbody = document.querySelector('tbody')
const thead = document.querySelector('thead')
const msg = document.querySelector('.msg');
const resource = './mock.csv';

button.addEventListener('click', () => {
  getData(resource, displayData)
});

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

function displayData(err, data) {
  if (err) {
    msg.innerHTML = `statusCode: ${err.status} <br> statusText: ${err.statusText}`;
    return
  }
  thead.innerHTML = `<tr>
                        <th>${data[0].firstName}</th>
                        <th>${data[0].lastName}</th>
                    </tr>`
  const html = data
    .filter(person => person.firstName !== 'first_name')
    .forEach(person => {
      (tbody.innerHTML += `<tr>
                          <td>${person.firstName}</td>
                          <td>${person.lastName}</td>
                       </tr>`)
    })
  console.log(html);
}

function getData(resource, callback) {
  const request = new XMLHttpRequest();
  request.addEventListener('readystatechange', () => {
    if (request.readyState !== 4) return
    if (request.status === 200) {
      const data = request.responseText
      const people = data.split('\n').map(person => {
        return new Person(person.split(',')[0], person.split(',')[1])
      }).filter(person => person.firstName !== "")
      callback(undefined, people)
    } else {
      callback({
        status: request.status,
        statusText: request.statusText
      }, undefined)
    }
  })
  request.open('GET', resource)
  request.send()
}
