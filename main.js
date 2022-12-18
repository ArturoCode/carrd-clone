import {
  crearInfoAutor,
  crearIconosSociales,
  crearEnlacesDestacados,
  crearEnlacesApoyo,
} from "./links.js";

crearInfoAutor();
crearIconosSociales();
crearEnlacesDestacados();
crearEnlacesApoyo();

fetch("/api/analytics");
