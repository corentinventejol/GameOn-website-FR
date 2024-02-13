function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  
  // Fermer le modal en cliquant sur la croix grace a un eventListener qui attend un clique pour fermer le modal 
  const closeModal = document.querySelector(".close");
  if (closeModal) {
    closeModal.addEventListener("click", closeModalHandler);
  }
}

// Fonction pour fermer le modal avec display none
function closeModalHandler() {
  modalbg.style.display = "none";
}


