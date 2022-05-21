const divListaPokemons$$ = document.querySelector(".listaPokemon");
const divbotonesPokemons$$ = document.querySelector(".botones-paginacion");
const cantidadPokemon = 12;

const descargaListaPokemon = async (offset) => {

    const datosApi = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${cantidadPokemon}&offset=${offset}`);
    const datosParseados = await datosApi.json();
    
    muestraPokemons(datosParseados.results);

}

const descargaPokemon =  (url) => {

    fetch(url)
    .then(response => response.json())
    .then(allPokemons => {
        pintarPokemon(allPokemons)})

}

const pintarPokemon = (pokemon) => {
    const unPokemon$$ = document.createElement("div");
    unPokemon$$.className= "pokemon";
    unPokemon$$.style.order = pokemon.order;
    unPokemon$$.innerHTML = `
            <img src="${pokemon.sprites.front_default}"/>
            <h2>${pokemon.name}</h2>
        `;
    //console.log(unPokemon$$);
     divListaPokemons$$.appendChild(unPokemon$$);
}

const muestraPokemons = (datosParseadosRecorrer) => {
    divListaPokemons$$.innerHTML= "";

    datosParseadosRecorrer.forEach(element => {
        descargaPokemon(element.url);
    });

    

}

descargaListaPokemon(0);

for(let i=0;i<150/cantidadPokemon ;i++){
    const paginacion = document.createElement('a');
    paginacion.className="paginacion";
    paginacion.innerText=i;
    //paginacion.href="?page="+i;
    paginacion.href= "#";
    paginacion.onclick = () =>{
        // let pagina = $_GET("page");;
        // console.log(pagina);
        descargaListaPokemon(i*cantidadPokemon);
    }
    divbotonesPokemons$$.appendChild(paginacion);
}