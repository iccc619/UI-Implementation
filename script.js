window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");

    if (window.scrollY > 10) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

function showOverlay() {
    document.getElementById("page-overlay").classList.add("active");
}

function hideOverlay() {
    document.getElementById("page-overlay").classList.remove("active");
}

function closeAllPanels() {
    const siteMenu = document.getElementById("site-menu");
    const productFilter = document.getElementById("product-filter");
    const searchPanel = document.getElementById("search-panel");
    const searchInput = document.getElementById("search-input");
    const cartPanel = document.getElementById("cart-panel");

    if (siteMenu) siteMenu.style.width = "0";
    if (productFilter) productFilter.style.width = "0";
    if (searchPanel) searchPanel.classList.remove("open", "has-query");
    if (cartPanel) cartPanel.classList.remove("open");

    if (siteMenu) {
        const buttons = siteMenu.querySelectorAll(".dropdown-btn");
        buttons.forEach(btn => btn.classList.remove("active"));
    }

    if (productFilter) {
        const buttons = productFilter.querySelectorAll(".dropdown-btn");
        buttons.forEach(btn => btn.classList.remove("active"));
    }

    if (searchInput) {
        searchInput.value = "";
    }

    hideOverlay();
}

function openNav() {
    closeAllPanels();
    document.getElementById("site-menu").style.width = "340px";
    showOverlay();
}

function closeNav() {
    closeAllPanels();
}

function openFilter() {
    closeAllPanels();

    const productFilter = document.getElementById("product-filter");
    if (!productFilter) return;

    productFilter.style.width = "340px";
    showOverlay();
}

function closeFilter() {
    closeAllPanels();
}

function openSearch() {
    closeAllPanels();
    document.getElementById("search-panel").classList.add("open");
    document.getElementById("search-input").focus();
    showOverlay();
}

function closeSearch() {
    closeAllPanels();
}

function openCart() {
    closeAllPanels();
    document.getElementById("cart-panel").classList.add("open");
    renderCart();
    showOverlay();
}

function closeCart() {
    closeAllPanels();
}

function toggleDropdown(button) {
    const container = button.closest(".sidebar, #product-filter, .product-accordion, .footer-dropdown");
    if (!container) return; 

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
    if (!sortMenu || !sortBtn) return;

    sortMenu.classList.toggle("open");
    sortBtn.classList.toggle("active");
}

function selectSort(button) {
    const sortLabel = document.getElementById("sort-label");
    const sortMenu = document.getElementById("sort-menu");
    const sortBtn = document.querySelector(".sort-btn");

    if (sortLabel) sortLabel.textContent = button.textContent;
    if (sortMenu) sortMenu.classList.remove("open");
    if (sortBtn) sortBtn.classList.remove("active");
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

function saveSearchNavigation(title, url) {
    sessionStorage.setItem("previousPageTitle", title);
    sessionStorage.setItem("previousPageUrl", url);
}

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

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart() {
    const productSection = document.querySelector(".product-detail");
    if (!productSection) return;

    //get product information from product detail page//
    const image = productSection.querySelector(".product-detail-image img").getAttribute("src");
    const title = productSection.querySelector(".product-detail-info h1").textContent.trim();
    const styleSelect = document.getElementById("style-select");
    const sizeSelect = document.getElementById("size-select");
    const priceText = document.getElementById("product-price").textContent.replace("$", "");

    const style = styleSelect.options[styleSelect.selectedIndex].textContent.trim();
    const size = sizeSelect.options[sizeSelect.selectedIndex].textContent.trim();
    const price = parseFloat(priceText);

    //check if item already exists//
    const existingItem = cart.find(item =>
        item.title === title &&
        item.style === style &&
        item.size === size
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            image: image,
            title: title,
            style: style,
            size: size,
            price: price,
            quantity: 1
        });
    }

    saveCart(); //saves previous memory//
    openCart(); //opens automatically//
}

function renderCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTitle = document.getElementById("cart-title");
    const subtotalText = document.getElementById("cart-subtotal");
    const checkoutBtn = document.querySelector(".cart-checkout-btn");
    const paypalBtn = document.querySelector(".cart-paypal-btn");

    if (!cartItems || !cartTitle || !subtotalText) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartTitle.textContent = totalItems > 0 ? `Cart (${totalItems})` : "Cart";
    subtotalText.textContent = "$" + subtotal.toFixed(2);

    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="empty-cart-text body-2">Empty Cart</p>`;
        checkoutBtn.disabled = true;
        paypalBtn.disabled = true;
        return;
    }

    checkoutBtn.disabled = false;
    paypalBtn.disabled = false;

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <figure class="cart-item-image">
                <img src="${item.image}" alt="">
            </figure>

            <div class="cart-item-info">
                <p class="body-2-bold">${item.title}</p>

                <div class="cart-item-details">
                    <p class="caption-para">Style: ${item.style}</p>
                    <p class="caption-para">Size: ${item.size}</p>
                </div>

                <div class="cart-item-row">
                    <p class="body-1-medium">$${(item.price * item.quantity).toFixed(2)}</p>

                    <div class="cart-quantity">
                        <button onclick="changeCartQuantity(${index}, -1)">−</button>
                        <span class="caption">${item.quantity}</span>
                        <button onclick="changeCartQuantity(${index}, 1)">＋</button>
                    </div>
                </div>
            </div>
        </div>
    `).join("");
}

function changeCartQuantity(index, amount) {
    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    renderCart();
}