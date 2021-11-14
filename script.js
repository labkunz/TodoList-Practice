function AddToDo(targetTag) {
    let itemNum = document.querySelector(".event-list").childNodes.length
    let eventItem = document.createElement("div")
    eventItem.classList.add("event-item")
    let eventName = document.createElement("div")
    eventName.classList.add("event-name")
    eventName.textContent = targetTag.querySelector(".input-event input").value
    eventName.dataset.value = itemNum
    let editEvent = document.createElement("button")
    editEvent.textContent = "Edit"
    editEvent.classList.add("eventEdit")
    let deleteEvent = document.createElement("button")
    deleteEvent.textContent = "Delete"
    deleteEvent.classList.add("eventDelete")
    eventItem.append(eventName)
    eventItem.append(editEvent)
    eventItem.append(deleteEvent)
    let eventList = document.querySelector(".event-list")
    eventList.append(eventItem)
    return true
}

function ClearInputValue(targetTag) {
    const inputField = targetTag.querySelector(".input-event input")
    inputField.value = ""
}

function ClearAllToDo() {
    const targetNode = document.querySelector(".event-list")
    while (targetNode.firstChild) {
        targetNode.removeChild(targetNode.lastChild)
    }
}

function DeleteToDo(targetTag) {
    let targetParent = targetTag.parentNode
    targetParent.removeChild(targetTag)
}

function EditToDo(targetTag) {
    let targetId = targetTag.getAttribute("data-target")
    const editField = document.querySelector(".edit-event")
    let editContent = editField.querySelector("input").value

    const editTarget = document.querySelector(`.event-list [data-value='${targetId}']`)
    editTarget.textContent = editContent
    
    editField.style.display = "none"
}

function ShowEdit(targetTag) {
    const editField = document.querySelector(".edit-event")
    editField.style.display = "block"

    const eventName = editField.querySelector("input")
    const editTarget = editField.querySelector("button")
    let targetId = targetTag.getAttribute("data-value")
    eventName.value = targetTag.textContent
    editTarget.setAttribute("data-target", targetId)
}

function Init() {
    const editField = document.querySelector(".edit-event")
    editField.style.display = "none"

    const addEvent = document.querySelector(".input-event button")
    const clearAllEvent = document.querySelector("#eventAllClear")
    const eventList = document.querySelector(".event-list")
    const editEvent = document.querySelector("#eventEditSave")

    addEvent.addEventListener("click", function(e) {
        let targetTag = e.target.parentNode
        let checkDone = AddToDo(targetTag)
        if (checkDone) {
            ClearInputValue(targetTag)
        }
    })
    clearAllEvent.addEventListener("click", function() {
        ClearAllToDo()
    })
    eventList.addEventListener("click", function(e) {
        if (e.target.classList.contains("eventEdit")) {
            let targetTag = e.target.parentNode.querySelector(".event-name")
            ShowEdit(targetTag)
        } else if (e.target.classList.contains("eventDelete")) {
            let targetTag = e.target.parentNode
            DeleteToDo(targetTag)
        }
    })
    editEvent.addEventListener("click", function(e) {
        EditToDo(e.target)
    })
}

Init()