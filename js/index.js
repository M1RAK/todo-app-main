// Theme Toggle
const $body = document.body

const hiddenIcon = document.querySelector(".hidden-icon")
const shownIcon = document.querySelector(".shown-icon")

const currentTheme = localStorage.getItem("theme")

if(currentTheme){
    $body.classList.add("dark-theme")
}
const toggleTheme =() => {
    $body.classList.toggle("dark-theme")

    if($body.classList.contains("dark-theme")){
        localStorage.setItem("theme","currentTheme")
    }else{
        localStorage.removeItem("theme")
    }
}

hiddenIcon.addEventListener("click",toggleTheme)
shownIcon.addEventListener("click",toggleTheme)


// Sortable
const dragArea = document.querySelector(".todo-items")
new Sortable(dragArea, {
    animation:350
})