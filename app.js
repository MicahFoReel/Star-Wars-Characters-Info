/**========================================================================
 *             HTML Element selection and character array
 *========================================================================**/

const searchBar = document.querySelector("#searchBar");
const searchButton = document.querySelector("#searchButton");
const characterName = document.querySelector("#charName");
const display = document.querySelector("#display");
const charHeader = document.querySelector("#CharacterTitle");
const form = document.querySelector("form");


form.addEventListener("submit", function (e) {
    e.preventDefault();
    display.innerHTML = "";
    charHeader.innerHTML = "";
    loadCharInfo(searchBar.value);
});




const characters = {
    "lukeskywalker": 1,
    "luke": 1,
    "c3po": 2,
    "r2d2": 3,
    "darthvader": 4,
    "vader": 4,
    "leiaorgana": 5,
    "leia": 5,
    "owenlars": 6,
    "beruwhitesunlars": 7,
    "r5d4": 8,
    "biggsdarklighter": 9,
    "obiwankenobi": 10,
    "anakinskywalker": 11,
    "anakin": 11,
    "wilhufftarkin": 12,
    "tarkin": 12,
    "chewbacca": 13,
    "hansolo": 14,
    "greedo": 15,
    "jabbadesilijictiure": 16,
    "jabba": 16,
    "jabbathehutt": 16,
    "wedgeantilles": 18,
    "jektonoporkins": 19,
    "yoda": 20,
    "palpatine": 21,
    "emperor": 21,
    "theemperor": 21,
    "bobafett": 22,
    "boba": 22,
    "ig88": 23,
    "bossk": 24,
    "landocalrissian": 25,
    "lobot": 26,
    "ackbar": 27,
    "monmothma": 28,
    "arvelcrynyd": 29,
    "wicketsystriwarrick": 30,
    "niennunb": 31,
    "quigonjinn": 32,
    "quigon": 32,
    "nutegunray": 33,
    "finisvalorum": 34,
    "padméamidala": 35,
    "jarjarbinks": 36,
    "jarjar": 36,
    "roostarpals": 37,
    "rugornass": 38,
    "ricolié": 39,
    "watto": 40,
    "sebulba": 41,
    "quarshpanaka": 42,
    "shmiskywalker": 43,
    "darthmaul": 44,
    "bibfortuna": 45,
    "aylasecura": 46,
    "rattstyerel": 47,
    "dudbolt": 48,
    "gasgano": 49,
    "benquadinaros": 50,
    "macewindu": 51,
    "kiadimundi": 52,
    "kitfisto": 53,
    "eethkoth": 54,
    "adigallia": 55,
    "saeseetiin": 56,
    "yaraelpoof": 57,
    "plokoon": 58,
    "plo": 58,
    "masamedda": 59,
    "gregartypho": 60,
    "cordé": 61,
    "cliegglars": 62,
    "pogglethelesser": 63,
    "luminaraunduli": 64,
    "barrissoffee": 65,
    "dormé": 66,
    "dooku": 67,
    "countdooku": 67,
    "bailprestororgana": 68,
    "bailorgana": 68,
    "bail": 68,
    "jangofett": 69,
    "jango": 69,
    "zamwesell": 70,
    "dexterjettster": 71,
    "lamasu": 72,
    "taunwe": 73,
    "jocastanu": 74,
    "r4p17": 75,
    "wattambor": 76,
    "sanhill": 77,
    "shaakti": 78,
    "grievous": 79,
    "generalgrievous": 79,
    "tarfful": 80,
    "raymusantilles": 81,
    "slymoore": 82,
    "tionmedon": 83
  };
  




/**========================================================================
 *                             Functions
 *========================================================================**/
function characterSearch2(name){
    let normalisedSearch = name.replace(/[\s-]/g, '').toLowerCase();
    console.log(normalisedSearch);
    console.log(characters[normalisedSearch]);
    if(characters[normalisedSearch] == undefined){
        return -1;
    }
    return parseInt(characters[normalisedSearch]);
}




async function addCharacterImage(charId) {
    try {
        const id = charId;
 
        if (id == -1) {
            charHeader.innerText = "Character not found."
            return;
        }
        const charImage = document.createElement("img");

        charImage.src = `https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${id}.jpg`;
        charImage.classList.add("charPic");
        display.append(charImage);
    } catch (error) {
        console.error('Failed to add character image:', error);
    }
}


async function addCharacterDetails(charId) {
    try {
        const id = charId;
        const home = await getHomePlanet(id);

        if (id == -1) {
            return;
        }
        const charInfo = document.createElement("p");
        const character = await axios.get(`https://swapi.dev/api/people/${id}/`);
        charInfo.innerHTML = `Birth year: ${character.data.birth_year}<br>Gender: ${character.data.gender}<br>Height: ${character.data.height}<br>Home Planet: ${home}`;
        charInfo.classList.add("text")
        display.append(charInfo);

        charHeader.innerHTML = character.data.name;
    }
    catch (error) {
        console.error('Failed to add character info:', error);
    }

}

async function getHomePlanet(charId) {
    try {
        const id = charId;
        if (id > 16) {
            id = id + 1;
        }
        if (id == -1) {
            return;
        }
        const character = await axios.get(`https://swapi.dev/api/people/${id}/`);
        const homePlanet = await axios.get(character.data.homeworld);
        return homePlanet.data.name;
    }
    catch {
        console.log("No planet details");

    }
}



function loadCharInfo(name) {
    console.log(name);
    addCharacterImage(characterSearch2(name));
    addCharacterDetails(characterSearch2(name));
}






