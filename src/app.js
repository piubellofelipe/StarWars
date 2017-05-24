import React, {Component} from 'react';
import CharacterList from './components/character_list';
import SelectedCharacter from './components/selected_character'
import PageSelector from './components/page_selector'
import SearchBar from './components/search_bar'
import Filter from './components/filters'
import axios from 'axios'
import _ from 'lodash'


const url_SWAPI = 'https://swapi.co/api/people/'
const req = new XMLHttpRequest();


class App extends Component{
    constructor(props){
        super(props);

        var response = (this.loadCharacters(1));
        this.state = {
             tick:0,
             page : 1,
             characters: response,
             loading : false,
             selectedCharacter : null,
             list: null,
             addInfo : null,
             maxPg : 9,
             filter : {gender: null,
                       minMass:null, maxMass: null,
                       minHeight: null, maxHeight: null},
            isloaded : false,
            alreadyloaded : false
        };
    }

//gather the characters from SWAPI
    loadCharacters(page, async){
        var response = "";
        req.open('GET', url_SWAPI+'?page='+page, async);
        req.addEventListener('load', function(){
            if (req.status >= 200 && req.status < 400){
                response = JSON.parse(req.responseText);
           } else{
               console.log("Não conseguiu conectar =/");
           }
        });
        req.send(null);   
        return response.results;  
    }

//function responsible for update the character list based on the filters
    reload(){
        this.setState({page: 1});

        if ( !this.state.filter.gender && !this.state.filter.minHeight && !this.state.filter.maxHeight &&
        !this.state.filter.maxMass && !this.state.filter.minMass){
            this.setState({characters : this.state.list});
            this.setState({maxPg : 10});
            return;
        }

        var newChars = "";
        newChars = this.state.characters.filter( character => {
            if ((!this.state.filter.gender || character.gender === this.state.filter.gender) &&
            (!this.state.filter.minMass || parseFloat(character.mass) >= parseFloat(this.state.filter.minMass)) &&
            (!this.state.filter.maxMass || parseFloat(character.mass) <= parseFloat(this.state.filter.maxMass)) &&
            (!this.state.filter.minHeight || parseFloat(character.height) >= parseFloat(this.state.filter.minHeight)) &&
            (!this.state.filter.maxHeight || parseFloat(character.height) <= parseFloat(this.state.filter.maxHeight))
            ){
                return character;
            }
        });
        this.setState({characters : newChars});
        var maxPg = Math.ceil(newChars.length / 10);
        this.setState({maxPg})
    }

//gather the characters on the SWAPI based on the name search
characterSearch(term){
        this.setState({page : 1});
        if (term == ""){
            this.setState({characters : this.state.list});
            this.setState({maxPg : 10});
        }
        var newChars = this.state.list.filter(character => {
            if (character.name.toUpperCase().match(term.toUpperCase())){
                return character;
            }
        });
        this.setState({characters : newChars});
        var maxPg = Math.ceil(newChars.length / 10);
        this.setState({maxPg})
    }

componentDidMount(){
    var promises = [];
    for (var i=2; i<10; i++)
        promises[i-2] =  url_SWAPI+'?page='+i;
    var newListArray;
    let promiseArray = promises.map(url => axios.get(url));
    axios.all(promiseArray).then(results => {
        newListArray = results;
        for (var i=0; i<8; i++){
            this.setState({characters : this.state.characters.concat(newListArray[i].data.results)});
        }  
        this.setState({list : this.state.characters});

    });
    

}


loadPage(){
    var auxVars = this.state.characters.slice((this.state.page-1)*10, (this.state.page)*10);
    return auxVars;
}



//display everything
    render() {

        //used lodash here so our search is smoother (without this the search is instantaneous, but the request time makes it slower than without loadash)
        const characterSearch = _.debounce((term) => this.characterSearch(term), 100);
        const loading = function () { if (this.state.loading) return <div>Loading...</div>}; 
        return(
            <div className = "app">
                <SearchBar onSearch={ term => characterSearch(term)}/>
                <Filter 
                    onFilterChange={ filter => this.setState({filter})}
                    onApplyFilters = { () => this.reload()}
                />
                <div>{loading}</div>
                <SelectedCharacter   
                    onAddInfoSelect = { addInfo => {this.setState({addInfo}); }}
                    selected = {this.state.selectedCharacter}
                    addInfo = {this.state.addInfo}
                    loadingMessage = { bool =>{
                            this.setState({loading : bool});
                        }}
                />
                <CharacterList
                        onCharacterSelect = {selectedCharacter => {
                                                this.setState({selectedCharacter});
                                                this.setState({addInfo : null});
                                                                  }
                                            }

                        characters={this.loadPage()}/>
                <PageSelector
                    onPageSelect = {page => {
                                        this.setState({page});
                                        }
                                   }
                    page = {this.state.page}
                    maxPg = {this.state.maxPg}
                />    
                <div>{this.state.page} / {this.state.maxPg}</div>
            </div>
        );
    }
}
export default App;