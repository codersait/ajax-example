const button = document.querySelector('button')
const tbody = document.querySelector('tbody')
const thead = document.querySelector('thead')
const msg = document.querySelector('.msg');
const resource = './mock.json';

button.addEventListener('click', async () => {
  try {
    const response = await fetch(resource)
    if (response.status !== 200) {
      // Throwing your own errors (exceptions)
      throw {
        status: response.status,
        statusText: response.statusText
      }

    }
    console.log(response);
    const data = await response.json()
    displayData(data)
  } catch (err) {
    console.log(err);
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
