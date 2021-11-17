const button = document.querySelector('button')
const tbody = document.querySelector('tbody')
const thead = document.querySelector('thead')
const msg = document.querySelector('.msg');
const resource = './mock.json';

button.addEventListener('click', async () => {
  try {
    const data = await getData(resource)
    displayData(data)
  } catch (err) {
    msg.innerHTML = `statusCode: ${err.status} <br> statusText: ${err.statusText}`;
  }
});

function displayData(data) {
  thead.innerHTML = `<tr>
                        <th>firstName</th>
                        <th>lastName</th>
                    </tr>`
  data
    .forEach(person => {
      (tbody.innerHTML += `<tr>
                          <td>${person.first_name}</td>
                          <td>${person.last_name}</td>
                       </tr>`)
    })

}

function getData(resource) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener('readystatechange', () => {
      if (request.readyState !== 4) return
      if (request.status === 200) {
        const data = request.responseText
        const people = JSON.parse(data);
        resolve(people)
      } else {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }
    })
    request.open('GET', resource)
    request.send()
  })
}
