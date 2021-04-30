let ulPeople = document.querySelector('#personajes');
let botones = document.querySelectorAll('.botones div');



function printAllPeople(pListPeople) {

    ulPeople.innerHTML = "";

    //Activamos o desactivamos los botones next/prev.
    botones[0].style.display = (!pListPeople.previous) ? 'none' : 'block';
    botones[1].style.display = (!pListPeople.next) ? 'none' : 'block';

    botones[0].dataset.url = pListPeople.previous;
    botones[1].dataset.url = pListPeople.next;


    //puedo sacar el ultimo caracter de un string con .lenght - 1 o con un split.

    botones[1].addEventListener('click', goToPage);
    botones[0].addEventListener('click', goToPage);

    //Pintado de la lista.
    pListPeople.results.forEach(person => { printPerson(person) })
}

function goToPage(event) {

    //console.log(event.target.dataset.url);

    let urlNum = event.target.dataset.url.split("=")[1];
    //console.log(urlNum);
    getAllPeople(urlNum);

}



function printPerson(pJsonPerson) {
    let li = document.createElement('li');
    let liContent = document.createTextNode(pJsonPerson.name);
    li.dataset.url = pJsonPerson.url;//Con esto asigno a cada personaje su url para identificarlo.

    li.addEventListener('click', getUrlPerson);



    li.appendChild(liContent);
    ulPeople.appendChild(li);
}

function getUrlPerson(event) {
    //limpio la clase de todos los lis. Los recorro con un forEach

    let lis = document.querySelectorAll('#personajes li');
    lis.forEach(li => li.classList.remove('activo'));
    //luego activo el que toque con el boton
    event.target.classList.add('activo');
    getOnePerson(event.target.dataset.url);
}

let section = document.getElementById('vistaPersonaje');

function printInfoPerson(pData) {
    section.innerHTML = "";

    let h2 = document.createElement('h2');
    let ul = document.createElement('ul');
    let contentH2 = document.createTextNode(pData.name);

    ul.innerHTML = `<li>Altura:  ${pData.height} </li>
                    <li>Peso:  ${pData.mass} </li>
                    <li>Color de Piel:  ${pData.skin_color} </li>
                    <li>Color de pelo:  ${pData.hair_color} </li>
                    <li>Genero:  ${pData.gender}</li>
                    <li>Año de Nacimiento:  ${pData.birth_year}</li>`

    h2.appendChild(contentH2);

    let h2Films = document.createElement('h2');
    let divFilms = document.createElement('div');
    divFilms.classList.add('peliculas');


    let contentH2Films = document.createTextNode('Películas donde aparece');

    h2Films.appendChild(contentH2Films);


    section.appendChild(h2);//Creadas arriba de la funtion
    section.appendChild(ul);//Creadas arroba de la funtion

    section.appendChild(h2Films);
    section.appendChild(divFilms);

    let films = pData.films;

    films.forEach(film => getFilm(film));



}

function printInfoFilm(pFilm) {
    let divPeliculas = document.querySelector('.peliculas');

    divPeliculas.innerHTML += `<article>
                                <h3>${pFilm.title}</h3>
                                <ul>
                                    <li>Capitulo: ${pFilm.episode_id} </li>
                                    <li>Director: ${pFilm.director} </li>
                                    <li>Año: ${pFilm.release_date}</li>
                                </ul></article>`;
}
