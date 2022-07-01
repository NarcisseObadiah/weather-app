

 console.log('Client side page loaded')


 const weatherForm = document.querySelector('form')
 const search = document.querySelector('input')
 const messageOne = document.querySelector('#message-1')
 const messageTwo = document.querySelector('#message-2')

 weatherForm.addEventListener('submit',(e) =>{
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent =''

    fetch('http://localhost:3000/weather?address='+ location).then((response) => {
    response.json().then((data) => {
        if(data.error){
           messageOne.textContent = data.error
        }else{
           messageOne.textContent = ' Les informations concernant la region demandée: '+ data.forecast
           messageTwo.textContent =  ' la latitude de cette region est de : ' + data.latitude +' et sa longitude est de : '+ data.longitude
        }
    })
})

    
 })