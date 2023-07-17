/*   JavaScript Functionality
        - toggling dropdown menu visibility
        - closing dropdown menu
        - toggling hamburger menu visibility
        - toggling aria-expanded attribute
*/

// select classes using DOM methods, store in variables
const dropdownBtn = document.querySelectorAll(".dropdown-btn");
const dropdown = document.querySelectorAll(".dropdown");
const hamburgerBtn = document.getElementById("hamburger");
const navMenu = document.querySelector(".menu");
const links = document.querySelectorAll(".dropdown a");

// functions
function setAriaExpandedFalse() {
    dropdownBtn.forEach( (btn) => btn.setAttribute("aria-expanded", "false"));
}

function closeDropdownMenu() {
    dropdown.forEach( (drop) => {
        drop.classList.remove("active");
        drop.addEventListener("click", (e) => e.stopPropagation());
    });
}

function toggleHamburger() {
    navMenu.classList.toggle("show");
}

// event listeners on dropdowns
dropdownBtn.forEach( (btn) => {
    btn.addEventListener("click", function (e) {
        const dropdownIndex = e.currentTarget.dataset.dropdown;
        const dropdownElement = document.getElementById(dropdownIndex);
        console.log(dropdownElement);
        // toggle dropdown menu
        dropdownElement.classList.toggle("active");
        dropdown.forEach( (drop) => {
            if (drop.id !== btn.dataset["dropdown"]) {
                drop.classList.remove("active");
            }
        });
        // prevent click from targeting elements beneath "btn"
        e.stopPropagation();
        btn.setAttribute(
            "aria-expanded",
            btn.getAttribute("aria-expanded") === "false" ? "true" : "false"
        );
    });
});

/*  dropdown should collapse when:
        - the links inside the dropdown menu are clicked// toggle 
        - user hits ESC key
        - click on the document body, outside menu
*/

// close dropdown menu when links are clicked
links.forEach( (link) =>
    link.addEventListener("click", () => {
        closeDropdownMenu();
        setAriaExpandedFalse();
        // toggle hamburger menu (mobile screens)
        toggleHamburger();
    })
);

// close dropdown menu when click on the document body
document.documentElement.addEventListener("click", () => {
    closeDropdownMenu();
    setAriaExpandedFalse();
});

// close dropdown when ESC key is pressed
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeDropdownMenu();
        setAriaExpandedFalse();
    }
});

// toggle hamburger on icon click
hamburgerBtn.addEventListener("click", toggleHamburger);

// TODO: make menu close when it loses focus (keyboard change or mouse click)

