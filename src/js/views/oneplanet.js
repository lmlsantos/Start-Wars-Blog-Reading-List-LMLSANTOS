import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import "../../styles/oneplanet.css";

export const OnePlanet = () => {

    const params= useParams();
    const navigate = useNavigate();

    const [planet, setPlanet] = useState();

    // calls the function getPlanet when the component is rendered
    useEffect(()=>{
        getPlanet()
    },[])

    //Gets the planets of Star Wars API based on a specific id:
    const getPlanet = ()=> {
        //this fetch function, returns a promise
        fetch("https://www.swapi.tech/api/planets/" + params.uid, {
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            }
        })
        // response converted to JSON format, returns also a promisse
        .then(resp => {
            
            return resp.json();
        })
        // handles the resolved promisse, from the previous step, where the data (JSON response) is logged to the console, and passed to the setPlanet()
        .then(data => {
            console.log(data);
            setPlanet(data.result.properties)
        })
        // handle any errors, that occur during the API request or JSON parsing, and logs the error to the console
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="main-container">    
        {planet ? ( // Check if planet is available before rendering
            
            <div className="content">
                <div className="title_container">
                    <h3 className="title">Planet Details: {planet.name}</h3>
                    <button type="button" className="me-2 btn btn btn-light" onClick={()=> navigate("/")}>Home</button>
                </div>
                <div className="image_description">
                    <img src={`https://starwars-visualguide.com/assets/img/planets/${params.uid}.jpg`} className ="card-image" alt="..."/>
                           
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
                <div className="planet_features">
                    <p className="feature_box">Diameter: {planet.diameter}</p>
                    <p className="feature_box">Rotation Period: {planet.rotation_period}</p>
                    <p className="feature_box">Orbital Period: {planet.orbital_period}</p>
                    <p className="feature_box">Gravity: {planet.gravity}</p>
                    <p className="feature_box">Climate: {planet.climate}</p>
                    <p className="feature_box">Terrain: {planet.terrain}</p>
                </div>
            </div>
        ) : (
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        )}
    </div>
)
};


