const addEventBtn = document.getElementById("add-event-btn");
const eventTitleInput = document.getElementById("event-title");
const eventDescriptionInput = document.getElementById("event-description");
const eventDateInput = document.getElementById("event-date");
const eventList = document.getElementById("event-list");

let events = JSON.parse(localStorage.getItem("events")) || [];

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
    const description = eventDescriptionInput.value.trim();
    const date = eventDateInput.value.trim();

    if (title && description && date) {
        const newEvent = {
            title,
            description,
            date
        };
        events.push(newEvent);
        localStorage.setItem("events", JSON.stringify(events));
        renderEvents();
        eventTitleInput.value = "";
        eventDescriptionInput.value = "";
        eventDateInput.value = "";
    }
}

function deleteEvent(index) {
    events.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(events));
    renderEvents();
}

function editEvent(index) {
    const event = events[index];
    eventTitleInput.value = event.title;
    eventDescriptionInput.value = event.description;
    eventDateInput.value = event.date;

    addEventBtn.textContent = "Update Event";

    addEventBtn.onclick = function() {
        updateEvent(index);
    };
}

function updateEvent(index) {
    const title = eventTitleInput.value.trim();
    const description = eventDescriptionInput.value.trim();
    const date = eventDateInput.value.trim();

    if (title && description && date) {
        events[index] = {
            title,
            description,
            date
        };
        localStorage.setItem("events", JSON.stringify(events));
        renderEvents();

        eventTitleInput.value = "";
        eventDescriptionInput.value = "";
        eventDateInput.value = "";
        addEventBtn.textContent = "Add Event";
        addEventBtn.onclick = addEvent;
    }
}

addEventBtn.addEventListener("click", addEvent);

renderEvents();

let editIndex = null;

function addEvent() {
  const title = document.getElementById('event-title').value.trim();
  const date = document.getElementById('event-date').value;
  const description = document.getElementById('event-description').value.trim();

  if (!title || !date || !description) return;

  if (editIndex !== null) {
    events[editIndex] = { title, date, description };
    editIndex = null;
    document.getElementById('add-event-btn').textContent = 'Add Event';
  } else {
    events.push({ title, date, description });
  }

  localStorage.setItem('events', JSON.stringify(events));
  renderEvents();
  document.getElementById('event-form').reset();
}

function editEvent(index) {
  const event = events[index];
  document.getElementById('event-title').value = event.title;
  document.getElementById('event-date').value = event.date;
  document.getElementById('event-description').value = event.description;
  editIndex = index;
  document.getElementById('add-event-btn').textContent = 'Update Event';
}
