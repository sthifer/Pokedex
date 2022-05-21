const divListaPokemons$$ = document.querySelector(".listaPokemon");
const divbotonesPokemons$$ = document.querySelector(".botones-paginacion");
const buscador$$ = document.querySelector("#buscador");
const cantidadPokemonMostrar = 12;
let totalPokemons = 150;

const descargaListaPokemonLimitada = async (offset) => {

    const datosApi = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${cantidadPokemonMostrar}&offset=${offset}`);
    const datosParseados = await datosApi.json();
    muestraPokemons(datosParseados.results,false);
}

const descargaPokemon =  (url,busqueda) => {
    fetch(url)
    .then(response => response.json())
    .then(allPokemons => {
        if (!busqueda){
        pintarPokemon(allPokemons);
        }else if (allPokemons.name.toUpperCase().trim().includes(buscador$$.value.toUpperCase().trim())){
            pintarPokemon(allPokemons);
        }
    })
}

const pintarPokemon = (pokemon) => {
    const unPokemon$$ = document.createElement("div");
    unPokemon$$.className= "pokemon";
    unPokemon$$.style.order = pokemon.order;
    unPokemon$$.innerHTML = `
            <img src="${pokemon.sprites.front_default}"/>
            <h2>${pokemon.name}</h2>
        `;
    divListaPokemons$$.appendChild(unPokemon$$);
}

const muestraPokemons = (datosParseadosRecorrer,busqueda) => {
    divListaPokemons$$.innerHTML= "";
    datosParseadosRecorrer.forEach(element => {
        descargaPokemon(element.url,busqueda);
        
    });

        divbotonesPokemons$$.innerHTML = "";
        if (!busqueda)    creaPaginacion();
}

const creaPaginacion = () =>{

    for(let i=0;i<totalPokemons/cantidadPokemonMostrar ;i++){
        const paginacion = document.createElement('a');
        paginacion.className="paginacion";
        paginacion.innerText=i;
        paginacion.href= "#";
        paginacion.onclick = () =>{
            descargaListaPokemonLimitada(i*cantidadPokemonMostrar);
        }
        divbotonesPokemons$$.appendChild(paginacion);
    }
}

const LlamadaBoton = () =>{
    if (buscador$$.value.trim()==="") return;
    encontrados=0;
    FiltraPorNombre();
}

const FiltraPorNombre = async () =>{
    const datosApi = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokemons}`)
    const datosParseados = await datosApi.json();
    muestraPokemons(datosParseados.results,true);
}

descargaListaPokemonLimitada(0);