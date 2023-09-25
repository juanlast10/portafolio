//Menu lateral
let menu_visible = false;
let menu = document.getElementById("nav");
function mostrarOcultarMenu() {
  if (menu_visible == false) {
    //si esta oculto
    menu.style.display = "block";
    menu_visible = true;
  } else {
    menu.style.display = "none";
    menu_visible = false;
  }
}

//Oculto el menu una vez que seleccione una opcion
let links = document.querySelectorAll("nav a");
for (var x = 0; x < links.length; x++) {
  links[x].onclick = function () {
    menu.style.display = "none";
    menu_visible = false;
  };
}
//Dark mode toggle
function dark_mode() {
  const preferedColorScheme = window.matchMedia("(prefers-color-scheme: dark")
    .matches
    ? "dark"
    : "light";
  const modeToggle = document.getElementById("dark-mode-toggle");
  const labelToggle = document.getElementById("label-toggle");

  const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };
  modeToggle.addEventListener("click", (event) => {
    let switchToTheme =
      localStorage.getItem("theme") === "dark" ? "light" : "dark";
    setTheme(switchToTheme);
    if (localStorage.getItem("theme") === "dark") {
      labelToggle.innerHTML =
        '<i class="fa-solid fa-sun fa-xl" style="color: #ffffff;"></i>';
    } else {
      labelToggle.innerHTML =
        '<i class="fa-solid fa-moon fa-xl" style="color: #ffffff;"></i>';
    }
  });

  setTheme(localStorage.getItem("theme") || preferedColorScheme);
}
dark_mode();

// Portfolio Item Filter
const filterContainer = document.querySelector(".portfolio-filter"),
  filterBtns = filterContainer.children;
totalFilterBtn = filterBtns.length;
(portfolioItems = document.querySelectorAll(".portfolio-item")),
  (totalPortfolioItem = portfolioItems.length);
console.log(totalPortfolioItem);

for (let i = 0; i < totalFilterBtn; i++) {
  filterBtns[i].addEventListener("click", function () {
    filterContainer.querySelector(".active").classList.remove("active");
    this.classList.add("active");
    const filterValue = this.getAttribute("data-filter");
    for (let j = 0; j < totalPortfolioItem; j++) {
      if (filterValue === portfolioItems[j].getAttribute("data-category")) {
        portfolioItems[j].classList.remove("hide");
        portfolioItems[j].classList.add("show");
      } else {
        portfolioItems[j].classList.remove("show");
        portfolioItems[j].classList.add("hide");
      }
      if (filterValue === "all") {
        portfolioItems[j].classList.remove("hide");
        portfolioItems[j].classList.add("show");
      }
    }
  });
}

// Lightbox Modal
const lightbox = document.querySelector(".lightbox"),
  lightboxImg = lightbox.querySelector(".lightbox-img"),
  lightboxClose = lightbox.querySelector(".lightbox-close"),
  lightboxText = lightbox.querySelector(".caption-text"),
  lightboxCounter = lightbox.querySelector(".caption-counter");
let itemIndex = 0;
for (let i = 0; i < totalPortfolioItem; i++) {
  portfolioItems[i].addEventListener("click", function () {
    itemIndex = i;
    changeItem();
    toggleLighbox();
  });
}

function nextItem() {
  if (itemIndex === totalPortfolioItem - 1) {
    itemIndex = 0;
  } else {
    itemIndex++;
  }
  changeItem();
}

function prevItem() {
  if (itemIndex === 0) {
    itemIndex = totalPortfolioItem - 1;
  } else {
    itemIndex--;
  }
  changeItem();
}

function toggleLighbox() {
  lightbox.classList.toggle("open");
}

function changeItem() {
  const portfolioItem = portfolioItems[itemIndex];
  const imgSrc = portfolioItem
    .querySelector(".portfolio-img img")
    .getAttribute("src");
  const link = portfolioItem.getAttribute("data-link");

  lightboxImg.src = imgSrc;
  lightboxText.innerHTML = portfolioItem.querySelector("h4").innerHTML;
  lightboxCounter.innerHTML = itemIndex + 1 + " of " + totalPortfolioItem;

  const lightButtonLink = document.querySelector(".light-button a");
  lightButtonLink.href = link;
}

lightbox.addEventListener("click", function (event) {
  if (event.target === lightboxClose || event.target === lightbox) {
    toggleLighbox();
  }
});

//Creacion las barritas de una barra particular identificada por su id
function crearBarra(id_barra) {
  for (i = 0; i <= 16; i++) {
    let div = document.createElement("div");
    div.className = "e";
    id_barra.appendChild(div);
  }
}

