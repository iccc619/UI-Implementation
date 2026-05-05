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
    const container = button.closest(".sidebar, #product-filter, .product-accordion");
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

function savePreviousPage(link) {
    const title = document.querySelector(".section-title")?.textContent.trim();

    sessionStorage.setItem("previousPageTitle", title);
    sessionStorage.setItem("previousPageUrl", window.location.href);
}

document.addEventListener("DOMContentLoaded", () => {
    const link = document.querySelector(".quicknav a");
    if (!link) return;

    const title = sessionStorage.getItem("previousPageTitle");
    const url = sessionStorage.getItem("previousPageUrl");

    if (title && url) {
        link.textContent = title;
        link.href = url;
    } else {
        link.textContent = "Back";
        link.href = "javascript:history.back()";
    }
});

const prices = {
    fireRain: {
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
    },

    kingsSunset: {
        canvasTube: {
            24: 163.30,
            30: 241.50,
            40: 402.50,
            48: 554.30,
            60: 832.60,
        },
        canvasHang: {
            24: 384.30,
            30: 512.40,
            40: 751.80,
            48: 970.20,
            60: 1341.90
        },
        acrylicBorderless: {
            24: 449.40,
            30: 636.30,
            40: 1037.40,
            48: 1434.30,
            60: 2158.80
        },
        acrylicBorder: {
            24: 449.40,
            30: 636.30,
            40: 1037.40,
            48: 1434.30,
            60: 2158.80
        }
    }
};

const productDetail = document.querySelector(".product-detail");
const productId = productDetail?.dataset.product;

const styleSelect = document.getElementById("style-select");
const sizeSelect = document.getElementById("size-select");
const priceText = document.getElementById("product-price");

function updatePrice() {
    if (!productId || !styleSelect || !sizeSelect || !priceText) return;
    
    const style = styleSelect.value;
    const size = sizeSelect.value;
    const price = prices[productId][style][size];

    priceText.textContent = "$" + price.toFixed(2);
}

if (styleSelect && sizeSelect && priceText) {
    styleSelect.addEventListener("change", updatePrice);
    sizeSelect.addEventListener("change", updatePrice);
    updatePrice();
}

function toggleDetailDropdown(button) {
    const dropdown = button.nextElementSibling;
    const icon = button.querySelector("span");

    button.classList.toggle("active");
    dropdown.classList.toggle("open");

    icon.textContent = dropdown.classList.contains("open") ? "⌃" : "⌄";
}

function setPortraitImageClosedHeight() {
    const info = document.querySelector(".product-detail-info");
    const image = document.querySelector(".portrait-image img");

    if (!info || !image) return;

    const activeButtons = info.querySelectorAll(".product-accordion .dropdown-btn.active");
    const dropdowns = info.querySelectorAll(".product-accordion .dropdown");

    // temporarily remove animation and force all dropdowns closed
    dropdowns.forEach(dropdown => {
        dropdown.style.transition = "none";
        dropdown.style.maxHeight = "0";
    });

    activeButtons.forEach(btn => btn.classList.remove("active"));

    // force browser to apply the closed state
    info.offsetHeight;

    const closedHeight = info.offsetHeight;

    image.style.height = closedHeight + "px";
    image.style.maxHeight = closedHeight + "px";
    image.style.objectFit = "contain";

    // restore original dropdown state
    activeButtons.forEach(btn => btn.classList.add("active"));

    dropdowns.forEach(dropdown => {
        dropdown.style.transition = "";
        dropdown.style.maxHeight = "";
    });
}

window.addEventListener("load", setPortraitImageClosedHeight);
window.addEventListener("resize", setPortraitImageClosedHeight);

function openSearch() {
    document.getElementById("search-panel").classList.add("open");
    document.getElementById("search-input").focus();
}

function closeSearch() {
    const panel = document.getElementById("search-panel");
    const input = document.getElementById("search-input");

    panel.classList.remove("open");
    panel.classList.remove("has-query");
    input.value = "";
}

function submitSearch() {
    const panel = document.getElementById("search-panel");
    const input = document.getElementById("search-input");

    const value = input.value.trim().toLowerCase();

    if (value.includes("sunset")) {
        panel.classList.add("has-query");
    } else {
        panel.classList.remove("has-query");
    }
}

function fillSearch(value) {
    const input = document.getElementById("search-input");
    input.value = value;
}

function deleteHistory(btn) {
    const item = btn.closest(".history-item");
    item.remove();
}