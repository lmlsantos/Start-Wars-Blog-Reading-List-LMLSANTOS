import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import "../../styles/onevehicle.css";

export const OneVehicle = () => {

    const params= useParams();
    const navigate= useNavigate();

    const [vehicle, setVehicle] = useState();

    // calls the function getVehicle when the component is rendered
    useEffect(()=>{
        getVehicle()
    },[])

     //Gets the vehicles of Star Wars API based on a specific id:
     const getVehicle = ()=> {
        //this fetch function, returns a promise
        fetch("https://www.swapi.tech/api/vehicles/" + params.uid, {
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
            setVehicle(data.result.properties)
        })
        // handle any errors, that occur during the API request or JSON parsing, and logs the error to the console
        .catch(error => {
            console.log(error);
        });
    }


    return (
        <div className="main-container">    
        {vehicle ? ( // Check if vehicle is available before rendering
            
            <div className="content">
                <div className="title_container">
                    <h3 className="title">Vehicle Details: {vehicle.name}</h3>
                    <button type="button" className="me-2 btn btn btn-light" onClick={()=> navigate("/")}>Home</button>
                </div>
                <div className="image_description">
                    <img src={`https://starwars-visualguide.com/assets/img/vehicles/${params.uid}.jpg`} className ="card-image" alt="..."/>
                           
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
                <div className="vehicle_features">
                    <p className="feature_box">Name: {vehicle.name}</p>
                    <p className="feature_box">Model: {vehicle.model}</p>
                    <p className="feature_box">Crew: {vehicle.crew}</p>
                    <p className="feature_box">Manufacturer: {vehicle.manufacturer}</p>
                    <p className="feature_box">Class: {vehicle.vehicle_class}</p>
                    <p className="feature_box">Length: {vehicle.length}</p>
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
