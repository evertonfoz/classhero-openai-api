export function renderRandomLogo({
  containerSelector = ".mascote_container",
  imageFolder = "../../images/logos",
  imagePrefix = "logo_",
  maxIndex = 2,
  className = "logo-img",
  altText = "ClassHero Logo",
} = {}) {
  const randomIndex = Math.floor(Math.random() * maxIndex) + 1;
  const formattedIndex = String(randomIndex).padStart(3, '0');
  const imagePath = `${imageFolder}/${imagePrefix}${formattedIndex}.png`;

  const container = document.querySelector(containerSelector);
  if (container) {
    container.innerHTML = `<img src="${imagePath}" alt="${altText}" class="${className}" />`;
  }
}
