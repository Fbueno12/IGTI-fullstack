'use strict'
const searchInput = document.querySelector("#search_bar");
const btnSearch   = document.querySelector("#btn_search");
const el_males    = document.querySelector("#males");
const el_females  = document.querySelector("#females");
const el_sum_ages = document.querySelector("#sum_ages");
const el_mid_ages = document.querySelector("#mid_ages");

const api = {
  baseUrl: "https://randomuser.me/api",
  get: async (params) => {
    let result = await fetch(api.baseUrl + params);
    result = await result.json();
    return result.results;
  }
}

window.addEventListener('load', async () => {
  const users = await api.get('/?seed=javascript&results=100&nat=BR&noinfo');

  searchInput.addEventListener('keyup', (event) => {
    if(searchInput.value == "") {
      btnSearch.setAttribute("disabled", true);
      return;
    }
    btnSearch.removeAttribute("disabled");

    if(event.code == "Enter" || event.code == "NumpadEnter") {
      findUsers(searchInput.value, users);
    }
  });

  btnSearch.addEventListener('click', () => findUsers(searchInput.value, users));
  
})

function findUsers(text, users) {
  const body = document.querySelector('.content');
  let males = 0;
  let females = 0;
  let midAge = 0;
  let sumAge = 0;
  body.innerHTML = "";

  const filtered = users.filter(value => {
    const first = value.name.first.toLowerCase();
    const last  = value.name.last.toLowerCase();

    return first.includes(text) || last.includes(text);
  });
  
  if(filtered.length <= 0) {
    body.append(createElement('h4', 'no users found'));
    return;
  }

  filtered.forEach(user => {
    const {name, gender, email, picture, dob} = user;

    if (user.gender == "female") {
      females += 1;
    } else {
      males += 1;
    }
    sumAge += dob.age;

    const div = createElement('div');
    
    const userImage = createImage(picture.medium, email);
    userImage.setAttribute('class', 'user_image');

    const userName = createElement('p', `${name.first} ${name.last}, age: ${dob.age}`);
    userName.setAttribute('class', 'user_name');

    div.append(userImage);
    div.append(userName);
    
    body.append(div);
  });

  el_males.innerHTML = males;
  el_females.innerHTML = females;
  el_sum_ages.innerHTML = sumAge;
  el_mid_ages.innerHTML = Math.floor(sumAge / filtered.length) || 0;

  console.log(filtered);
}

function createImage(path, alternativeText = 'no alt') {
  const image = document.createElement('img');
  image.setAttribute('src', path);
  image.setAttribute('alt', alternativeText);

  return image;
}

function createElement(element, value) {
  const elemento = document.createElement(element);
  if(value) {
    elemento.append(document.createTextNode(value));
  }

  return elemento;
}