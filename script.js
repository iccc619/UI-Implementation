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
    const container = button.closest(".sidebar, #product-filter, .product-accordion, .footer-dropdown, .info-form");
    if (!container) return; 

    const allButtons = document.querySelectorAll(".dropdown-btn, .payment-info-btn");
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

    const label = link.querySelector(".quicknav-label");
    if (!label) return;

    const title = sessionStorage.getItem("previousPageTitle");
    const url = sessionStorage.getItem("previousPageUrl");

    if (title && url) {
        label.textContent = title;
        link.href = url;
    } else {
        label.textContent = "Back";
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

function setPortraitImageClosedHeight() {
    const info = document.querySelector(".product-detail-info");
    const image = document.querySelector(".portrait-image img");

    if (!info || !image) return;

    // phone screen: reset to original image ratio
    if (window.innerWidth <= 768) {
        image.style.height = "auto";
        image.style.maxHeight = "none";
        image.style.objectFit = "contain";
        image.style.objectPosition = "top";
        return;
    }

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
    image.style.objectPosition = "top";

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

    if (!cartItems || !cartTitle || !subtotalText) return;

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartTitle.textContent = totalItems > 0 ? `Cart (${totalItems})` : "Cart";
    subtotalText.textContent = "$" + subtotal.toFixed(2);

    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="empty-cart-text body-2">Empty Cart</p>`;
        checkoutBtn.disabled = true;
        return;
    }

    checkoutBtn.disabled = false;

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

function renderCheckoutSummary() {
    const summaryItems = document.getElementById("summary-items");
    const summarySubtotal = document.getElementById("summary-subtotal");
    const summaryExtra = document.getElementById("summary-extra");
    const summaryTotal = document.getElementById("summary-total");

    if (!summaryItems || !summarySubtotal) return;

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const subtotal = savedCart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const discountInput = document.getElementById("discount-code");
    const hasDiscount = discountInput && discountInput.value.trim() !== "";
    const discount = hasDiscount ? 10 : 0;

    const country = localStorage.getItem("checkoutCountry") || "Australia";
    const asiaCountries = ["China", "Japan", "South Korea"];

    let shipping = 80;

    if (country === "Australia" || country === "New Zealand") {
        shipping = 20;
    } else if (asiaCountries.includes(country)) {
        shipping = 50;
    }

    const gst = 0;
    const total = subtotal - discount + shipping + gst;

    if (savedCart.length === 0) {
        summaryItems.innerHTML = `<p class="body-2">Your cart is empty.</p>`;
        summarySubtotal.textContent = "$00.00";
        if (summaryExtra) summaryExtra.innerHTML = "";
        return;
    }

    summaryItems.innerHTML = savedCart.map(item => `
        <div class="summary-item">
            <img src="${item.image}" alt="">

            <div class="summary-info">
                <p class="body-2-bold">${item.title}</p>
                <div>
                    <p class="caption-para">Style: ${item.style}</p>
                    <p class="caption-para">Size: ${item.size}</p>
                </div>
            </div>

            <div class="summary-price">
                <p class="body-1-medium">$${(item.price * item.quantity).toFixed(2)}</p>
                <p class="summary-quantity caption">× ${item.quantity}</p>
            </div>
        </div>
    `).join("");
    
    summarySubtotal.textContent = "$" + subtotal.toFixed(2);

    if (summaryExtra) {
        summaryExtra.innerHTML = `
            <div class="info-line">
                <p class="body-2-bold">Discount</p>
                <p class="body-2-bold">-$${discount.toFixed(2)}</p>
            </div>

            <div class="info-line">
                <p class="body-2-bold">Shipping</p>
                <p class="body-2-bold">$${shipping.toFixed(2)}</p>
            </div>

            <div class="info-line">
                <p class="body-2-bold">GST Amount</p>
                <p class="body-2-bold">$${gst.toFixed(2)}</p>
            </div>
        `;
    }

    if (summaryTotal) {
        summaryTotal.innerHTML = `
            <p class="body-1-medium">Total</p>
            <p class="body-1-medium">$${total.toFixed(2)}</p>
        `;
    }
            
}

// Actively change the price //
document.addEventListener("DOMContentLoaded", () => {
    const discountInput = document.getElementById("discount-code");

    if (discountInput) {
        discountInput.addEventListener("input", renderCheckoutSummary);
    }
});

function toggleOrderSummary() {
    const summary = document.querySelector(".checkout-summary");
    if (!summary) return;

    if (window.innerWidth <= 768) {
        summary.classList.toggle("mobile-open");
    } else {
        summary.classList.toggle("open");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderCheckoutSummary();
});

function saveCheckoutInfo() {
    const firstName = document.getElementById("contact-first-name")?.value.trim();
    const lastName = document.getElementById("contact-last-name")?.value.trim();

    const email = document.getElementById("contact-email")?.value.trim();

    const address = document.getElementById("address-address")?.value.trim();
    const postcode = document.getElementById("address-postcode")?.value.trim();

    const stateSelect = document.getElementById("address-state");
    const state = stateSelect ? stateSelect.value : "";

    const countrySelect = document.getElementById("address-country");
    const country = countrySelect ? countrySelect.value : "";

    const stateMap = {
        "New South Wales": "NSW",
        "Victoria": "VIC",
        "Queensland": "QLD",
        "South Australia": "SA",
        "Western Australia": "WA",
        "Tasmania": "TAS",
        "Northern Territory": "NT",
        "Australian Capital Territory": "ACT",
        "Other (state above)": ""
    };

    const stateShort = stateMap[state] || state;

    const fullAddress = `${address} ${stateShort} ${postcode}`;

    localStorage.setItem("checkoutFirstName", firstName || "");
    localStorage.setItem("checkoutLastName", lastName || "");
    localStorage.setItem("checkoutEmail", email || "");
    localStorage.setItem("checkoutAddress", fullAddress || "");
    localStorage.setItem("checkoutCountry", country || "Australia");

    window.location.href = "payment.html";
}

function checkCheckoutForm() {
    const requiredFields = [
        "contact-first-name",
        "contact-last-name",
        "contact-email",
        "contact-phone",
        "address-address",
        "address-postcode",
        "address-state"
    ];

    const btn = document.getElementById("payment-btn");
    if (!btn) return;

    const allFilled = requiredFields.every(id => {
        const field = document.getElementById(id);
        return field && field.value.trim() !== "";
    });

    btn.disabled = !allFilled;
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".checkout-input, .option-select").forEach(input => {
        input.addEventListener("input", checkCheckoutForm);
        input.addEventListener("change", checkCheckoutForm);
    });

    checkCheckoutForm();

    setTimeout(checkCheckoutForm, 100);
});

window.addEventListener("pageshow", () => {
    checkCheckoutForm();
});

document.addEventListener("DOMContentLoaded", () => {
    renderCheckoutSummary();
    loadShippingInfo();
});

function loadShippingInfo() {
    const contactBox = document.getElementById("shipping-contact");
    const addressBox = document.getElementById("shipping-address");

    if (contactBox) {
        contactBox.textContent = localStorage.getItem("checkoutEmail") || "No email provided";
    }

    if (addressBox) {
        addressBox.textContent = localStorage.getItem("checkoutAddress") || "No address provided";
    }
}

function editShippingField(fieldId, button) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    const currentValue = field.textContent.trim();

    field.innerHTML = `
        <input type="text" class="shipping-edit-input body-2" value="${currentValue}">
    `;

    const input = field.querySelector("input");
    input.focus();

    button.textContent = "Save";
    button.setAttribute("onclick", `saveShippingField('${fieldId}', this)`);
}

function saveShippingField(fieldId, button) {
    const field = document.getElementById(fieldId);
    const input = field.querySelector("input");
    if (!input) return;

    const newValue = input.value.trim();

    field.textContent = newValue || "Not provided";

    if (fieldId === "shipping-contact") {
        localStorage.setItem("checkoutEmail", newValue);
    }

    if (fieldId === "shipping-address") {
        localStorage.setItem("checkoutAddress", newValue);
    }

    button.textContent = "Edit";
    button.setAttribute("onclick", `editShippingField('${fieldId}', this)`);
}

function saveFinalOrder() {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const subtotal = savedCart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    const discountInput = document.getElementById("discount-code");
    const discount = discountInput && discountInput.value.trim() !== "" ? 10 : 0;

    const country = localStorage.getItem("checkoutCountry") || "Australia";
    const asiaCountries = ["China", "Japan", "South Korea"];

    let shipping = 80;
    let arrivalDays = 14;

    if (country === "Australia" || country === "New Zealand") {
        shipping = 20;
        arrivalDays = 3;
    } else if (asiaCountries.includes(country)) {
        shipping = 50;
        arrivalDays = 7;
    }

    const total = subtotal - discount + shipping;

    const orderNumber = Math.floor(1000000000 + Math.random() * 9000000000);

    const today = new Date();
    today.setDate(today.getDate() + arrivalDays);

    const estimatedArrival = today.toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });

    localStorage.setItem("finalOrderTotal", total.toFixed(2));
    localStorage.setItem("finalOrderNumber", orderNumber);
    localStorage.setItem("finalEstimatedArrival", estimatedArrival);

    window.location.href = "confirmation.html";
}

function renderConfirmationPage() {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const email = localStorage.getItem("checkoutEmail") || "your email";
    const firstName = localStorage.getItem("checkoutFirstName") || "";
    const lastName = localStorage.getItem("checkoutLastName") || "";
    const address = localStorage.getItem("checkoutAddress") || "No address provided";

    const orderNumber = localStorage.getItem("finalOrderNumber") || "0000000000";
    const total = localStorage.getItem("finalOrderTotal") || "0.00";
    const arrival = localStorage.getItem("finalEstimatedArrival") || "—";

    const message = document.getElementById("confirmation-message");
    const finalTotal = document.getElementById("final-total");
    const finalOrderNumber = document.getElementById("final-order-number");
    const finalArrival = document.getElementById("final-arrival");
    const finalShipTo = document.getElementById("final-ship-to");
    const summaryItems = document.getElementById("summary-items");
    const summaryFinalTotal = document.getElementById("summary-final-total");

    if (message) {
        message.innerHTML = `
            <span class="order-number-text">
                Your order number is ${orderNumber}. <br><br>
            </span>
            A confirmation message containing all your order information was sent to ${email}. <br><br>
            If you do not receive a confirmation email within 24 hours or require support please call 0416 143 908.
        `;
    }

    if (finalTotal) finalTotal.textContent = "$" + total;
    if (finalOrderNumber) finalOrderNumber.textContent = orderNumber;
    if (finalArrival) finalArrival.textContent = arrival;

    if (finalShipTo) {
        finalShipTo.innerHTML = `
            ${firstName} ${lastName}<br>
            ${address}
        `;
    }

    if (summaryFinalTotal) summaryFinalTotal.textContent = "$" + total;

    if (summaryItems) {
        summaryItems.innerHTML = savedCart.map(item => `
            <div class="summary-item">
                <img src="${item.image}" alt="">

                <div class="summary-info">
                    <p class="body-2-bold">${item.title}</p>
                    <div>
                        <p class="caption-para">Style: ${item.style}</p>
                        <p class="caption-para">Size: ${item.size}</p>
                    </div>
                </div>

                <div class="summary-price">
                    <p class="body-1-medium">$${(item.price * item.quantity).toFixed(2)}</p>
                    <p class="summary-quantity caption">× ${item.quantity}</p>
                </div>
            </div>
        `).join("");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderConfirmationPage();
});

function returnHomeAndClearOrder() {
    localStorage.removeItem("cart");

    localStorage.removeItem("checkoutFirstName");
    localStorage.removeItem("checkoutLastName");
    localStorage.removeItem("checkoutEmail");
    localStorage.removeItem("checkoutAddress");
    localStorage.removeItem("checkoutCountry");

    localStorage.removeItem("finalOrderTotal");
    localStorage.removeItem("finalOrderNumber");
    localStorage.removeItem("finalEstimatedArrival");

    cart = [];

    window.location.href = "index.html";
}