// =========================================================================
// JavaScript Exercises 1-14: Local Community Event Portal
// Highly structured and commented for Cognizant Technical Round preparation
// =========================================================================

// Global variable to store loaded events dynamically across sections
let loadedEventsList = [];

// =========================================================================
// Exercise 1: JavaScript Basics & Setup
// =========================================================================
{
    console.log("Welcome to the Community Portal");

    window.onload = function() {
        alert("Page Loaded Successfully");
        
        // Connect and load HTML5 saved preferences
        if (typeof loadPreference === "function") {
            loadPreference();
        }
        
        // Execute dynamic loading (Exercise 9)
        loadEventsAsync();
    };
}

// =========================================================================
// Exercise 2: Syntax, Data Types, and Operators
// =========================================================================
{
    const eventName = "Opening Event";
    const eventDate = "29-05-2026";
    let availableSeats = 50;

    console.log(
        `Event: ${eventName}, Date: ${eventDate}, Seats: ${availableSeats}`
    );

    availableSeats--;

    console.log(
        `Seats after registration: ${availableSeats}`
    );
}

// =========================================================================
// Exercise 3: Conditionals, Loops, and Error Handling
// =========================================================================
{
    const events = [
        {name:"Opening Event", seats:50},
        {name:"Budget Meeting", seats:0}
    ];

    events.forEach(function(event){
        if(event.seats > 0){
            console.log(`${event.name} Available`);
        }
        else{
            console.log(`${event.name} Full`);
        }
    });

    try{
        let seats = 0;
        if(seats <= 0){
            throw new Error("No Seats Available");
        }
    }
    catch(error){
        console.log(error.message);
    }
}

// =========================================================================
// Exercise 4: Functions, Scope, Closures, Higher-Order Functions
// =========================================================================
{
    const events = [];
    
    // Declared local sampleEvents to prevent ReferenceError
    const sampleEvents = [
        { name: "Opening Event", category: "Community" },
        { name: "Music Concert", category: "Music" },
        { name: "Budget Meeting", category: "Community" }
    ];

    function addEvent(eventName){
        events.push(eventName);
    }

    function registerUser(userName,eventName){
        console.log(
            `${userName} registered for ${eventName}`
        );
    }

    function filterEventsByCategory(category){
        return sampleEvents.filter(
            event => event.category === category
        );
    }

    function registrationTracker(){
        let count = 0;
        return function(){
            count++;
            return count;
        };
    }

    const musicTracker = registrationTracker();

    console.log(musicTracker());
    console.log(musicTracker());

    function filterEvents(callback){
        return sampleEvents.filter(callback);
    }
}

// =========================================================================
// Exercise 5: Objects and Prototypes
// =========================================================================
{
    class Event{
        constructor(name,date,seats,category){
            this.name = name;
            this.date = date;
            this.seats = seats;
            this.category = category;
        }
    }

    Event.prototype.checkAvailability = function(){
        return this.seats > 0;
    };

    const event1 = new Event(
        "Opening Event",
        "29-05-2026",
        50,
        "Community"
    );

    console.log(
        event1.checkAvailability()
    );

    Object.entries(event1)
    .forEach(function(entry){
        console.log(
            entry[0],
            entry[1]
        );
    });
}

// =========================================================================
// Exercise 6: Arrays and Methods
// =========================================================================
{
    const events = [
        {
            name: "Opening Event",
            category: "Community"
        },
        {
            name: "Music Concert",
            category: "Music"
        }
    ];

    events.push({
        name: "Dance Festival",
        category: "Music"
    });

    const musicEvents = events.filter(
        event => event.category === "Music"
    );

    console.log(musicEvents);

    const eventCards = events.map(
        event => `Event: ${event.name}`
    );

    console.log(eventCards);
}

// =========================================================================
// Exercise 7: DOM Manipulation
// =========================================================================
{
    const container = document.querySelector("#eventContainer");
    const events = [
        { name: "Opening Event", seats: 50 },
        { name: "Budget Meeting", seats: 0 }
    ];

    if (container) {
        events.forEach(event => {
            const card = document.createElement("div");
            card.className = "event-stub"; // styled stub
            card.style.border = "1px dashed wheat";
            card.style.margin = "5px 0";
            card.style.padding = "5px";
            card.textContent = `[JS Stub] ${event.name} - Seats Available: ${event.seats}`;
            container.append(card);
        });
    }
}

