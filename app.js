/**========================================================================
 *             HTML Element selection and character array
 *========================================================================**/

const searchBar = document.querySelector("#searchBar");
const searchButton = document.querySelector("#searchButton");
const characterName = document.querySelector("#charName");
const display = document.querySelector("#display");
const charHeader = document.querySelector("#CharacterTitle");
const form = document.querySelector("form");
const charImage = document.querySelector("#ImageChar");
const details = document.querySelector("#charDetails");


form.addEventListener("submit", function (e) {
    e.preventDefault();
    details.innerHTML = "";
    charImage.src = "";
    charHeader.innerHTML = "";
    loadCharInfo(searchBar.value);
});




const characters = {
    "Luke Skywalker": 1,
    "C-3PO": 2,
    "R2-D2": 3,
    "Darth Vader": 4,
    "Leia Organa": 5,
    "Owen Lars": 6,
    "Beru Whitesun lars": 7,
    "R5-D4": 8,
    "Biggs Darklighter": 9,
    "Obi-Wan Kenobi": 10,
    "Anakin Skywalker": 11,
    "Wilhuff Tarkin": 12,
    "Chewbacca": 13,
    "Han Solo": 14,
    "Greedo": 15,
    "Jabba Desilijic Tiure": 16,
    "Wedge Antilles": 18,
    "Jek Tono Porkins": 19,
    "Yoda": 20,
    "Palpatine": 21,
    "Boba Fett": 22,
    "IG-88": 23,
    "Bossk": 24,
    "Lando Calrissian": 25,
    "Lobot": 26,
    "Ackbar": 27,
    "Mon Mothma": 28,
    "Arvel Crynyd": 29,
    "Wicket Systri Warrick": 30,
    "Nien Nunb": 31,
    "Qui-Gon Jinn": 32,
    "Nute Gunray": 33,
    "Finis Valorum": 34,
    "Padmé Amidala": 35,
    "Jar Jar Binks": 36,
    "Roos Tarpals": 37,
    "Rugor Nass": 38,
    "Ric Olié": 39,
    "Watto": 40,
    "Sebulba": 41,
    "Quarsh Panaka": 42,
    "Shmi Skywalker": 43,
    "Darth Maul": 44,
    "Bib Fortuna": 45,
    "Ayla Secura": 46,
    "Ratts Tyerel": 47,
    "Dud Bolt": 48,
    "Gasgano": 49,
    "Ben Quadinaros": 50,
    "Mace Windu": 51,
    "Ki-Adi-Mundi": 52,
    "Kit Fisto": 53,
    "Eeth Koth": 54,
    "Adi Gallia": 55,
    "Saesee Tiin": 56,
    "Yarael Poof": 57,
    "Plo Koon": 58,
    "Mas Amedda": 59,
    "Gregar Typho": 60,
    "Cordé": 61,
    "Cliegg Lars": 62,
    "Poggle the Lesser": 63,
    "Luminara Unduli": 64,
    "Barriss Offee": 65,
    "Dormé": 66,
    "Dooku": 67,
    "Bail Prestor Organa": 68,
    "Jango Fett": 69,
    "Zam Wesell": 70,
    "Dexter Jettster": 71,
    "Lama Su": 72,
    "Taun We": 73,
    "Jocasta Nu": 74,
    "R4-P17": 75,
    "Wat Tambor": 76,
    "San Hill": 77,
    "Shaak Ti": 78,
    "Grievous": 79,
    "Tarfful": 80,
    "Raymus Antilles": 81,
    "Sly Moore": 82,
    "Tion Medon": 83
  };
  
  const characterArray = Object.keys(characters).map(name => ({
    name,
    id: characters[name]
  }));

  const options = {
    keys: ['name'], // keys to search in
    threshold: 0.5, // adjust this for more or less fuzzy matching
  };
  //The threshold is from 0 to 1. the higher, the fuzzier.

  const fuse = new Fuse(characterArray, options);


/**========================================================================
 *                             Functions
 *========================================================================**/
function characterSearch2(name){
    const character = fuse.search(name);
    console.log(character);
    if(character.length == 0){
        return -1;
    }
    const result = fuse.search(name)[0].item.id;
    console.log(result);

    return parseInt(fuse.search(name)[0].item.id);
}




async function addCharacterImage(charId) {
    try {
        const id = charId;

        if (id == -1) {
            charHeader.innerText = "Character not found.";
            return;
        }


        charImage.src = `https://vieraboschkova.github.io/swapi-gallery/static/assets/img/people/${id}.jpg`;
        charImage.classList.add("charPic");
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
        
        const character = await axios.get(`https://swapi.dev/api/people/${id}/`);

        
        details.innerHTML = `Birth year: ${character.data.birth_year}<br>Gender: ${character.data.gender}<br>Height: ${character.data.height}<br>Home Planet: ${home}`;
        details.classList.add("text")
        // display.append(charInfo);

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

// async function loadCharInfo(name) {
//     try {
//         const charId = characterSearch2(name);

//        // Make sure both image and details are loaded before updating the DOM
//         const imagePromise = addCharacterImage(charId);
//         const detailsPromise = addCharacterDetails(charId);

//         // Wait for both promises to resolve
//         await Promise.all([imagePromise, detailsPromise]);

//     } catch (error) {
//         console.error('Failed to load character info:', error);
//     }
// }







