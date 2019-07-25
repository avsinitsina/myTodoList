let message = document.querySelector(".message"),
    buttonAdd = document.querySelector(".add"),
    ulToDo = document.querySelector(".taskList");

    let taskList = [];

    if(localStorage.getItem('todo')){
        taskList = JSON.parse(localStorage.getItem('todo'));
        displayList();
    }

    buttonAdd.addEventListener('click', function(){
        let newToDo = {
            task: message.value, 
            checked: false,
            important: false
        };

        //console.log(newToDo);
        taskList.push(newToDo);
        displayList();
        localStorage.setItem('todo', JSON.stringify(taskList));
    });

    
    function displayList(){
        let ttask = '';
        taskList.forEach(function(item, i){
            ttask += `
            <li>
            <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
            <label for='item_${i}'>${item.task}</label>
            </li>
            `;
            ulToDo.innerHTML = ttask;
        })
    }

    ulToDo.addEventListener('change', function(event){
        let idInput = event.target.getAttribute('id');
        let forLabel = ulToDo.querySelector('[for='+ idInput +']');
        let valueLabel = forLabel.innerHTML;
        taskList.forEach(function(item){
            if(item.task === valueLabel){
                item.checked = !item.checked;
                localStorage.setItem('todo', JSON.stringify(taskList));
            }
        });
    })