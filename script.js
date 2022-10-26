console.log("I am a script");
window.addEventListener('load', ()=>{
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");
    //declaring a number to place in the text
    let num = 1;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const task = input.value;
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        //Adding js validation
        if (input.value.length <= 3){
            alert("A task should be at least 3 characters long.");
            return;
        }

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;

        //Adding number to the beginning of task
        //Creating its own div for more dynamic numbering, i.e changes when items are deleted as well as added
        const task_number_el = document.createElement('div');
        task_number_el.classList.add('number');
        task_number_el.type = 'text';
        task_number_el.innerHTML = num;
        task_content_el.appendChild(task_number_el);
        
        task_input_el.setAttribute("readonly","readonly");
        task_content_el.appendChild(task_input_el);

        const task_action_el = document.createElement('div');
        task_action_el.classList.add('action');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';

        const task_del_el = document.createElement('button');
        task_del_el.classList.add('delete');
        task_del_el.innerText = 'Delete';

        task_action_el.appendChild(task_edit_el);
        task_action_el.appendChild(task_del_el);

        input.value = '';
        
        //Incrementing the number in preparation of the next task
        num++;

        task_el.appendChild(task_action_el);

        list_el.appendChild(task_el);

        task_edit_el.addEventListener('click', (e) => {
            if(task_edit_el.innerText.toLowerCase()=="edit"){
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            }else{
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
            }
        });

        task_del_el.addEventListener('click', (e)=>{
            
            //Logic to the delete event to update the numbers in the list
            let el = task_el.nextElementSibling;

            while (el){
                el.firstChild.firstChild.innerHTML--;
                el = el.nextElementSibling;
            }

            list_el.removeChild(task_el);

            //Decrementing the number so that any new task is numbered appropriately
            num--;

        });
   })
});