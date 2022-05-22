const divListaPokemons$$ = document.querySelector(".listaPokemon");
const divbotonesPokemons$$ = document.querySelector(".botones-paginacion");
const buscador$$ = document.querySelector("#buscador");
const cantidadPokemonMostrar = 12;
let totalPokemons = 151;

const descargaListaPokemonLimitada = async (offset) => {

    const datosApi = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${cantidadPokemonMostrar}&offset=${offset}`);
    const datosParseados = await datosApi.json();
    muestraPokemons(datosParseados.results,false);
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

const muestraPokemons = (datosParseadosRecorrer,busqueda) => {
    divListaPokemons$$.innerHTML= "";
    datosParseadosRecorrer.forEach(element => {
        descargaPokemon(element.url,busqueda);
    });
        divbotonesPokemons$$.innerHTML = "";
        if (!busqueda && buscador$$.value==="")    creaPaginacion();
}

const creaPaginacion = () =>{

    let totalButton = totalPokemons%cantidadPokemonMostrar === 0 ? Math.floor(totalPokemons/cantidadPokemonMostrar) :  Math.floor(totalPokemons/cantidadPokemonMostrar)+1
    for(let i=0;i<totalButton  ;i++){
        const paginacion = document.createElement('a');
        paginacion.className="paginacion";
        paginacion.innerText=i+1;
        paginacion.href= "#";
        paginacion.onclick = () =>{
            descargaListaPokemonLimitada(i*cantidadPokemonMostrar);
        }
        divbotonesPokemons$$.appendChild(paginacion);
    }


}

const mostrarEstadisticas = (pokemon) =>{
    console.log('a',pokemon);
}

const LlamadaBoton = () =>{
    if (buscador$$.value.trim()==="") {
        descargaListaPokemonLimitada(0);
        return;
    }
        encontrados=0;
    FiltraPorNombre();
}

const FiltraPorNombre = async () =>{
    const datosApi = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${totalPokemons}`)
    const datosParseados = await datosApi.json();
    muestraPokemons(datosParseados.results,true);
}

descargaListaPokemonLimitada(0);