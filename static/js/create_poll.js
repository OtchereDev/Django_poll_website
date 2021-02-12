 
// normal variables
const question_btn=document.querySelector('.ques_btn')
const poll_form=document.querySelector('form')
const loader_overlay=document.querySelector('.loader_overlay')

// html holder variables
const form_submit_sec=document.createElement('div')
form_submit_sec.innerHTML=`
<div class='text-centered'>
<button type="submit" class="submit_btn btn btn-success">Register Poll</button>
</div>
`

const error=`<div class="alert alert-warning alert-dismissible fade show errors" role="alert">
<strong>Each Question</strong> needs atleast two valid answers.
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`

const checked=`<div style="width: 30rem; height: 30rem; display:flex;justify-content:center; align-items: center; border: 5px solid white; border-radius:50%">
<svg xmlns="http://www.w3.org/2000/svg" width="20rem"  fill="white" class="bi bi-check2-all" viewBox="0 0 16 16">
  <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7l-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
  <path d="M5.354 7.146l.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
</svg>
</div>
<h2 class='text-light mt-4'> Poll Registered :)</h2>`

const submit_progress=`<div class="spinner-border text-light" style="width: 7rem; height: 7rem;" role="status">
<span class="visually-hidden">Loading...</span>
</div>
<h3 class='text-light'> Registering poll</h3>`


// functions
function question_ceator(question_num){
    let question=document.createElement('div')
    question.classList.add('question_answer')
    question.classList.add('mb-3')
    question.innerHTML=` <div class='close'>
    <ion-icon name="trash-outline" class='closed'></ion-icon>
    </div><div class="${question_num} form-group">
   
    <label for="exampleInputEmail1">Enter your Poll Question</label>
    <input type="text" name='${question_num}' class="form-control my-2 question" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter question">

    <button type="button" class=" ans_btn btn btn-primary">
        Add an answer
    </button>
    </div>`

    return question
}


function answer_creator(answer_num){
    const answer=document.createElement('input')
answer.classList.add('form-control')
answer.classList.add('my-2')
answer.classList.add('answer')
answer.name=answer_num
answer.placeholder="Enter the answer"
answer.type='text'

return answer
}

function checkSubmitBtn(submit_btn){
    if (submit_btn===null){
        
        let current_ques_num= poll_form.querySelectorAll('.question_answer').length+1
        poll_form.insertBefore(question_ceator('question_'+current_ques_num),null)
        const questionEl=poll_form.querySelector('.question_answer')
        poll_form.append(form_submit_sec)
        
    }else{
        let current_ques_num= poll_form.childElementCount-3

        if (current_ques_num<=5){
        poll_form.insertBefore(question_ceator('question_'+current_ques_num),submit_btn.parentNode.parentNode)
        

        }
        
    }
}

function answerLimit(e){
    if (e.target.classList.contains('ans_btn')){
            
        const parent=e.target.parentNode

        let ques_num = parseInt(parent.classList[0].split('_')[1])

        let answer_num=parent.querySelectorAll('.answer').length +1

        const ans_btn=parent.querySelector('.ans_btn')

        if(answer_num >= 3){
            ans_btn.disabled=true
            ans_btn.style.cursor='not-allowed'
        }

        parent.insertBefore(answer_creator('answer_'+answer_num+'_q'+ques_num),ans_btn)
 
        e.stopImmediatePropagation()
    }
}

function removeSubmitBtn(){
    if(poll_form.querySelectorAll('.question_answer').length===0){
        const submit_btn=poll_form.querySelector('.submit_btn')
        if (submit_btn !== null){
            submit_btn.remove()
        }
            
    }
}

function cleanInput(all_input,answer_inputs,question_inputs){
    all_input.forEach(input=>{
        if(input.classList.contains('question')){
            question_inputs.push(input)
        }else if(input.classList.contains('answer')){
            answer_inputs.push(input)
        }
    })

}

function bundlingQueAns(question_inputs,all_input,grouped_qa){
    for(let i=0; i<question_inputs.length;i++){
        k={}
        
        k[`question${i+1}`]=question_inputs[i].value
        
        
        for(let j=0;j<all_input.length;j++){
            if(all_input[j].name.endsWith(`q${i+1}`)){
                
                let size=Object.keys(k).length
                if(size>=2){
                    k[`answer${size}`]=all_input[j].value
                }else{
                    k[`answer${size}`]=all_input[j].value
                }
            }
            
            
        }
        grouped_qa.push(k)
        
    }
}

function validateAnswerlimit(answers_list,error_box,question){
    if(answers_list.length<2 || answers_list.includes('')){
        const check_error=document.querySelector('.errors')
        
        
        if(check_error===null){
            error_box.innerHTML=error
            window.scrollTo(0,0)
        }
        throw Error('cant submit this form')
    }else{
        question.style.border='unset'
        error_box.innerHTML=''
    }
}


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

// call on load
let user

postData('/users/',{}).then(res=>{
    user = res.user
})


// event listerners
question_btn.addEventListener('click',ev=>{

    const submit_btn=poll_form.querySelector('.submit_btn')
   
    checkSubmitBtn(submit_btn)   
 
})

poll_form.addEventListener('submit',e=>{
    e.preventDefault()
    e.stopImmediatePropagation()
    
    const all_question= poll_form.querySelectorAll('.question_answer')
    const all_input=poll_form.querySelectorAll('input')
    const poll_description=poll_form.querySelector('textarea.poll_description').value
    const poll_title=poll_form.querySelector('input.poll_title').value
    const type_of_voters=poll_form.querySelector('input.signed_voters').checked

    const question_inputs=[]
    const answer_inputs=[]

    cleanInput(all_input,answer_inputs,question_inputs)

    const about_poll={
        'poll_title':poll_title,
        'poll_description':poll_description,
        'sign_in_voters':type_of_voters,
        'author':user
    }

    const grouped_qa=[]

    grouped_qa.push(about_poll)

    bundlingQueAns(question_inputs,all_input,grouped_qa)

    all_question.forEach(question=>{
        const answers=question.querySelectorAll('.answer')
        const answers_list=[]
        answers.forEach(answer=>{
            answers_list.push(answer.value)
        })
        const error_box=document.querySelector('.error_box')
        validateAnswerlimit(answers_list,error_box,question)
    })

    postData('/create/',grouped_qa).then(data =>{
        const submit_btn=document.querySelector('.submit_btn')
        setTimeout(function removeOverlay(){
            
            loader_overlay.style.display='none'
            submit_btn.remove()
            
        },7005)

        setTimeout(()=>{
            // then redirect to home page
            location.href='/'
        },7500)
    })

    loader_overlay.style.width='100%'
    loader_overlay.innerHTML+=submit_progress

    setTimeout(function makeCheck(){
        
        loader_overlay.innerHTML=checked
    },5000)

    poll_form.reset()
    
})

poll_form.addEventListener('click',e=>{

    answerLimit(e)

    if (e.target.classList.contains('closed')){
        e.target.parentNode.parentNode.remove()
    }

    removeSubmitBtn()
})
