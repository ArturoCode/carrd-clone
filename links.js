import { infoAutor, iconosSociales, enlacesDestacados, enlacesApoyo} from "./data.js";

export function crearInfoAutor() {
  const userElement = document.getElementById("user");
  const nameElement = document.getElementById("nombre");
  const infoElement = document.getElementById("info");
  userElement.innerHTML = infoAutor.user;
  nameElement.innerHTML = infoAutor.nombre;
  infoElement.innerHTML = infoAutor.info;

  if (infoAutor.fotoPerfil) {
    const fotoPerfilWrapperElement = document.getElementById(
      "fotoPerfilContainer"
    );
    const imageElement = document.createElement("img");
    imageElement.setAttribute("src", infoAutor.fotoPerfil);
    imageElement.classList.add("profileImage");
    fotoPerfilWrapperElement.appendChild(imageElement);
  }
}

export function crearIconosSociales() {
  const iconosSocialesElement = document.getElementById("socialRow");
  for (let link of iconosSociales) {
    if (link.active) {
      const i = document.createElement("i");
      i.classList.add("fa-brands");
      i.classList.add(`fa-${link.iconName}`);

      const a = document.createElement("a");
      a.setAttribute("href", link.url);

      a.appendChild(i);

      iconosSocialesElement.appendChild(a);
    }
  }
}

export function crearEnlacesDestacados() {
  const enlacesDestacadosElement = document.getElementById("links");
  for (let link of enlacesDestacados) {
    if (link.active) {
      const a = document.createElement("a");
      a.setAttribute("href", link.url);
      a.classList.add("whiteButton");
      a.innerHTML = link.text;
      enlacesDestacadosElement.appendChild(a);
    }
  }
}

export function crearEnlacesApoyo() {
  const enlacesApoyoElement = document.getElementById("support");
  for (let link of enlacesApoyo) {
    if (link.active) {
      const a = document.createElement("a");
      a.setAttribute("href", link.url);
      a.classList.add("whiteButton");
      a.innerHTML = link.text;
      enlacesApoyoElement.appendChild(a);
    }
  }
}
