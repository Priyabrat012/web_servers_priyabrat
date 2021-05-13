

const weatherForm = document.querySelector('form');
const search = document.querySelector('input'); 
const mes1 = document.querySelector('#message-1');
const mes2 = document.querySelector('#message-2');

//mes1.textContent='From javaScript content';
mes1.textContent='Loading...';
mes2.textContent='';
weatherForm.addEventListener('submit',(e)=>{    
    e.preventDefault();     
    const location = search.value
   
fetch('/weather?address='+ location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
         console.log(data.error);
         else{
            mes1.textContent=data.location; 
         }
           console.log(data)         
    })
})
})
 
