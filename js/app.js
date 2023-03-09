const selectElement = (selector) => {
  const element = document.querySelector(selector)
  if(element) return element;
  throw new Error(`Something went wrong with ${selector}. Make sure it exist or is well defined.`)
}

const $todoInput = selectElement("#todo-input")
const $todoItems = selectElement(".todo-items")
const $filters = document.querySelectorAll(".todo-filter small")

let todos = JSON.parse(localStorage.getItem("todo-list")) 

// edit values
let editId;
let isEditedTodo = false

// Getting input values
$todoInput.addEventListener("keyup", (e) =>{
  let userTodo = $todoInput.value.trim()

  if(e.key === "Enter" && userTodo){
    addTodo(userTodo)
  } 
})

// Adding Todo
function addTodo(userTodo){
  if(!$todoInput.value) return
 if(!isEditedTodo){
  if (!todos) todos = []

  let todoInfo = {
   task:userTodo,
   status:"active",
 }
 todos.push(todoInfo)
 } else{
  isEditedTodo = false;
  todos[editId].task = userTodo;
 }
  $todoInput.value = ''
  localStorage.setItem("todo-list",JSON.stringify(todos))
  displayTodo("all")
}

// Display todo
function displayTodo(filter){
  if(!todos) return
  let tasks = ''

  todos.forEach((todo,_id )=> {
      // Is checked
   let isChecked = todo.status == "completed" ? "checked" : '';
   if(filter == todo.status || filter == "all"){
    tasks += `<div>
    <li class="todo-list">
    <div  onclick="toggleChecked(this)" id="${_id}" class="todo-check ${isChecked}">
   <span>
     <img class="hidden-check" src="./images/icon-check.svg" alt="icon-check">
   </span>
 </div>
 <p onclick="editTodo(${_id}, '${todo.task}')" class="todo-text">${todo.task}</p>
      <span onclick='deleteTodo("${_id}")' class="todo-delete">
       <img src="./images/icon-cross.svg" alt="icon-cross">
      </span>
     </li>
     <hr></div>
 `
}
  })
  $todoItems.innerHTML = tasks
  getLength()
}
displayTodo("all")

// Edit todo
function editTodo(todo_id,todo_task){
    editId = todo_id;
    isEditedTodo = true;
    $todoInput.value = todo_task
}

// TOGGLE CHECKED
function toggleChecked(element){
  
    element.classList.toggle("checked")
     isChecked = element.classList.contains("checked")
 if(isChecked){
        isChecked = true
        todos[element.id].status = "completed"
        getLength()
      }else{
        getLength()
        isChecked = false
        todos[element.id].status = "active"
 }
 localStorage.setItem("todo-list",JSON.stringify(todos))
}

// Delete todo
function deleteTodo(todo_id){
  todos.splice(todo_id,1)
  localStorage.setItem("todo-list",JSON.stringify(todos))
  displayTodo("all")
}

// Clear All-completed.
const clearBtn = selectElement(".todo-clear")

function clearAll(){
 let deleted = todos.filter(todo => todo.status !== "completed")
  todos = deleted
  localStorage.setItem("todo-list",JSON.stringify(todos))
  displayTodo("all")
}


clearBtn.addEventListener("click", clearAll)

// filters
$filters.forEach(filter => {
  filter.addEventListener("click",() => {
    const filter_id = filter.className
    selectElement("small.activated").classList.remove("activated")
    filter.classList.add("activated")
    displayTodo(filter_id)
  })
})

// todo length
function getLength(){
  const allLength = document.querySelectorAll(".todo-list")
  const checkedLength = document.querySelectorAll(".checked")
  const count = allLength.length - checkedLength.length
  selectElement(".todo-length").innerHTML =
  `<small>${count}${count == 1 ? " item": ' items'} left</small>`
}

getLength()