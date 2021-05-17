/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/*
 * Start Helper Functions
*/

//adds classes to current section and navbar element and removes the old ones
const setActiveSection = (node) => {
    document.querySelectorAll("section").forEach(section => {
        section.classList.remove("active");
    });
    document.querySelector("#navbar__list").querySelectorAll("li").forEach((menuEntry) => {
        menuEntry.classList.remove("active");
    });
    document.querySelector(`[data-section='${node.id}']`).classList.add("active");
    node.classList.add("active");
}

/**
 * End Helper Functions
 * Begin Main Functions
*/

// Add class 'active' to section when near top of viewport
const checkActiveSection = (event) => {
    document.querySelectorAll("section").forEach((section, idx) => {
		//if the section start is in the top of the viewport
        if ((section.getBoundingClientRect().top >= -50) && (section.getBoundingClientRect().top <= window.innerHeight*0.5)) {
            setActiveSection(section);
        };
    });
}

// Scroll to anchor using event
const scrollToSection = (event) => {
    if (event.target.tagName !== "UL") {
        window.scrollTo(0, document.querySelector(`#${event.target.getAttribute("data-section")}`).offsetTop);
    };
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// For the navigation menu 
let frag = document.createDocumentFragment();
document.querySelectorAll("section").forEach((section, idx) => {
    const item = document.createElement('li');
    item.setAttribute("data-section", section.id);
    item.textContent = section.getAttribute("data-nav");
    if (idx === 0) {
        item.classList.add("active");
    }
    frag.appendChild(item);
});
document.querySelector("#navbar__list").appendChild(frag);

// Scroll to section
document.querySelector("#navbar__list").addEventListener("click", scrollToSection);

// set active sessions
window.addEventListener('scroll', checkActiveSection);