//Selecciono todas las barras generales para luego manipularlas
let html = document.getElementById("html");
crearBarra(html);
let javascript = document.getElementById("javascript");
crearBarra(javascript);
let wordpress = document.getElementById("wordpress");
crearBarra(wordpress);
let photoshop = document.getElementById("photoshop");
crearBarra(photoshop);
let php = document.getElementById("php");
crearBarra(php);
let ilustrator = document.getElementById("ilustrator");
crearBarra(ilustrator);
//Guardar la cantidad de barritas que se van a ir pintando por cada barar
//Para eso utilizamos un arreglo, cada posicion pertenece a un elemento
//Comienza en -1 porque no tiene ninguna pintada al iniciarse
let contadores = [-1, -1, -1, -1, -1, -1];
//Esta variable se utiliza como bandera para saber si ya se ejecuto la animacion
let entro = false;

//Funcion que aplica las animaciones de las habilidades
function efectoHabilidades() {
  let habilidades = document.getElementById("habilidades");
  let distancia_skills =
    window.innerHeight - habilidades.getBoundingClientRect().top;
  if (distancia_skills >= 300 && entro == false) {
    entro = true;
    const intervalHtml = setInterval(function () {
      pintarBarra(html, 16, 0, intervalHtml);
    }, 100);
    entro = true;
    const intervalJavascript = setInterval(function () {
      pintarBarra(javascript, 11, 1, intervalJavascript);
    }, 100);
    const intervalWordpress = setInterval(function () {
      pintarBarra(wordpress, 11, 2, intervalWordpress);
    }, 100);
    const intervalPhotoshop = setInterval(function () {
      pintarBarra(photoshop, 15, 3, intervalPhotoshop);
    }, 100);
    const intervalPhp = setInterval(function () {
      pintarBarra(php, 16, 4, intervalPhp);
    }, 100);
    const intervalIlustrator = setInterval(function () {
      pintarBarra(ilustrator, 11, 5, intervalIlustrator);
    }, 100);
  }
}

//llenado una barra particular con la cantidad indicada
function pintarBarra(id_barra, cantidad, indice, interval) {
  contadores[indice]++;
  x = contadores[indice];
  if (x < cantidad) {
    let elemento = id_barra.getElementsByClassName("e");
    elemento[x].style.backgroundColor = "#17a112";
  } else {
    clearInterval(interval);
  }
}

//detecto el scrolling del mouse para aplicar la animacion de la barra
window.onscroll = function () {
  efectoHabilidades();
};

// Inicializa ScrollReveal.js
ScrollReveal().reveal(".titulo-seccion", {
  origin: "left", // Establece el origen de la animación
  distance: "20px", // Establece la distancia del desplazamiento
  duration: 1000, // Establece la duración de la animación en milisegundos
  easing: "ease", // Establece la función de interpolación de la animación
  reset: true, // Restablece la animación en cada desplazamiento
});

const testimonios = [
  {
    foto: "cliente1.png",
    titulo: "Excelente trabajo!!",
    texto:
      "Voluptatibus quasi autem voluptatum exercitationem, hic esse temporibus vel minima sint natus debitis veritatis accusantium? Ab atque quas sint sapiente itaque totam?",
    nombre: "Mark S.",
    puesto: "San CEO and WP Dev",
  },
  {
    foto: "cliente2.png",
    titulo: "Cumpliendo siempre a tiempo.",
    texto:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quasi autem voluptatum exercitationem, hic esse temporibus",
    nombre: "Ana J.",
    puesto: "Web Designer",
  },
  {
    foto: "cliente3.png",
    titulo: "Trabajos de excelente calidad",
    texto:
      "hic esse temporibus vel minima sint natus debitis veritatis accusantium? Ab atque quas sint sapiente itaque totam.",
    nombre: "Pedro S.",
    puesto: "CEO, Web Developer",
  },
  {
    foto: "cliente4.png",
    titulo: "Calidad garantizada",
    texto:
      "hic esse temporibus vel minima sint natus debitis veritatis accusantium? Ab atque quas sint sapiente itaque totam.",
    nombre: "Marta T.",
    puesto: "Fotografa",
  },
];

//Variable que controla la ubicación del testimonio actual.
var pos = 0;
//Función para avaznar al siguiente testimonio
function siguiente() {
  pos++;
  document.getElementById("imgCliente").src = "img/" + testimonios[pos].foto;
  document.getElementById("tituloCliente").innerText = testimonios[pos].titulo;
  document.getElementById("txtCliente").innerText = testimonios[pos].texto;
  document.getElementById("nombreCliente").innerText = testimonios[pos].nombre;
  document.getElementById("puestoCliente").innerText = testimonios[pos].puesto;

  if (pos == 3) {
    pos = -1;
  }
}

//Función para cerrar el menu
function cerrar() {
  document.getElementsByClassName("nav-menu")[0].style.top = "-100%";
}
//Función para abrir el menu
function verMenu() {
  document.getElementsByClassName("nav-menu")[0].style.top = "0";
}