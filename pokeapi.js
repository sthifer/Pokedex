const divListaPokemons$$ = document.querySelector(".poke_container");
const divbotonesPokemons$$ = document.querySelector(".buttons_container");
const buscador$$ = document.querySelector("#buscador");
const cantidadPokemonMostrar = 12;
let totalPokemons = 151;

//Descargamos los pokemon en funcion si hay filtro o no
const descargaListaPokemon = async (offset,busqueda) => {
    let datosApi;
    if(!busqueda)   datosApi  = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${cantidadPokemonMostrar}&offset=${offset}`);
    else datosApi = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokemons}`);
    
    const datosParseados = await datosApi.json();

    !busqueda ? recorrePokemons(datosParseados.results,false) : recorrePokemons(datosParseados.results,true);
}

const descargaPokemon =  (url,busqueda) => {
    fetch(url)
    .then(response => response.json())
    .then(allPokemons => {
        if (allPokemons.id>totalPokemons) return
        if (!busqueda){
        pintarPokemon(allPokemons);
        }else if (allPokemons.name.toUpperCase().trim().includes(buscador$$.value.toUpperCase().trim())){
            pintarPokemon(allPokemons);
        }
    })
}

//Pintamos en HTML cada pokemon
const pintarPokemon = (pokemon) => {
    const unPokemon$$ = document.createElement("div");
    unPokemon$$.className= "pokemon";
    unPokemon$$.style.order = pokemon.id;
    unPokemon$$.innerHTML = `
            <div class='imagen'><img src="${pokemon.sprites.other.dream_world.front_default}" width='100px' height='125px'/></div>
            <h2>${pokemon.name}</h2>
            <div class="info">
            <p>Nº ${pokemon.id}</p>
            <p>${pokemon.types[0].type.name}</p>
            </div>
        `;
        divListaPokemons$$.appendChild(unPokemon$$);
}

//Recorre cada pokemon buscado
const recorrePokemons = (datosParseadosRecorrer,busqueda) => {
    divListaPokemons$$.innerHTML= "";
    datosParseadosRecorrer.forEach(element => {
        descargaPokemon(element.url,busqueda);
    });
        divbotonesPokemons$$.innerHTML = "";
        if (!busqueda && buscador$$.value==="")    creaPaginacion();
}

//Crea los botones de paginación
const creaPaginacion = () =>{
    let totalButton = totalPokemons%cantidadPokemonMostrar === 0 ? Math.floor(totalPokemons/cantidadPokemonMostrar) :  Math.floor(totalPokemons/cantidadPokemonMostrar)+1
    for(let i=0;i<totalButton  ;i++){
        const paginacion = document.createElement('a');
        paginacion.className="paginacion";
        paginacion.href= `?pagina=`+i;
        paginacion.onclick = () =>{
            descargaListaPokemon(i*cantidadPokemonMostrar);
        }
        divbotonesPokemons$$.appendChild(paginacion);
    }
}

const LlamadaBoton = () =>{
    //Quito get
    window.history.pushState({}, document.title, window.location.origin + window.location.pathname );
    //Si es vacío vuelvo al original
    if (buscador$$.value.trim()==="") {
        descargaListaPokemon(0);
        return;
    }
    //Busco
    descargaListaPokemon(0,true);
}

//Recupero Get
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//Evento Enter
buscador$$.addEventListener("keypress",function(event){
    if (event.key==="Enter") LlamadaBoton();
})

//inicialización
getParameterByName('pagina')==="" ? descargaListaPokemon(0) : descargaListaPokemon(getParameterByName('pagina')*cantidadPokemonMostrar);