// =========================================================================
// Exercise 8: Event Handling
// =========================================================================
// Hooks custom search and category filter event handling (Task 8)
function setupPortalEventHandlers() {
    const searchInput = document.getElementById("search-input");
    const categorySelect = document.getElementById("filter-category");

    // keydown/keyup handler for quick search by name
    if (searchInput) {
        searchInput.addEventListener("keyup", function(e) {
            console.log(`Search query entered: ${searchInput.value}`);
            filterAndDisplayPortalEvents();
        });
    }

    // onchange handler on category select
    if (categorySelect) {
        categorySelect.addEventListener("change", function(e) {
            console.log(`Category filter changed to: ${categorySelect.value}`);
            filterAndDisplayPortalEvents();
        });
    }
}

// Pre-fill the form registration input when "Register Now" is clicked on a card
function triggerCardRegistration(eventName) {
    console.log(`User clicked Register for dynamic card: ${eventName}`);
    const nameInput = document.getElementById("name");
    const eventSelect = document.getElementById("event-type");

    if (nameInput) {
        nameInput.focus();
        nameInput.scrollIntoView({ behavior: 'smooth' });
    }

    if (eventSelect) {
        // Pre-select matching select option
        if (eventName.toLowerCase().includes("opening")) {
            eventSelect.value = "opening event";
        } else if (eventName.toLowerCase().includes("budget")) {
            eventSelect.value = "budget meeting";
        } else {
            // dynamically add option if not exists
            let optionExists = false;
            for (let i = 0; i < eventSelect.options.length; i++) {
                if (eventSelect.options[i].value === eventName.toLowerCase()) {
                    optionExists = true;
                    break;
                }
            }
            if (!optionExists) {
                const opt = document.createElement("option");
                opt.value = eventName.toLowerCase();
                opt.textContent = eventName;
                eventSelect.appendChild(opt);
            }
            eventSelect.value = eventName.toLowerCase();
        }
        
        // Fire custom functions from HTML5 exercises
        if (typeof showFee === "function") showFee();
        if (typeof savePreference === "function") savePreference();
    }
}

// =========================================================================
// Exercise 9: Async JS, Promises, Async/Await
// =========================================================================
// Fetches events dynamically from mock local JSON endpoint with loading spinner
async function loadEventsAsync() {
    const spinner = document.getElementById("loadingSpinner");
    const container = document.querySelector("#eventContainer");

    if (spinner) spinner.style.display = "block";
    if (container) container.innerHTML = "";

    console.log("AJAX Request: Starting to fetch events from local JSON endpoint...");

    try {
        // Fetch mock JSON data using standard Fetch API
        const response = await fetch("events.json");
        
        if (!response.ok) {
            throw new Error(`Failed to load event data. Status: ${response.status}`);
        }

        const data = await response.json();
        
        // Destructure and format using Modern JS (Exercise 10)
        loadedEventsList = data.map(item => {
            // Destructure keys to extract properties
            const { name, date, seats, category, fee } = item;
            return { name, date, seats, category, fee };
        });

        console.log("Mock API Response success. Parsed data:", loadedEventsList);
        
        // Render events
        renderDynamicPortalEvents(loadedEventsList);
        
        // Bind keyup and onchange controls
        setupPortalEventHandlers();

    } catch (error) {
        console.error("Fetch API Failure:", error);
        
        // Fallback default list if json file fails to fetch without a web server running
        loadedEventsList = [
            { name: "Opening Event", date: "2026-05-29", seats: 50, category: "Community", fee: 100 },
            { name: "Budget Meeting", date: "2026-05-31", seats: 0, category: "Community", fee: 0 },
            { name: "Music Concert", date: "2026-06-05", seats: 30, category: "Music", fee: 200 },
            { name: "Dance Festival", date: "2026-06-12", seats: 25, category: "Music", fee: 150 },
            { name: "Baking Workshop", date: "2026-06-20", seats: 15, category: "Workshop", fee: 50 }
        ];
        
        console.warn("Using fallback events:", loadedEventsList);
        renderDynamicPortalEvents(loadedEventsList);
        setupPortalEventHandlers();
    } finally {
        if (spinner) spinner.style.display = "none";
    }
}

