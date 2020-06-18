console.log('this is from app.js bro!')

// fetch('https://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })






const weatherForm = document.querySelector('form');        //ini seperti fungsi css
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

// messageOne.textContent = 'i try, baby' ;
// messageTwo.textContent = 'i love you';

weatherForm.addEventListener('submit', (e) => {         //e = event
    e.preventDefault()                                  //pakai 'v ' bukan 'f'

    const location = search.value

    messageOne.textContent = 'Loading...';   // loading and then 
    messageTwo.textContent = '';             // kosong .. and proses   (cd seperti proses refresh)

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {

        if (data.error) {               //menangkap proses data yg lain,  
            console.log (data.error);   // print data yg lain
            messageOne.textContent = data.error; 
        } else{
            console.log(data.location);
            console.log(data.forecast);

            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast.weather[0] + ' and ' +  data.forecast.Temperature + " celcius"                
        }
     })
   })



})