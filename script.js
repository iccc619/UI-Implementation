function openNav() {
    document.getElementById("site-menu").style.width = "340px";
}
  
function closeNav() {
    const sidebar = document.getElementById("site-menu");
    sidebar.style.width = "0";

    // reset all dropdowns
    const buttons = sidebar.querySelectorAll(".sidebar-dropdown-btn");

    buttons.forEach(btn => btn.classList.remove("active"));
}

function toggleDropdown(button) {
    const allButtons = document.querySelectorAll(".sidebar-dropdown-btn");
    // close the previous button when opening a new one//
    allButtons.forEach(btn => {
        if (btn !== button) {
            btn.classList.remove("active");
        }
    });

    button.classList.toggle("active");
}