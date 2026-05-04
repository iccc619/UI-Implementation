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

const prices = {
    canvasTube: {
        24: 144.90,
        30: 211.60,
        40: 345.00,
        48: 476.10,
        60: 699.20,
        75: 1076.40
    },
    canvasHang: {
        24: 352.80,
        30: 466.20,
        40: 678.30,
        48: 869.40,
        60: 1197.00,
        75: 1665.30
    },
    acrylicBorderless: {
        24: 396.90,
        30: 556.50,
        40: 896.70,
        48: 1232.70,
        60: 1848.00,
        75: 2801.40
    },
    acrylicBorder: {
        24: 396.90,
        30: 556.50,
        40: 896.70,
        48: 1232.70,
        60: 1848.00,
        75: 2801.40
    }
};

const styleSelect = document.getElementById("style-select");
const sizeSelect = document.getElementById("size-select");
const priceText = document.getElementById("product-price");

function updatePrice() {
    const style = styleSelect.value;
    const size = sizeSelect.value;
    const price = prices[style][size];

    priceText.textContent = "$" + price.toFixed(2);
}

styleSelect.addEventListener("change", updatePrice);
sizeSelect.addEventListener("change", updatePrice);

function toggleDetailDropdown(button) {
    const dropdown = button.nextElementSibling;
    const icon = button.querySelector("span");

    button.classList.toggle("active");
    dropdown.classList.toggle("open");

    icon.textContent = dropdown.classList.contains("open") ? "⌃" : "⌄";
}