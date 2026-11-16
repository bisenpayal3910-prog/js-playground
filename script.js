
/* =====================================
   JS PLAYGROUND - JAVASCRIPT
   DOM + EVENTS + FUNCTIONS + ARRAYS
===================================== */

// 1. COUNTER APP
let count = 0;

const counterValue = document.getElementById("counterValue");
const increaseBtn = document.getElementById("increaseBtn");
const decreaseBtn = document.getElementById("decreaseBtn");
const resetBtn = document.getElementById("resetBtn");

function updateCounter() {
    counterValue.textContent = String(count).padStart(2, "0");
}

increaseBtn.addEventListener("click", function () {
    count++;
    updateCounter();
});

decreaseBtn.addEventListener("click", function () {
    count--;
    updateCounter();
});

resetBtn.addEventListener("click", function () {
    count = 0;
    updateCounter();
});


// 2. TO-DO LIST APP

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function saveTasks() {
    localStorage.setItem("myTasks", taskList.innerHTML);
}

function loadTasks() {
    const savedTasks = localStorage.getItem("myTasks");

    if (savedTasks) {
        taskList.innerHTML = savedTasks;
    }
}

function addTask(taskName) {
    const li = document.createElement("li");

    const check = document.createElement("span");
    check.className = "task-check";

    const text = document.createElement("span");
    text.textContent = taskName;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "×";
    deleteBtn.type = "button";
    deleteBtn.setAttribute("aria-label", "Delete task");
    deleteBtn.style.cssText =
        "margin-left:auto;background:none;border:0;color:#ff8298;font-size:20px;cursor:pointer;";

    li.append(check, text, deleteBtn);
    taskList.appendChild(li);

    saveTasks();
}

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        return;
    }

    addTask(taskName);
    taskInput.value = "";
});

taskList.addEventListener("click", function (event) {
    const li = event.target.closest("li");

    if (!li) return;

    if (event.target.closest("button")) {
        li.remove();
    } else {
        li.classList.toggle("task-done");

        const check = li.querySelector(".task-check");
        check.textContent = li.classList.contains("task-done") ? "✓" : "";
    }

    saveTasks();
});

loadTasks();


// 3. LIVE SEARCH

const searchInput = document.getElementById("searchInput");
const topicList = document.getElementById("topicList");

searchInput.addEventListener("input", function () {
    const searchText = searchInput.value.toLowerCase();

    const topics = topicList.querySelectorAll(".topic-pill");

    topics.forEach(function (topic) {
        const topicName = topic.textContent.toLowerCase();

        if (topicName.includes(searchText)) {
            topic.style.display = "inline-block";
        } else {
            topic.style.display = "none";
        }
    });
});


// 4. MODAL POPUP

const openModalBtn = document.getElementById("openModalBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalOkayBtn = document.getElementById("modalOkayBtn");
const practiceModal = document.getElementById("practiceModal");

function openModal() {
    practiceModal.classList.add("show");
}

function closeModal() {
    practiceModal.classList.remove("show");
}

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
modalOkayBtn.addEventListener("click", closeModal);

practiceModal.addEventListener("click", function (event) {
    if (event.target === practiceModal) {
        closeModal();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeModal();
    }
});


// 5. CONTACT FORM VALIDATION

const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    if (name === "" || email === "") {
        alert("Please fill all the fields!");
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }

    alert("Thank you " + name + "! Your form is submitted.");

    contactForm.reset();
});


// 6. FAQ ACCORDION

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const currentItem = question.closest(".faq-item");

        // Close other FAQ items
        document.querySelectorAll(".faq-item").forEach(function (item) {
            if (item !== currentItem) {
                item.classList.remove("open");
                item.querySelector(".faq-question span").textContent = "＋";
            }
        });

        // Toggle current FAQ
        currentItem.classList.toggle("open");

        const icon = question.querySelector("span");

        icon.textContent = currentItem.classList.contains("open")
            ? "−"
            : "＋";
    });
});


// 7. DARK / LIGHT MODE

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("light-mode");

    const isLight = document.body.classList.contains("light-mode");

    themeToggle.innerHTML = isLight
        ? "☾ <span>Dark Mode</span>"
        : "☼ <span>Light Mode</span>";

    localStorage.setItem("websiteTheme", isLight ? "light" : "dark");
});


// Load saved theme
if (localStorage.getItem("websiteTheme") === "light") {
    document.body.classList.add("light-mode");
    themeToggle.innerHTML = "☾ <span>Dark Mode</span>";
}


// 8. MOBILE NAVIGATION

const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", function () {

    const isOpen = navLinks.classList.toggle("mobile-open");

    if (isOpen) {
        navLinks.style.display = "flex";
        navLinks.style.flexDirection = "column";
        navLinks.style.position = "absolute";
        navLinks.style.top = "66px";
        navLinks.style.left = "0";
        navLinks.style.width = "100%";
        navLinks.style.padding = "20px 24px";
        navLinks.style.background = "#151a29";
        navLinks.style.borderBottom = "1px solid #ffffff22";
    } else {
        navLinks.style.display = "";
        navLinks.style.position = "";
        navLinks.style.padding = "";
    }
});

navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("mobile-open");
        navLinks.style.display = "";
        navLinks.style.position = "";
        navLinks.style.padding = "";
    });
});


console.log("JS Playground Loaded Successfully! 🚀");
