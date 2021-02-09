
const poll_container=document.querySelector('.poll')
const submit_btn=document.querySelector('.submit_btn')
const loader_overlay=document.querySelector('.loader_overlay')

const submit_progress=`<div class="spinner-border text-light" style="width: 7rem; height: 7rem;" role="status">
<span class="visually-hidden">Loading...</span>
</div>
<h3 class='text-light'> Submiting response</h3>`

const checked=`<div style="width: 30rem; height: 30rem; display:flex;justify-content:center; align-items: center; border: 5px solid white; border-radius:50%">
<svg xmlns="http://www.w3.org/2000/svg" width="20rem"  fill="white" class="bi bi-check2-all" viewBox="0 0 16 16">
  <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7l-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
  <path d="M5.354 7.146l.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
</svg>
</div>
<h2 class='text-light mt-4'> Submitted :)</h2>`

poll_container.addEventListener('click',e=>{
    if(e.target.classList.contains('answer')){
        const answer_groups=e.target.parentElement.querySelectorAll('.answer')
        answer_groups.forEach(answer=>{
            answer.classList.remove('selected')
        })
        e.target.classList.add('selected')
    }
})

submit_btn.addEventListener('click', e=>{
    loader_overlay.style.width='100%'
    loader_overlay.innerHTML+=submit_progress

    setTimeout(function makeCheck(){
        loader_overlay.innerHTML=checked
    },5000)

})

