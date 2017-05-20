import React from 'react'
//component responsible for showing a list of character names, allowing user interaction when a name is clicked
const characterList = (props) =>{
    const characterItems = props.characters.map( (character) => {
        return(
            <l1 onClick = { () => props.onCharacterSelect(character)}>
                <div className = "character-list-item">
                    <h4>{character.name}</h4>
                </div>
            </l1>
        );
    });
    return (
        <div className = "character-list">
        <ul>
        {characterItems}
        </ul>
        </div>
    );

};
export default characterList;