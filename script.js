const addEventBtn = document.getElementById("add-event-btn");
const eventTitleInput = document.getElementById("event-title");
const eventDescriptionInput = document.getElementById("event-description");
const eventDateInput = document.getElementById("event-date");
const eventList = document.getElementById("event-list");

let events = JSON.parse(localStorage.getItem("events")) || [];
let editIndex = null;

function renderEvents() {
    eventList.innerHTML = "";
    events.forEach((event, index) => {
        const eventItem = document.createElement("div");
        eventItem.classList.add("event-item");
        eventItem.innerHTML = `
            <div>
                <h4>${event.title}</h4>
                <p id="date">${event.date}</p>
                <p>${event.description}</p>
            </div>
            <div>
                <button class="edit-btn" onclick="editEvent(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteEvent(${index})">Delete</button>
            </div>
        `;
        eventList.appendChild(eventItem);
    });
}

function addEvent() {
    const title = eventTitleInput.value.trim();
    const date = eventDateInput.value;
    const description = eventDescriptionInput.value.trim();

    if (!title || !date || !description) return;

    if (editIndex !== null) {
        events[editIndex] = { title, date, description };
        editIndex = null;
        addEventBtn.textContent = 'Add Event';
    } else {
        events.push({ title, date, description });
    }

    localStorage.setItem('events', JSON.stringify(events));
    renderEvents();

    // Reset input fields
    eventTitleInput.value = "";
    eventDateInput.value = "";
    eventDescriptionInput.value = "";
}

function editEvent(index) {
    const event = events[index];
    eventTitleInput.value = event.title;
    eventDateInput.value = event.date;
    eventDescriptionInput.value = event.description;
    editIndex = index;
    addEventBtn.textContent = 'Update Event';
}

function deleteEvent(index) {
    events.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(events));
    renderEvents();
}

addEventBtn.addEventListener("click", addEvent);

renderEvents();
