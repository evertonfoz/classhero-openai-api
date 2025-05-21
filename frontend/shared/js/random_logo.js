export function renderRandomLogo({
  containerSelector = ".mascote_container",
  imageFolder = "../../images/logos",
  imagePrefix = "logo_",
  maxIndex = 3,
  altText = "Logo ClassHero"
} = {}) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const randomIndex = Math.floor(Math.random() * maxIndex) + 1;
  const imagePath = `${imageFolder}/${imagePrefix}${String(randomIndex).padStart(3, '0')}.png`;

  const img = document.createElement("img");
  img.src = imagePath;
  img.alt = altText;
  img.className = "w-[70vw] max-w-xs md:max-w-sm lg:max-w-md h-auto transition-transform duration-500 hover:scale-105";

  container.innerHTML = "";
  container.appendChild(img);
}