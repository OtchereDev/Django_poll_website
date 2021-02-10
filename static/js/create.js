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
        <button class="btn btn-success ques_btn d-inline-flex align-items-center">
            <svg class="mx-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
        </svg>Add a question
        </button>
    </div>
`
const form=`
<form action="" method="post" class='poll_form my-3'>
    <h4>Add a question</h4>
    <input type='text' name='poll_title' placeholder='Poll Title' required class="form-control my-2 poll_title" ></input>
    <div class="input-group mb-3">
       
        <textarea class="form-control poll_description" required name='description' placeholder='Poll description*' aria-label="With textarea"></textarea>
    </div>
</form>`


const error=`<div class="alert alert-warning alert-dismissible fade show errors" role="alert">
<strong>Each Question</strong> needs atleast two valid answers.
<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`




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


const form_submit_sec=`
<div class='text-centered'>
<button type="submit" class="submit_btn btn btn-success">Register Poll</button>
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
            
            let current_ques_num= poll_form.querySelectorAll('.question_answer').length+1
            poll_form.insertBefore(question_ceator('question_'+current_ques_num),null)
            const questionEl=poll_form.querySelector('.question_answer')
            poll_form.innerHTML += form_submit_sec
            
        }else{
            let current_ques_num= poll_form.childElementCount-3

           if (current_ques_num<=5){
            poll_form.insertBefore(question_ceator('question_'+current_ques_num),submit_btn.parentNode)
            

           }
          
        }
        

        poll_form.addEventListener('click',e=>{

            
            if (e.target.classList.contains('ans_btn')){
                
                const parent=e.target.parentNode

                console.log(parent.classList[0])

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

            if (e.target.classList.contains('closed')){
                e.target.parentNode.parentNode.remove()
            }

            if(poll_form.querySelectorAll('.question_answer').length===0){
                const submit_btn=poll_form.querySelector('.submit_btn')

                submit_btn.remove()
            }
        })

        poll_form.addEventListener('submit',e=>{
            e.preventDefault()
            e.stopImmediatePropagation()
            
            const all_question= poll_form.querySelectorAll('.question_answer')

            const all_input=poll_form.querySelectorAll('input')
            

            const question_inputs=[]
            const answer_inputs=[]
            all_input.forEach(input=>{
                if(input.classList.contains('question')){
                    question_inputs.push(input)
                }else if(input.classList.contains('answer')){
                    answer_inputs.push(input)
                }
            })

            const poll_description=poll_form.querySelector('textarea.poll_description').value
            const poll_title=poll_form.querySelector('input.poll_title').value

            const about_poll={
                'poll_title':poll_title,
                'poll_description':poll_description
            }

            const grouped_qa=[]

            grouped_qa.push(about_poll)
          

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

            console.log(grouped_qa)

            // postData('/create/',grouped_qa).then(data=>{
            //     console.log(data)
            // }).catch(e=>{
            //     console.log(e)
            // })

            postData('/create/',grouped_qa).then(data =>{
                console.log(data)
            })
            

            all_question.forEach(question=>{
                const answers=question.querySelectorAll('.answer')
                const answers_list=[]
                answers.forEach(answer=>{
                    answers_list.push(answer.value)
                })
                // console.log(question)
                const error_box=document.querySelector('.error_box')
                // console.log(answers_list)
                if(answers_list.length<2 || answers_list.includes('')){
                    const check_error=document.querySelector('.errors')
                    
                    console.log(check_error)
                    if(check_error===null){
                        error_box.innerHTML=error
                    }
                }else{
                    question.style.border='unset'
                    error_box.innerHTML=''
                    // console.log('submited')
                    // poll_form.reset()
                }
            })
            // console.log(all_question)
            

            // console.log(Array.from(poll_form.querySelectorAll('input,textarea')).reduce((acc,input)=>({...acc,[input.name]:input.value}),{}))
        })

      
        
    })


    
    


   
  
})