// Render dynamic events inside #eventContainer (Exercise 7 + 8)
function renderDynamicPortalEvents(list) {
    const container = document.querySelector("#eventContainer");
    if (!container) return;

    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p style='color: yellow; text-align: center;'>No events matches the filter criteria.</p>";
        return;
    }

    list.forEach(event => {
        const card = document.createElement("div");
        card.className = "dynamicEventCard background-styles";
        card.style.margin = "10px 0";
        card.style.padding = "15px";
        card.style.border = "2px solid #FF0000";
        card.style.borderRadius = "10px";

        // Setup interior structure
        card.innerHTML = `
            <h3>Event: ${event.name}</h3>
            <p><b>Category:</b> ${event.category}</p>
            <p><b>Date:</b> ${event.date}</p>
            <p><b>Seats Available:</b> <span class="seat-badge" style="color: ${event.seats > 0 ? 'lightgreen' : 'red'}">${event.seats}</span></p>
            <p><b>Fee:</b> ₹${event.fee}</p>
        `;

        // Register Now click button for Exercise 8
        const regBtn = document.createElement("button");
        regBtn.className = "cta-button";
        regBtn.textContent = event.seats > 0 ? "Register Now" : "Sold Out";
        regBtn.style.padding = "6px 12px";
        regBtn.style.marginTop = "10px";
        regBtn.style.cursor = event.seats > 0 ? "pointer" : "not-allowed";
        regBtn.style.backgroundColor = event.seats > 0 ? "#007BFF" : "#555";
        regBtn.style.color = "white";
        regBtn.style.border = "none";
        regBtn.style.borderRadius = "5px";
        regBtn.style.fontWeight = "bold";

        if (event.seats > 0) {
            regBtn.onclick = function() {
                triggerCardRegistration(event.name);
            };
        } else {
            regBtn.disabled = true;
        }

        card.appendChild(regBtn);
        container.appendChild(card);
    });
}

// =========================================================================
// Exercise 10: Modern JavaScript Features
// =========================================================================
// Using modern features:
// - let & const: used for variable declarations.
// - Default Parameters: used in function definition (e.g. status = "success" below).
// - Destructuring: used to extract event parameters from fetched object.
// - Spread Operator (...): used to clone event list before filtering to avoid mutating state.
function filterAndDisplayPortalEvents() {
    const searchInput = document.getElementById("search-input");
    const categorySelect = document.getElementById("filter-category");

    const query = searchInput ? searchInput.value.toLowerCase() : "";
    const selectedCategory = categorySelect ? categorySelect.value : "all";

    // Spread operator used here to clone event array securely
    const eventsClone = [...loadedEventsList];

    // Filter using query and category select
    const filteredEvents = eventsClone.filter(event => {
        const matchesName = event.name.toLowerCase().includes(query);
        const matchesCategory = (selectedCategory === "all") || (event.category === selectedCategory);
        return matchesName && matchesCategory;
    });

    // jQuery animation integration for Exercise 14
    if (window.jQuery) {
        $("#eventContainer").fadeOut(250, function() {
            renderDynamicPortalEvents(filteredEvents);
            $("#eventContainer").fadeIn(250);
        });
    } else {
        renderDynamicPortalEvents(filteredEvents);
    }
}

