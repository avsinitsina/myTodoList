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

        taskList.push(newToDo);
        displayList();
        localStorage.setItem('todo', JSON.stringify(taskList));
    });

    
    function displayList(){
        let ttask = '';
        if(taskList.length === 0) ulToDo.innerHTML = '';
        taskList.forEach(function(item, i){
            ttask += `
            <li>
            <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
            <label for='item_${i}' class='${item.important ? 'important' : ''}'>${item.task}</label>
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

    ulToDo.addEventListener('contextmenu', function(event){
        event.preventDefault();
        taskList.forEach(function(item, i){
            if(item.task === event.target.innerHTML)
            {
                if(event.ctrlKey || event.metaKey)
                    taskList.splice(i, 1);
                else item.important = !item.important;
                displayList();
                localStorage.setItem('todo', JSON.stringify(taskList));
            }
        })
    })

