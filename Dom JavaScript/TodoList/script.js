
const getElementById = (type) => {
   return document.getElementById(type);
} 

const createElement = (type) =>{
    return document.createElement(type);
}

const createSelect = () => {
    const select = document.createElement("select");

    
    const options = ["Pending", "In Progress", "Completed"];
    options.forEach(optionText => {
        const option = document.createElement("option");
        option.value = optionText.toLowerCase();
        option.textContent = optionText;
        select.appendChild(option);
    });

    return select;
}


const generateId = () => {
    return  Math.floor(Math.random() * 1000) + Date.now() ;
};

const formatId = (id) => {
    const idString = id.toString();
    if (idString.length > 3) {
        return idString.slice(0, 3) + "...";
    } else {
        return idString; 
    }
};


const saveToLocalStorage = (todos) => {
    
    localStorage.setItem('todos',JSON.stringify(todos));
};

const loadFromStorage = () => {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    return todos;
};

const sortTodo = (todos, key, ascending = true) => {
    return todos.sort((a, b) => {
        if (a[key] < b[key]) return ascending ? -1 : 1;
        if (a[key] > b[key]) return ascending ? 1 : -1;
        return 0;
    });
};


const createTableRow = () => {
    const id = generateId();
    const todoText = inputText.value.trim();

    

    const todos = loadFromStorage();
    todos.push({ id, todoText, status: "Pending" });
    saveToLocalStorage(todos);
    inputText.value = ''; 

    renderTable(loadFromStorage()); 
};

const setStatus = (status,select,todos,todoCell,index) => {
    const selectedStatus = select.value;
    status.textContent = selectedStatus;
    if(selectedStatus === "completed"){
        todoCell.style.color = "red";
        todoCell.style.textDecoration = "line-through";
    } else {
        todoCell.style.color = ""; 
        todoCell.style.textDecoration = "";
    }
    todos[index].status = selectedStatus;
    saveToLocalStorage(todos);
    renderTable(todos);
};


const deleteTodo = (todos,index) => {
    todos.splice(index, 1);
            saveToLocalStorage(todos);
            renderTable(todos);
        };
// const editTodo = (todos, index, todoCell) => {
//     const newTodoText = prompt("Edit your todo:", todos[index].todoText);
//     if (newTodoText && newTodoText.trim() !== "") {
//         todos[index].todoText = newTodoText.trim();
//         todoCell.textContent = newTodoText;
//         saveToLocalStorage(todos);
//         renderTable(todos); // Re-render table after edit
//     }
// };



const renderTable = (todos) => {
    const tableBody = getElementById("table-body");
    tableBody.innerHTML = ''; 

    todos.forEach((todo,index) => {
        const newRow = createElement("tr");

        const idCell = createElement("td");
        idCell.textContent = formatId(todo.id);
        newRow.appendChild(idCell);

        const todoCell = createElement("td");
        todoCell.textContent = todo.todoText;
        newRow.appendChild(todoCell);

        const statusCell = createElement("td");
        statusCell.textContent = todo.status;
        newRow.appendChild(statusCell);

        const actionsCell = createElement("td");
        const statusSelect = createSelect();
        statusSelect.value = todo.status;
        statusSelect.addEventListener("change",() =>
            setStatus(statusCell,statusSelect,todos,todoCell,index));
        actionsCell.appendChild(statusSelect);
        
        const deleteButton = createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => 
            deleteTodo(todos,index));
        actionsCell.appendChild(deleteButton)
        
        newRow.appendChild(actionsCell);

        tableBody.appendChild(newRow);
    });
};


const windowLoadHandler = () => {
    const todos = loadFromStorage();
    renderTable(todos);
};

const sortButtonHandler = () => {
    const todos = loadFromStorage();
    const sortedTodos = sortTodo(todos,"todoText",true);
    saveToLocalStorage(sortedTodos)
    renderTable(sortedTodos); 
};

const inputText = getElementById("input-text");
const inputSubmit = getElementById("input-button");
const sortButton = getElementById("sort-todo")

inputSubmit.addEventListener("click",createTableRow);
sortButton.addEventListener("click", sortButtonHandler);
window.addEventListener('load', windowLoadHandler);


