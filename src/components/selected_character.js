import React, {Component} from 'react'
//component responsible for showing the selectedCharacter basic info and display any additional info when required
const selectedCharacter = (props) => {
    const selected = props.selectedCharacter;
    if (!selected) return <div   className = "mainInfo"><div className="mainInfoInner">Bem vindo ao Tudo sobre StarWars! Selecione um personagem para ver suas principais informações!</div></div>;


    //gather movies info
    const movies= selected.films;
    var moviesList = movies.map( movie => {
        var response = "";
        var req = new XMLHttpRequest();
        req.open('GET', movie, false);
        req.addEventListener('load', function(){
            if (req.status >= 200 && req.status < 400){
                response = JSON.parse(req.responseText);
           } else{
               console.log("Não conseguiu conectar =/");
           }
        });
        req.send(null);
        return response;
    });
    //if it is requires to show additional info, in this case, about a movie, return this.
    if (props.addInfo != null){
        return (
            <div   className = "mainInfo">
                    <div onClick = { () => props.onAddInfoSelect(null)}> back </div>
                    <div>TITULO: {props.addInfo.title}</div>
                    <div>DATA DE LANÇAMENTO: {props.addInfo.release_date}</div>
                    <div>EPISODIO: {props.addInfo.episode_id}</div>
            </div>
        );

    }
    //gather movies titles and make the div component
    var moviesListNames = moviesList.map(
        movie => {
            return( <div onClick = {() => props.onAddInfoSelect(movie)}> {movie.title}</div>);
        }
     );
     //returns the most important info about the character
    return(
        <div   className = "mainInfo">
            <div>
                <div>NOME: {selected.name}</div>
                <div>GÊNERO: {selected.gender}</div>
                <div>COR DOS OLHOS: {selected.eye_color}</div>
                <div>COR DOS CABELOS: {selected.hair_color}</div>
                <div>ALTURA: {selected.height}</div>
                <div>FILMES:
                {moviesListNames}
                </div>
            </div>
        </div>
        );
    };


export default selectedCharacter;