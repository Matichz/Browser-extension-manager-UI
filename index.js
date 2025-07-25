let extensionsData = [];

async function fetchData() {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();
    extensionsData = data;
    return data;
  } catch (error) {
    console.error(error);
  }
}

function renderExtensions(data) {
  const extensions = document.getElementById("extensions");
  if (!extensions) return;

  extensions.innerHTML = data
    .map(
      (extension, index) => `
        <div class="extension data-index="${index}">
          <div class="information">
            <img src=${extension.logo} alt="" />
            <div>
              <h4>${extension.name}</h4>
              <p>${extension.description}</p>
            </div>
          </div>
          <div class="configurations-extensions">
            <button class="btn-remove">Remove</button>
             <button class="btn-toggle ${
               extension.isActive ? "btn-toggle-active" : "btn-toggle-inactive"
             }">
              <span class="circle"></span>
            </button>
          </div>
        </div>`
    )
    .join("");
}

function setupFilterButtons() {
  const buttons = document.querySelectorAll(".btn-filter");

  buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Estilos activos
      buttons.forEach((b) => b.classList.remove("filter-active"));
      this.classList.add("filter-active");

      // Filtrado
      let filtered = extensionsData;
      if (btn.classList.contains("btn-filter-active")) {
        filtered = extensionsData.filter((ext) => ext.isActive);
      } else if (btn.classList.contains("btn-filter-inactive")) {
        filtered = extensionsData.filter((ext) => !ext.isActive);
      }

      renderExtensions(filtered);
    });
  });
}

function setupToggleButtons() {
  const toggleButtons = document.querySelectorAll(".btn-toggle");

  toggleButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      // Cambiar el estado en el array
      extensionsData[index].isActive = !extensionsData[index].isActive;
      console.log(extensionsData[index]);

      // Volver a renderizar
      renderExtensions(extensionsData);

      // Volver a asociar eventos
      setupToggleButtons();
    });
  });
}

async function init() {
  const data = await fetchData();
  renderExtensions(data);
  setupFilterButtons();
  setupToggleButtons();
}

init();
