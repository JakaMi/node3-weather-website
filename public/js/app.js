/* console.log('Clientside javascript file is loaded!')

fetch('http://puzzle.mead.io/puzzle').then(response => {
    response.json().then((data) => {
        console.log(data)
    })
}) */

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageLocation = document.querySelector('#locationP')
const messageForecast = document.querySelector('#forecastP')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageLocation.textContent = 'Loading...'
    messageForecast.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then(response => {
    response.json().then(data => {

        if (data.error) {
            //console.log(data.error)
            messageLocation.textContent = data.error
            messageForecast.textContent = ''
        }else{
            //console.log(data.location)
            //console.log(data.forecast)
            messageLocation.textContent = data.location
            messageForecast.textContent = data.forecast
        }
    })
})
})