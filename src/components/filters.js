import React, {Component} from 'react'
//Class responsible for managing the filters input
class Filter extends Component{
    constructor(props){
        super(props);
        this.state = {gender: null,
                       minMass:null, maxMass: null,
                       minHeight: null, maxHeight: null
        };
    }
    render(){
        return(
        <div className="filters">
            <input 
            value = {this.state.gender}
            defaultValue = {"genero"}
            onChange={event => this.onGenderInputChange(event.target.value)} />
            
            <input 
            value = {this.state.height}
            defaultValue = {"altura minima"}
            onChange={event => this.onMinHeightInputChange(event.target.value)} />
            <input 
            value = {this.state.height}
            defaultValue = {"altura maxima"}
            onChange={event => this.onMaxHeightInputChange(event.target.value)} />
            
            <input 
            value = {this.state.mass}
            defaultValue = {"massa minima"}
            onChange={event => this.onMinMassInputChange(event.target.value)} />

            <input 
            value = {this.state.mass}
            defaultValue = {"massa maxima"}
            onChange={event => this.onMaxMassInputChange(event.target.value)} />



            <button className = "applyFiltersButton" onClick = {this.props.onApplyFilters}> APLICAR FILTROS</button>
        </div>
        );
    }

    onFilterInputChange(){
        this.props.onFilterChange(this.state);
    }

    onGenderInputChange(gender) {
        this.setState({gender}, this.onFilterInputChange);
    }
    onMinHeightInputChange(minHeight) {
        this.setState({minHeight}, this.onFilterInputChange);
    }
    onMaxHeightInputChange(maxHeight) {
        this.setState({maxHeight}, this.onFilterInputChange);
    }
    onMinMassInputChange(minMass) {
        this.setState({minMass}, this.onFilterInputChange);
    }
    onMaxMassInputChange(maxMass) {
        this.setState({maxMass}, this.onFilterInputChange);
    }
}

export default Filter;