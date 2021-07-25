const listItems = []
const lista = document.getElementById("items")
const form = document.getElementById('addForm')
const itemInput = document.getElementById("input-field")
const msg = document.getElementById("msg")

form.addEventListener('submit', function(e) {
    e.preventDefault()
    addItem()
})

lista.addEventListener("click", deleteItem)

// Adds an item to the UI and Array and updates the URL hash
function addItem() {

    if (itemInput.value === "") {
        msg.innerHTML = "Please add an item."
        $("#msg").addClass("error");

        setTimeout( () => {
            $("#msg").removeClass("error")
            $("#msg").empty()
        }, 2000)
    } else {

        const li = document.createElement("li")
        li.className = "list-group-item"

        const para = document.createElement("p")
        para.className = "item-tag"
        para.textContent = `${itemInput.value}`

        li.appendChild(para)

        const deleteBtn = document.createElement("i")
        deleteBtn.className = "fas fa-times-circle icon delete"

        li.appendChild(deleteBtn)
        lista.appendChild(li)

        listItems.push(li.textContent)
        console.log(listItems)

        // Clear input
        itemInput.value = ""

        // Adds items to the URL hash
        if (history.pushState) {
            const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + listItems;
            window.history.replaceState({path:newurl},'',newurl);
        }

    }
}

// Removes li from the UI and from Array and updates the URL hash
function deleteItem (e) {
    if (e.target.classList.contains('delete')) {
        if(confirm("Are you sure?")) {
            let li = e.target.parentNode
            lista.removeChild(li)
            console.log("Removed: ", li.textContent)
            let idx = listItems.indexOf(li.textContent)
            listItems.splice(idx, 1)            

            console.log(listItems)
            console.log(li.textContent)

            if (history.pushState) {
                const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + listItems;
                window.history.replaceState({path:newurl},'',newurl);
            }
         }
     }
}

