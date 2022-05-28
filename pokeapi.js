const divListaPokemons$$ = document.querySelector(".poke_container");
const divTypeList$$ = document.querySelector(".type_container");
const divbotonesPokemons$$ = document.querySelector(".buttons_container");
const finder$$ = document.querySelector("#buscador");
const PokemonToShow = 12;
let totalPokemons = 151;
let POKEMONLIST = [];
let TYPESLIST = [];

const FechPokemon = async () => {
    let datosApi,datosParseados;
    for(let i=1; i<=totalPokemons; i++){
        datosApi = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        datosParseados = await datosApi.json();
        POKEMONLIST = [...POKEMONLIST,datosParseados];
    }
    RunList(1,false);
}

const FechTypes = async () => {
    let datosApi,datosParseados;
    datosApi = await fetch('https://pokeapi.co/api/v2/type/');
    datosParseados = await datosApi.json();
    for (const key in datosParseados.results) {
            const element = datosParseados.results[key];
             if (element.name==="unknown" || element.name==="dark" || element.name==="shadow") continue;
            
            TYPESLIST = [...TYPESLIST,element.name];
    }
    RunTypes();
}

const RunTypes = () =>{
    TYPESLIST.forEach((element) =>{
        const TypeDiv$$ = document.createElement('div');
        TypeDiv$$.classList.add('types')
        const TypeButton$$ = document.createElement('button');
        TypeButton$$.innerText= element;
        TypeButton$$.onclick = () => RunList(1,true,element);
        TypeDiv$$.appendChild(TypeButton$$);
        divTypeList$$.appendChild(TypeDiv$$);
    })
}


const RunList = (offset,busqueda,typePokemon = "") =>{
    POKEMONLIST.sort((a,b) => a.id - b.id);
    divbotonesPokemons$$.innerHTML="";
    divListaPokemons$$.innerHTML= "";
    if (!busqueda){
        POKEMONLIST
        .filter(pokemon =>{
            if (pokemon.id>=offset && pokemon.id<offset+PokemonToShow ) {
                return pokemon};
        })
        .forEach(PokemonToShow => PrintPokemon(PokemonToShow))
        if (offset===1) CreatePages();
    }else{
        const buscado = finder$$.value.toLowerCase();
        POKEMONLIST
        .filter(pokemon =>{
            if (typePokemon !== "" && (pokemon.types[0].type.name===typePokemon || (pokemon.types.length>1 && pokemon.types[1].type.name===typePokemon))){
                return pokemon;
            }else if (typePokemon === "" && pokemon.name.includes(buscado)) {
                return pokemon};
        })
        .forEach(PokemonToShow => PrintPokemon(PokemonToShow))
    }
}

const ClickToTurn = (pokemon) =>{
    const divPokemon$$ = document.querySelector(`.pokemon-${pokemon.id}`);
    divPokemon$$.classList.add('girado');
    divPokemon$$.innerHTML= "";
    divPokemon$$.onclick = () => SeeFront(pokemon);
    if (pokemon.abilities[0].ability.name){
        divPokemon$$.innerHTML += `<p>1ª Habilidad: <span>${pokemon.abilities[0].ability.name}</span></p>`
    }
    if (pokemon.abilities[1].ability.name){
        divPokemon$$.innerHTML += `<p>2ª Habilidad: <span>${pokemon.abilities[1].ability.name}</span></p>`
    }
    if (pokemon.stats){
        divPokemon$$.innerHTML += `<p>HP: <span>${pokemon.stats[0].base_stat}</span></p>`
        divPokemon$$.innerHTML += `<p>Ataque: <span>${pokemon.stats[1].base_stat}</span></p>`
        divPokemon$$.innerHTML += `<p>Defensa: <span>${pokemon.stats[2].base_stat}</span></p>`
    }
}

const SeeFront = (pokemon) =>{

    const divPokemon$$ = document.querySelector(`.pokemon-${pokemon.id}`);
    divListaPokemons$$.removeChild(divPokemon$$);
    PrintPokemon(pokemon);
}

const PrintPokemon = (pokemon) => {
    const unPokemon$$ = document.createElement("div");
    unPokemon$$.classList.add("pokemon");
    unPokemon$$.classList.add(`pokemon-${pokemon.id}`);
    unPokemon$$.onclick = () => ClickToTurn(pokemon);
    unPokemon$$.style.order = pokemon.id;
    unPokemon$$.innerHTML = `
            <div class='imagen'><img src='${pokemon.sprites.other.dream_world.front_default}' alt='${pokemon.name}' width='100px' height='125px'/></div>
            <h2>${pokemon.name}</h2>
            <div class="info">
            <p>Nº ${pokemon.id}</p>
            <p>${pokemon.types[0].type.name}</p>
            </div>
        `;
    divListaPokemons$$.appendChild(unPokemon$$);
}

const CreatePages = () =>{
    let totalButton = totalPokemons%PokemonToShow === 0 ? Math.floor(totalPokemons/PokemonToShow) :  Math.floor(totalPokemons/PokemonToShow)+1
    for(let i=0;i<totalButton;i++){
        const paginacion = document.createElement('button');
        paginacion.className="paginacion";
        paginacion.onclick = () =>  RunList(i*PokemonToShow,false);
        divbotonesPokemons$$.appendChild(paginacion);
    }
}

const Search = () =>{
    if (finder$$.value.trim()==="") RunList(1,false);
    else RunList(1,true);
}

finder$$.addEventListener("keypress",(event) => {if (event.key==="Enter") Search()});

//inicialización
FechPokemon();
FechTypes();