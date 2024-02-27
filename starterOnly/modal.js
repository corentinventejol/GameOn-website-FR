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

  
  // Si elle est cochée et que les autres sont valides, sauvegarder dans le localStorage
  const wishToBeNotified = checkbox2.checked;
  if (isValid) {
    localStorage.setItem('wishToBeNotified', 'true');
  }

  // Retourner l'état de validation global
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

// Ajouter un gestionnaire d'événements au bouton "C'est parti"
const submitButton = document.querySelector('.btn-submit');
submitButton.addEventListener('click', function(event) {
  event.preventDefault();
  
  // Appeler la fonction de validation
  if (validateForm()) {
    
    // Afficher un message de succès
    alert("Merci ! Votre réservation a été reçue.");

    // Obtenir les données existantes du localStorage s'il y en a
    let existingData = JSON.parse(localStorage.getItem('formData')) || {};

    // Sauvegarde des données du formulaire dans le localStorage
    const form = document.getElementsByName("reserve")[0]; // Accéder au premier élément de la NodeList
    const formData = {
      firstName: form.elements["first"].value,
      lastName: form.elements["last"].value,
      email: form.elements["email"].value,
      birthdate: form.elements["birthdate"].value,
      quantity: form.elements["quantity"].value,
      location: getSelectedLocation(),
      agreementChecked: form.elements["checkbox1"].checked,
      wishToBeNotified: form.elements["checkbox2"].checked
    };

    // Combiner les nouvelles données du formulaire avec les données existantes
    const updatedData = {...existingData, ...formData};

    // Sauvegarder les données combinées dans le localStorage
    localStorage.setItem('formData', JSON.stringify(updatedData));

    // Fermer le modal
    closeModalHandler();
  }
});

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
