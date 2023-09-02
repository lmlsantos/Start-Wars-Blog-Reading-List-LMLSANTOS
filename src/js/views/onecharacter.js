import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import "../../styles/onecharacter.css";

export const OneCharacter = () => {

    const params= useParams();
    const navigate = useNavigate();

    const [character, setCharacter] = useState();
    
    // calls the function getCharacter when the component is rendered
    useEffect(()=>{
        getPeople()
    },[])

    //Gets the characters of Star Wars API based on a specific id:
    const getPeople = ()=> {
        //this fetch function, returns a promise
        fetch("https://www.swapi.tech/api/people/" + params.uid, {
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            }
        })
        // response converted to JSON format, returns also a promisse
        .then(resp => {
            
            return resp.json();
        })
        // handles the resolved promisse, from the previous step, where the data (JSON response) is logged to the console, and passed to the setPeople()
        .then(data => {
            console.log(data);
            setCharacter(data.result.properties)
        })
        // handle any errors, that occur during the API request or JSON parsing, and logs the error to the console
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="main-container">    
            {character ? ( // Check if character is available before rendering
                
                <div className="content">
                    <div className="title_container">
                        <h3 className="title">Character Details: {character.name}</h3>
                        <button type="button" className="me-2 btn btn btn-light" onClick={()=> navigate("/")}>Home</button>
                    </div>
                    <div className="image_description">
                        <img src={`https://starwars-visualguide.com/assets/img/characters/${params.uid}.jpg`} className ="card-image" alt="..."/>
                               
                        <div className="text_description">
                            <p className="text_box"> 
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                Nullam at libero in libero porttitor fringilla ut eu justo. 
                                Pellentesque consequat auctor dolor, nec vulputate ligula mattis ac. 
                                Curabitur auctor velit nec lacus fermentum, id vehicula dui tincidunt. 
                                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; 
                                Duis nec nunc eget risus cursus feugiat. Fusce euismod, sapien vel euismod ultrices, 
                                felis urna ullamcorper dui, in ultricies nisl sem a sapien. Maecenas fermentum augue vel purus facilisis, 
                                non auctor erat scelerisque. Nulla facilisi. Aenean euismod, 
                                arcu non auctor finibus, nunc dolor posuere tortor, 
                                sit amet placerat enim mi in lorem. Sed hendrerit dignissim suscipit. Donec ut commodo velit.  
                            </p> 
                        </div>
                    </div>
                    <div className="character_features">
                        <p className="feature_box">Gender: {character.gender}</p>
                        <p className="feature_box">Height: {character.height}</p>
                        <p className="feature_box">Mass: {character.mass}</p>
                        <p className="feature_box">Hair Color: {character.hair_color}</p>
                        <p className="feature_box">Eye Color: {character.eye_color}</p>
                        <p className="feature_box">Birth of Year: {character.birth_year}</p>
                    </div>


                    
                 
                    
                    {/* Display other properties as needed */}
                </div>
            ) : (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
        </div>
    )
};

