import React, {Component} from 'react'
import axios from 'axios'
//component responsible for showing the selectedCharacter basic info and display any additional info when required
class selectedCharacter extends Component{
    constructor (props) {
        super(props);
        this.state = {loading: true, data:null};
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }


    componentDidUpdate(){
        if (!this.props.selected) return;
        if (this.props.selected.moviesList == null){
            if (this.state.loading){
                this.setState({loading: false});
                return <div>loading...</div>
            }
            const movies= this.props.selected.films;

            var moviesList = movies.map( movie => {
                var url = movie.replace("http", "https");
                axios.get(url).then(function(response){
                    this.setState({loading: false, data:response});
                    console.log(response.data);
                    return response; 
                });
            });
            var moviesListNames = moviesList.map(
                movie => {
                    return( <div onClick = {() => this.props.onAddInfoSelect(movie)}> {movie.title}</div>);
                }
            );
            this.props.selected.moviesList = moviesListNames;
    }

    return (
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
    var content;
    if (!this.props.selected && !this.props.addInfo) return  <div   className = "mainInfo">
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
    console.log(this.state.data);
    return this.state.data;
    };
    
}


export default selectedCharacter;