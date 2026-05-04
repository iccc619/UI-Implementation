window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");

    if (window.scrollY > 10) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

function openNav() {
    document.getElementById("site-menu").style.width = "340px";
}
  
function closeNav() {
    const sidebar = document.getElementById("site-menu");
    sidebar.style.width = "0";

    // reset all dropdowns
    const buttons = sidebar.querySelectorAll(".dropdown-btn");
    buttons.forEach(btn => btn.classList.remove("active"));
}

function openFilter() {
    document.getElementById("product-filter").style.width = "340px";
}

function closeFilter() {
    const filter = document.getElementById("product-filter");
    filter.style.width = "0";

    const buttons = filter.querySelectorAll(".dropdown-btn");
    buttons.forEach(btn => btn.classList.remove("active"));
}

function toggleDropdown(button) {
    const container = button.closest(".sidebar, #product-filter");
    const allButtons = document.querySelectorAll(".dropdown-btn");
    // close the previous button when opening a new one//
    allButtons.forEach(btn => {
        if (btn !== button) {
            btn.classList.remove("active");
        }
    });

    button.classList.toggle("active");
}

function toggleSort() {
    const sortMenu = document.getElementById("sort-menu");
    const sortBtn = document.querySelector(".sort-btn");

    sortMenu.classList.toggle("open");
    sortBtn.classList.toggle("active");
}

function selectSort(button) {
    document.getElementById("sort-label").textContent = button.textContent;

    document.getElementById("sort-menu").classList.remove("open");
    document.querySelector(".sort-btn").classList.remove("active");
}