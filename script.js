function showTab(tabId, button = null) {
  // Hide all tab contents
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.style.display = 'none';
  });

  // Remove active class from all buttons
  document.querySelectorAll('.badge').forEach(btn => {
    btn.classList.remove('active');
  });

  // Show the selected tab
  document.getElementById(tabId).style.display = 'block';

  // Add active class to clicked button
  if (button) {
    button.classList.add('active');
  }
}

let activeButton = null;

function changeColor(clickedButton) {
  if (activeButton) {
    activeButton.style.backgroundColor = "";
    activeButton.style.color = "";
  }

  clickedButton.style.backgroundColor = "white";
  clickedButton.style.color = "black";

  activeButton = clickedButton;
}

document.addEventListener("DOMContentLoaded", () => {
  const defaultButton = document.getElementById("btn-all");

  // Set up default tab and styles
  if (defaultButton) {
    changeColor(defaultButton);
    showTab("all", defaultButton);
  }
});
