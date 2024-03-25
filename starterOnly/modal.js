// Fonction pour afficher un message d'erreur sous l'élément parent
function displayErrorMessage(parentElement, message) {
  // Vérifier si un message d'erreur existe déjà
  const existingErrorMessage = parentElement.querySelector(".formData");
  if (!existingErrorMessage) {
    parentElement.classList.add("formData");
    parentElement.setAttribute("data-error", message);
    parentElement.setAttribute("data-error-visible", "true");
  }
}

// Fonction pour supprimer un message d'erreur
function removeErrorMessage(parentElement) {
  parentElement.classList.remove("formData");
  parentElement.removeAttribute("data-error");
  parentElement.removeAttribute("data-error-visible");
}

// Fonction pour valider le formulaire
function validateForm() {
  // Obtenir l'élément du formulaire
  const form = document.getElementsByName("reserve")[0]; // Accéder au premier élément de la NodeList

  // Valider chaque champ en fonction de vos exigences
  const firstName = form.elements["first"];
  const lastName = form.elements["last"];
  const email = form.elements["email"];
  const birthdate = form.elements["birthdate"];
  const quantity = form.elements["quantity"];
  const location = form.elements["location"];
  const checkbox1 = form.elements["checkbox1"];
  const checkbox2 = form.elements["checkbox2"];

  let isValid = true; // Variable pour suivre l'état de validation

  // Validation du prénom
  if (firstName.value.trim().length < 2) {
    displayErrorMessage(firstName.parentElement, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
    isValid = false; // Marquer la validation comme échouée
  } else {
    removeErrorMessage(firstName.parentElement);
  }

  // Validation du nom de famille
  if (lastName.value.trim().length < 2) {
    displayErrorMessage(lastName.parentElement, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
    isValid = false; // Marquer la validation comme échouée
  } else {
    removeErrorMessage(lastName.parentElement);
  }

  // Validation de l'adresse électronique
  if (!isValidEmail(email.value.trim())) {
    displayErrorMessage(email.parentElement, "Veuillez saisir une adresse électronique valide.");
    isValid = false; // Marquer la validation comme échouée
  } else {
    removeErrorMessage(email.parentElement);
  }

  // Validation de la date de naissance
  if (!birthdate.value.trim()) {
    displayErrorMessage(birthdate.parentElement, "Vous devez entrer votre date de naissance.");
    isValid = false; // Marquer la validation comme échouée
  } else {
    removeErrorMessage(birthdate.parentElement);
  }

  // Validation du nombre de concours
  const quantityValue = parseInt(quantity.value.trim());
  if (isNaN(quantityValue) || quantityValue < 0 || quantityValue > 99) {
    displayErrorMessage(quantity.parentElement, "Veuillez saisir un nombre valide entre 0 et 99.");
    isValid = false; // Marquer la validation comme échouée
  } else {
    removeErrorMessage(quantity.parentElement);
  }

  // Validation de la sélection de bouton radio
  let locationSelected = false;
  for (let i = 0; i < location.length; i++) {
    if (location[i].checked) {
      locationSelected = true;
      break;
    }
  }
  if (!locationSelected) {
    displayErrorMessage(location[0].parentElement, "Veuillez sélectionner une ville.");
    isValid = false; // Marquer la validation comme échouée
  } else {
    removeErrorMessage(location[0].parentElement);
  }

  // Validation de la première case à cocher
  if (!checkbox1.checked) {
    displayErrorMessage(checkbox1.parentElement, "Vous devez vérifier que vous acceptez les termes et conditions.");
    isValid = false; // Marquer la validation comme échouée
  } else {
    removeErrorMessage(checkbox1.parentElement);
  }

  return isValid;
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");

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

// Fonction pour afficher le modal de réussite et fermer l'autre modal
function toggleModal() {

  document.querySelectorAll('.modal-body').forEach(modal => {
    modal.classList.toggle('modal-open')
  })

  // Fermer le modal actuel
  // closeModalHandler();
  
  // Afficher le modal de réussite
  // const successModal = document.getElementById('successModal');
  // successModal.style.display = 'block';
}

// Fonction pour vérifier le formulaire et afficher le modal de réussite si tout est ok
function checkAndDisplaySuccessModal() {
  // Appeler la fonction de validation
  if (validateForm()) {
    // Afficher les données du formulaire dans la console
    displayFormData();
    // Afficher le modal de réussite
    toggleModal();
  }
}

// Ajouter un gestionnaire d'événements au bouton "C'est parti"
const submitButton = document.querySelector('#btn-submit');
submitButton.addEventListener('click', function(event) {
  event.preventDefault();
  
  // Appeler la fonction pour vérifier le formulaire et afficher le modal de réussite si tout est ok
  checkAndDisplaySuccessModal();
});

document.querySelector('#btn-close-modal').addEventListener('click', function() {
  closeModalHandler()
})

// Fonction pour obtenir la ville sélectionnée
function getSelectedLocation() {
  const location = document.getElementsByName("location");
  for (let i = 0; i < location.length; i++) {
    if (location[i].checked) {
      return location[i].value;
    }
  }
  return ""; // Retourner une chaîne vide si aucune ville n'est sélectionnée
}

// Fonction pour valider une adresse électronique
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Fonction pour afficher les données du formulaire dans la console
function displayFormData() {
  const form = document.getElementsByName("reserve")[0]; // Accéder au premier élément de la NodeList

  const formData = {
    firstName: form.elements["first"].value.trim(),
    lastName: form.elements["last"].value.trim(),
    email: form.elements["email"].value.trim(),
    birthdate: form.elements["birthdate"].value.trim(),
    quantity: form.elements["quantity"].value.trim(),
    location: getSelectedLocation(),
    checkbox1: form.elements["checkbox1"].checked,
    checkbox2: form.elements["checkbox2"].checked
  };

  console.log("Données du formulaire:", formData);
}