// =========================================================================
// Exercise 11 & 12: Working with Forms & AJAX & Fetch API
// =========================================================================
{
    const formElement = document.getElementById("form");

    if (formElement) {
        formElement.addEventListener("submit", function(e) {
            // Prevent default browser form submission
            e.preventDefault();

            // Capture name, email, selected event using form.elements (Exercise 11)
            const nameInput = formElement.elements["name"];
            const emailInput = formElement.elements["email"];
            const dateInput = formElement.elements["date"];
            const eventTypeSelect = formElement.elements["event-type"];

            console.log("Form elements retrieved:", {
                name: nameInput.value,
                email: emailInput.value,
                date: dateInput.value,
                eventType: eventTypeSelect.value
            });

            // Inline Validation
            let formValid = true;
            resetFormErrors();

            if (nameInput.value.trim().length < 3) {
                displayFormInlineError(nameInput, "Name must be at least 3 characters.");
                formValid = false;
            }

            if (!emailInput.value.includes("@") || emailInput.value.length < 5) {
                displayFormInlineError(emailInput, "Please enter a valid email address.");
                formValid = false;
            }

            if (!dateInput.value) {
                displayFormInlineError(dateInput, "Please select an event date.");
                formValid = false;
            }

            // Exercise 13: Debugging and Testing Console Logs
            if (formValid) {
                console.log("Inline validations passed. Initiating AJAX submission to server...");
                postRegistrationAJAX(nameInput.value, emailInput.value, eventTypeSelect.value);
            } else {
                console.warn("Inline validation failed. Please check form errors.");
            }
        });
    }

    function displayFormInlineError(input, message) {
        input.style.outline = "2px solid red";
        
        let errorPara = input.parentNode.querySelector(".inline-error");
        if (!errorPara) {
            errorPara = document.createElement("p");
            errorPara.className = "inline-error";
            errorPara.style.color = "red";
            errorPara.style.fontSize = "12px";
            errorPara.style.margin = "5px 0 0 0";
            input.parentNode.appendChild(errorPara);
        }
        errorPara.textContent = message;
    }

    function resetFormErrors() {
        const errorParas = document.querySelectorAll(".inline-error");
        errorParas.forEach(p => p.remove());

        const inputs = document.querySelectorAll("#form input, #form select");
        inputs.forEach(input => {
            if (input.type !== "submit") {
                input.style.outline = "";
            }
        });
    }

    // Exercise 12: Fetch API with setTimeout to simulate delayed server response
    function postRegistrationAJAX(name, email, eventType, status = "success") {
        const confirmationOutput = document.getElementById("confirmation");
        
        if (confirmationOutput) {
            confirmationOutput.textContent = "Registering... Please wait.";
            confirmationOutput.style.color = "yellow";
            confirmationOutput.style.fontWeight = "bold";
        }

        const payload = {
            username: name,
            useremail: email,
            registeredEvent: eventType,
            submittedAt: new Date().toISOString()
        };

        // Exercise 13: Log form submission payload to inspect in Console / Network tab
        console.log("AJAX POST Payload details:", JSON.stringify(payload));

        // Use setTimeout to simulate backend latency (1.5 seconds)
        setTimeout(async function() {
            try {
                // Fetch mock API POST endpoint
                const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error(`Server returned error code: ${response.status}`);
                }

                const responseData = await response.json();
                
                // Exercise 13 Console Log
                console.log("Mock API Response success. Received data details:", responseData);

                if (confirmationOutput) {
                    confirmationOutput.textContent = `Registration Successful! ID: ${responseData.id}`;
                    confirmationOutput.style.color = "lightgreen";
                }

                // Decrement available seats dynamically in the local mock array
                decrementDynamicSeats(eventType);

                // Reset the form
                if (formElement) {
                    formElement.reset();
                    if (typeof showFee === "function") showFee();
                }

            } catch (error) {
                console.error("AJAX Fetch submission error details:", error);
                if (confirmationOutput) {
                    confirmationOutput.textContent = "Registration failed. Try again later.";
                    confirmationOutput.style.color = "red";
                }
            }
        }, 1500);
    }

    function decrementDynamicSeats(eventType) {
        // Match selection to dynamic list items
        const matchingEvent = loadedEventsList.find(e => e.name.toLowerCase() === eventType.toLowerCase());
        
        if (matchingEvent && matchingEvent.seats > 0) {
            matchingEvent.seats--;
            console.log(`Seat decremented for event: ${matchingEvent.name}. Remaining: ${matchingEvent.seats}`);
            renderDynamicPortalEvents(loadedEventsList);
        }
    }
}

// =========================================================================
// Exercise 13: Debugging and Testing
// =========================================================================
/*
   HOW TO DEBUG THIS PROJECT USING CHROME DEVTOOLS:
   1. Open index.html in your Google Chrome browser.
   2. Press F12 or Right-Click -> "Inspect" to open Developer Tools.
   3. Go to the "Console" tab to view real-time logs of page loading, fetch payloads, validation success, and API responses.
   4. Go to the "Network" tab, trigger a form registration, and inspect the "posts" request to view headers and the payload json payload sent.
   5. Go to the "Sources" tab, open "main.js", click on any line number (such as line 429 inside postRegistrationAJAX) to place a breakpoint, then trigger that action to halt execution and inspect local variable states.
*/

// =========================================================================
// Exercise 14: jQuery and JS Frameworks
// =========================================================================
// Mention one major benefit of moving to JavaScript frameworks:
/*
   BENEFIT OF REACT / VUE FRAMEWORKS:
   Moving to modern frameworks like React or Vue introduces Component-Based Architecture and a declarative Virtual DOM. 
   Instead of manually finding DOM nodes and updating values via raw append/createElement API calls, the framework 
   automatically handles UI changes whenever state variables change. This makes applications extremely scalable, 
   modular, easier to maintain, and eliminates direct, resource-expensive DOM operations.
*/
console.log("jQuery module initialized. Active components ready.");

// Run jQuery commands inside document ready block
$(document).ready(function() {
    console.log("jQuery: Document ready triggered. Binding #registerBtn click animations...");

    // Use $('#registerBtn').click(...) to handle click animations
    $('#registerBtn').click(function(e) {
        console.log("jQuery: Register button clicked. Form validation and submit sequence initialized.");
        
        // Apply temporary zoom animation on clicked button
        $(this).animate({ opacity: 0.7 }, 100).animate({ opacity: 1 }, 100);
    });
});