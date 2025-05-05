function showTab(tabId, button = null) {

  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.style.display = 'none';

   
    const imgContainer = tab.querySelector('.image-container');
    if (imgContainer) {
      imgContainer.classList.remove('grid-layout');
    }
  });

 
  const selectedTab = document.getElementById(tabId);
  selectedTab.style.display = 'block';

  const selectedImgContainer = selectedTab.querySelector('.image-container');
  if (selectedImgContainer && tabId === 'podcasts') {
    selectedImgContainer.classList.add('grid-layout');
  }

  document.querySelectorAll('.badge').forEach(btn => {
    btn.classList.remove('active');
  });
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

  
  if (defaultButton) {
    changeColor(defaultButton);
    showTab("all", defaultButton);
  }
});
