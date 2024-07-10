/**========================================================================
 *                         HTML Element selection
 *========================================================================**/

const searchBar = document.querySelector("#searchBar");
const searchButton = document.querySelector("#searchButton");
const characterName = document.querySelector("#charName");
const display = document.querySelector("#display");
const charHeader = document.querySelector("#CharacterTitle");
const form = document.querySelector("form");


form.addEventListener("submit", function(e){
    e.preventDefault();
    display.innerHTML = "";
    charHeader.innerHTML ="";
    loadCharInfo(searchBar.value);
});



/**========================================================================
 *                             Functions
 *========================================================================**/

async function characterSearch(name) {
    try {
        let chIDImg = 1;
        for (let page = 1; page < 10; page++) {
            const queries = {params:{page:page}}
            const characters = await axios.get(`https://swapi.dev/api/people`,queries)
            //console.log(characters);
            for (let i = 0; i < characters.data.results.length; i++) {
                //console.log(characters.data.results[i].name);
                let normalisedSearch = characters.data.results[i].name.replace(/[\s-]/g, '').toLowerCase();
                let normalisedResults = name.replace(/[\s-]/g, '').toLowerCase();
                if (normalisedSearch == normalisedResults) {
                    return [i + 1,chIDImg];
                }
                chIDImg++;
            }
            
        }
        return -1;
    }
    catch (e) {
        console.log("Error fetching characters: ", e);
        throw e;
    }

}


async function addCharacterImage(charId) {
    try {
        const id = await charId;
        let picID = id[1];
        if(id[1] > 16){
            picID = id[1] + 1;
            
        }
        if(id == -1){
            charHeader.innerText = "Character not found."
            return;
        }
        const charImage = document.createElement("img");

        charImage.src = `https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${picID}.jpg`;
        charImage.classList.add("charPic");
        display.append(charImage);
    } catch (error) {
        console.error('Failed to add character image:', error);
    }
}


async function addCharacterDetails(charId) {
    try{
        const id = await charId;
        const home = await getHomePlanet(id);

        if(id == -1){
            return;
        }
        const charInfo = document.createElement("p");
        const character = await axios.get(`https://swapi.dev/api/people/${id[1]}/`);
        charInfo.innerHTML = `Birth year: ${character.data.birth_year}<br>Gender: ${character.data.gender}<br>Height: ${character.data.height}<br>Home Planet: ${home}`;
        charInfo.classList.add("text")
        display.append(charInfo);

        charHeader.innerHTML = character.data.name;
    }
    catch(error){
        console.error('Failed to add character info:', error);
    }

}

async function getHomePlanet(charId){
    try{
        const id = await charId;
        if(id[1] > 16){
            id[1] = id[1] + 1;
        }
        if(id == -1){
            return;
        }
        const character = await axios.get(`https://swapi.dev/api/people/${id[1]}/`);
        const homePlanet = await axios.get(character.data.homeworld);
        return homePlanet.data.name;
    }
    catch{
        console.log("No planet details");

    }
}



function loadCharInfo(name){
    console.log(name);
    addCharacterImage(characterSearch(name));
    addCharacterDetails(characterSearch(name));
}




