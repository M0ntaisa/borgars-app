const searchBtn = document.getElementById('search-btn');
const borgarList = document.getElementById('borgar');
const borgarDetailsContent = document.querySelector('.borgar-details-content');
const detailCloseBtn = document.getElementById('recipe-close-btn');

// get borgar list that match with ing
const getBorgarList = () => {
  let seachInputTxt = document.getElementById('search-input').value.trim();
  fetch(`https://oreno-borgar-api.herokuapp.com/burgers`)
    .then(response => response.json())
    .then(data => {
      let html = "";
      if(data) {
        // console.log(data[0].name);
        data.forEach(burger => {
          html += `
            <div class = "borgar-item" data-id="${burger.id}">
              <div class = "borgar-img">
                <img src = "https://media.istockphoto.com/id/1309352410/photo/cheeseburger-with-tomato-and-lettuce-on-wooden-board.jpg?b=1&s=170667a&w=0&k=20&c=1cK5UjNzhvbvqLX6sOG-lIjWv5FuRhfsbI0dIqNAla8=" alt = "food">
              </div>
              <div class = "borgar-name">
                <h3>${burger.name}</h3>
                <a href = "#" class = "recipe-btn">Get Recipe</a>
              </div>
            </div>
          `;
        });
        borgarList.classList.remove('notFound');
      } else {
        html = "Sorry, we didn't found any borgars";
      }
      borgarList.innerHTML = html;
    });
}

// get detals of borgar
const getBorgarDetails = (e) => {
  e.preventDefault();
  if(e.target.classList.contains('recipe-btn')){
    let borgarItem = e.target.parentElement.parentElement;
    fetch(`https://oreno-borgar-api.herokuapp.com/burgers?id=${borgarItem.dataset.id}`)
      .then(response => response.json())
      .then(data => borgarDetailModal(data));
  }
}

// event listeners
searchBtn.addEventListener('click', getBorgarList);
borgarList.addEventListener('click', getBorgarDetails);
detailCloseBtn.addEventListener('click', () => {
  borgarDetailsContent.parentElement.classList.remove('showRecipe');
})

// create modal
const borgarDetailModal = (borgar) => {
  borgar = borgar[0];
  let html = `
      <h2 class = "recipe-title">${borgar.name}</h2>
      <p class = "recipe-category">${borgar.description}</p>
      <div class = "recipe-instruct">
      <h3>Ingredients:</h3>
  `;
  borgar.ingredients.forEach(ing => {
    html += `
        <ul><li>${ing}</li></ul>
    `;
  })
  html += `
    </div>
    <div class = "recipe-borgar-img">
      <img src = "https://media.istockphoto.com/id/1309352410/photo/cheeseburger-with-tomato-and-lettuce-on-wooden-board.jpg?b=1&s=170667a&w=0&k=20&c=1cK5UjNzhvbvqLX6sOG-lIjWv5FuRhfsbI0dIqNAla8=" alt = "">
    </div>
    <div class = "recipe-link">
      <a href = "${borgar.web}" target = "_blank">Visit Web</a>
    </div>
  `;
  borgarDetailsContent.innerHTML = html;
  borgarDetailsContent.parentElement.classList.add('showRecipe');
}