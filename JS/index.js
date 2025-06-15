let dogData = [];

function renderDogs(dogs) {
  const container = document.getElementById("dogContainer");
  container.innerHTML = "";

  dogs.forEach(dog => {
    const card = document.createElement("div");
    card.className = "row";

    card.innerHTML = `
      <div class="col-4 pictures">
        <img src="${dog.image}" alt="${dog.name}">
      </div>
      <div class="col-4 dogTextCont">
        <a href="#">${dog.name}</a>
        <ul>
          <li>${dog.gender}</li>
          <li>${dog.size}</li>
          <li>${dog.childFriendly ? "Gyerekbarát" : "Nem Gyerekbarát"}</li>
        </ul>
      </div>
      <div class="col-4">
        <i class="fa-solid fa-chevron-right arrowRights"></i>
      </div>
    `;

    container.appendChild(card);
  });
}

// Reset scroll on reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", function () {
  const footer = document.getElementById("footer");
  let lastScrollY = window.scrollY;

  function handleScrollDirection() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      footer.style.transform = 'translateY(50px)';
      footer.style.opacity = "0";
    } else {
      footer.style.transform = 'translateY(0)';
      footer.style.opacity = "1";
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', handleScrollDirection);
});

// Create dog
document.getElementById("createDog").addEventListener("click", function () {
  const name = document.getElementById("dogName").value.trim();
  const size = document.getElementById("size").value;
  const gender = document.getElementById("gender").value;
  const isChildFriendly = document.getElementById("childFriendly").checked;
  const imageInput = document.getElementById("dogImage");
  const imageFile = imageInput.files[0];

  if (!name) {
    alert("Kérlek írd be a kutya nevét!");
    return;
  }

  if (!imageFile) {
    alert("Kérlek tölts fel egy képet a kutyáról!");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const imgSrc = e.target.result;

    dogData.push({
      name: name,
      size: size,
      gender: gender,
      childFriendly: isChildFriendly,
      image: imgSrc
    });

    renderDogs(dogData);

    document.getElementById("dogName").value = "";
    document.getElementById("size").value = "kicsi";
    document.getElementById("gender").value = "kan";
    document.getElementById("childFriendly").checked = false;
    imageInput.value = "";
  };

  reader.readAsDataURL(imageFile);
});

// Filter dogs
function applyFilters() {
  const selectedSize = document.getElementById("filterSize").value;
  const selectedGender = document.getElementById("filterGender").value;
  const childFriendlyOnly = document.getElementById("filterChildFriendly").checked;

  const filteredDogs = dogData.filter(dog => {
    const sizeMatch = selectedSize ? dog.size === selectedSize : true;
    const genderMatch = selectedGender ? dog.gender === selectedGender : true;
    const childMatch = childFriendlyOnly ? dog.childFriendly === true : true;

    return sizeMatch && genderMatch && childMatch;
  });

  renderDogs(filteredDogs);
}
document.getElementById("resetFiltersBtn").addEventListener("click", function (e) {
  e.preventDefault();

  document.getElementById("filterSize").value = "";
  document.getElementById("filterGender").value = "";
  document.getElementById("filterChildFriendly").checked = false;

  renderDogs(dogData);
});


// Buttons & UI events
document.getElementById("applyFiltersBtn").addEventListener("click", function (e) {
  e.preventDefault();
  applyFilters();
});

const addBtn = document.getElementById("addBtn");
const dogForm = document.getElementById("dogForm");
const offCanvasClose = document.getElementById("offCanvasClose");
const dogFilter = document.getElementById("dogFilter");
const filterBtn = document.getElementById("filterBtn");

addBtn.addEventListener("click", () => {
  dogForm.style.display = "block";
});

offCanvasClose.addEventListener("click", () => {
  dogForm.style.display = "none";
  dogFilter.style.display = "none";
});

filterBtn.addEventListener("click", () => {
  dogFilter.style.display = "block";
});
