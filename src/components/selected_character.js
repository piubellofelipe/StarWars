import React, {Component} from 'react'
import axios from 'axios'
//component responsible for showing the selectedCharacter basic info and display any additional info when required
class selectedCharacter extends Component{
    constructor (props) {
        super(props);
        this.state = {loading: false, data:null, tick: 0};
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }
    componentDidUpdate(){
        if(this.state.loading){
            this.fetchData();
        }
    }

    componentWillReceiveProps(){
        this.setState({loading:true})
        this.forceUpdate();
    }

    fetchData(){
        if (!this.props.selected) return; //checks if needs to fetch data
        if (this.props.selected.moviesList == null){
        console.log("whill fetch");
        const movies= this.props.selected.films;
        this.setState({loading:false})
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
            var moviesListNames = moviesList.map(
                movie => {
                    return( <div onClick = {() => this.props.onAddInfoSelect(movie)}> {movie.title}</div>);
                }
            );
            this.props.selected.moviesList = moviesListNames;
    }

    this.props.selected.data = (
        <div   className = "mainInfo">
            <div className = "mainInfoInner">
                <div>NOME: {this.props.selected.name}</div>
                <div>GÊNERO: {this.props.selected.gender}</div>
                <div>COR DOS OLHOS: {this.props.selected.eye_color}</div>
                <div>COR DOS CABELOS: {this.props.selected.hair_color}</div>
                <div>ALTURA: {this.props.selected.height}</div>
                <div>FILMES:
                {this.props.selected.moviesList}
                </div>
            </div>
        </div>
        );
    }


    render(){
        console.log("rendering...", (this.props.selected && this.state.loading) );
    if (this.props.selected && !this.state.loading)  console.log("foi?");
    if (this.props.selected == null && this.props.addInfo == null) return  <div   className = "mainInfo">
        <div className="mainInfoInner">Bem vindo ao Tudo sobre StarWars! Selecione um personagem para ver suas principais informações!</div></div>;
    if (this.props.addInfo != null){
        return  (
            <div   className = "mainInfo">
                <div className = "mainInfoInner">
                    <div onClick = { () => this.props.onAddInfoSelect(null)}> back </div>
                    <div>TITULO: {this.props.addInfo.title}</div>
                    <div>DATA DE LANÇAMENTO: {this.props.addInfo.release_date}</div>
                    <div>EPISODIO: {this.props.addInfo.episode_id}</div>
                </div>
            </div>
        );
    }
   return <div> {this.props.selected.data} </div>
    };
    
}


export default selectedCharacter;