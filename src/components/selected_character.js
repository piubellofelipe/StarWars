import React, {Component} from 'react'
import axios from 'axios'
//component responsible for showing the selectedCharacter basic info and display any additional info when required
class selectedCharacter extends Component{
    constructor (props) {
        super(props);
        this.state = {loading: false, data:null, movieListName : "" , movieList : "", selected:null};
        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    componentWillReceiveProps(nextProps){
            console.log(nextProps.selected);
            if (nextProps.selected == null || nextProps.selected == this.state.selected)    return;
            this.fetchData(nextProps);       
    }

    updateData(dataArray){
        console.log(dataArray);
        var moviesDiv = dataArray.map(
                movie => {
                    return( <div onClick = {() => this.props.onAddInfoSelect(movie)}> {movie.data.title}</div>);
                }
            );

        this.setState({data :
            <div   className = "mainInfo">
                <div className = "mainInfoInner">
                    <div>NOME: {this.props.selected.name}</div>
                    <div>GÊNERO: {this.props.selected.gender}</div>
                    <div>COR DOS OLHOS: {this.props.selected.eye_color}</div>
                    <div>COR DOS CABELOS: {this.props.selected.hair_color}</div>
                    <div>ALTURA: {this.props.selected.height}</div>
                    <div>FILMES:
                    {moviesDiv}
                    </div>
                </div>
            </div>
        });
        this.setState({selected : this.props.selected});
    }

    fetchData(nextProps){
        this.setState({loading:true});
        const movies= nextProps.selected.films;
        var promises = [];
        movies.forEach( (movie) =>{
            promises.push(movie);
        });
        let promiseArray = promises.map(url => axios.get(url));
        axios.all(promiseArray).then(results => {
            this.updateData(results);
            this.setState({loading:false});
        });
    }


    render(){
        if (this.state.loading) return <div>Loading...</div>
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
        return <div> {this.state.data} </div>
    }
}


export default selectedCharacter;