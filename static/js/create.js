const create_btn=document.querySelector('.create_btn')
const create_title=document.querySelector('.create_title')
const content_box=document.querySelector('.create_box .content')
const holder=document.querySelector('.holder')
const poll_create=document.querySelector('.poll_create')
const poll_create_btn=document.querySelector('button.poll_create')

const title_div=`
<div class="d-flex justify-content-between" style="width: 100%;">
        <h2 class='text-muted text-centered  create_title'>
        Create Your Poll below
           </h2>
        <button class="btn btn-success ques_btn d-inline">
           Add a question
        </button>
    </div>
`
const form=`
<form action="" method="post" class='poll_form my-3'>
    <h4>Add a question</h4>
    <input type='text' name='poll_title' placeholder='Poll Title' required class="form-control my-2" ></input>
    <div class="input-group mb-3">
       
        <textarea class="form-control" required name='description' placeholder='Poll description*' aria-label="With textarea"></textarea>
    </div>
</form>`




function question_ceator(question_num){
    let question=document.createElement('div')
    question.classList.add('question_answer')
    question.classList.add('mb-3')
    question.innerHTML=` <div class='close'>
    <ion-icon name="trash-outline" class='closed'></ion-icon>
    </div><div class="${question_num} form-group">
   
    <label for="exampleInputEmail1">Enter your Poll Question</label>
    <input type="text" name='${question_num}' class="form-control my-2" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter question">

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
answer.classList.add(answer_num)
answer.placeholder="Enter the answer"
answer.type='text'

return answer
}



const form_submit_sec=`
<div class='text-centered'>
<button type="button" class="submit_btn btn btn-success">Register Poll</button>
</div>
`




create_btn.addEventListener('click',e=>{
 
    holder.innerHTML=''

    holder.classList.remove('create_box')

    holder.style.width='80%'

    holder.innerHTML=title_div+form

    const question_btn=document.querySelector('.ques_btn')
    const poll_form=document.querySelector('form')
    // console.log(form)
    
    question_btn.addEventListener('click',ev=>{
    

        // poll_form.innerHTML+=question

        const submit_btn=poll_form.querySelector('.submit_btn')

        

        if (submit_btn===null){
            
            let current_ques_num= poll_form.querySelectorAll('div').length+1
            poll_form.insertBefore(question_ceator('question_'+current_ques_num),null)
            const questionEl=poll_form.querySelector('.question_answer')
            poll_form.innerHTML += form_submit_sec
            
        }else{
            let current_ques_num= poll_form.childElementCount-1
            poll_form.insertBefore(question_ceator('question_'+current_ques_num),submit_btn.parentNode)
        }
        

        poll_form.addEventListener('click',e=>{
            if (e.target.classList.contains('ans_btn')){
                
                const parent=e.target.parentNode

                let ques_num = parseInt(parent.classList[0].split('_')[1])

                let answer_num=parent.querySelectorAll('.answer').length +1

                const ans_btn=parent.querySelector('.ans_btn')

                parent.insertBefore(answer_creator(answer_num),ans_btn)

               
                
                e.stopImmediatePropagation()
            }

            if (e.target.classList.contains('closed')){
                e.target.parentNode.parentNode.remove()
            }
        })
        
    })
    


   
  
})