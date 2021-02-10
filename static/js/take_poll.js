
const poll_container=document.querySelector('.poll')
const submit_btn=document.querySelector('.submit_btn')
const loader_overlay=document.querySelector('.loader_overlay')
const poll_questions=document.querySelectorAll('.poll_question_answers')
const poll_title = document.querySelector('.poll_title').innerText.trim()
const answer_overlay=document.querySelectorAll('.overlay')


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

async function postData(url = '', data = {}) {
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(data)
    });
    return response.json(); 
  }

poll_container.addEventListener('click',e=>{
    if(e.target.classList.contains('answer')){
        const answer_groups=e.target.parentElement.querySelectorAll('.answer')
        answer_groups.forEach(answer=>{
            answer.classList.remove('selected')
        })
        e.target.classList.add('selected')
    }
})

postData('/users/',{}).then(res=>{
    console.log(res)
})


submit_btn.addEventListener('click', e=>{
    loader_overlay.style.width='100%'
    loader_overlay.innerHTML+=submit_progress
    const uuid=location.pathname.split('/')[2]

    const answer_list=[]

    poll_questions.forEach(question=>{
        const answers=Array.from(question.querySelectorAll('.answer'))
        const selected_answer=question.querySelector('.selected')

        if(selected_answer !== null){
            const index=answers.indexOf(selected_answer)+1
            answer_list.push(index)
        }else{
            answer_list.push(null)
        }
        
    })

    const data={}
    data['uuid']=uuid
    data['answers']=answer_list

    postData('/answers/', data).then(data => {
    //   console.log(data); 
      setTimeout(function showResult(){
        const all_answer=document.querySelectorAll('.answer')
        loader_overlay.style.display='none'
        submit_btn.remove()
        all_answer.forEach(answer=>{
            answer.classList.remove('selected')
        })
        answer_overlay.forEach((overlay,index)=>{
            let width=parseInt((data['response'][index]/data['poll_count'])*100)
            
            
            overlay.style.display='block'
            if(width>0){
            overlay.style.width=`${width}%`
            overlay.classList.add('padded')
            }

            if(width>=50){
                overlay.innerHTML=`${width}%/100%`
            }
        })
    },7005)
    }).catch(e=>{
        console.log(e)
    });

    

    setTimeout(function makeCheck(){
        loader_overlay.innerHTML=checked
    },5000)

    
    

})

