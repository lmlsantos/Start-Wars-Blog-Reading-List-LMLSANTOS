import React, {useState, useEffect, useContext} from "react";
import { Context } from "../store/appContext";

import { useNavigate } from "react-router-dom";

const Starship = (props) => {

// Verifies if starship contains the expected data
console.log("starship", props.starship);

    const navigate = useNavigate();
    const {store, actions} = useContext(Context);

    const [starship, setStarship] = useState();
    // calls the function getPlanet when the component is rendered
    useEffect(()=>{
        getStarship()
    },[])

    //Gets the starships of Star Wars API based on a specific id:
    const getStarship = ()=> {
        //this fetch function, returns a promise
        fetch("https://www.swapi.tech/api/starships/" + props.starship.uid, {
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            }
        })
        // response converted to JSON format, returns also a promisse
        .then(resp => {
            console.log(resp.ok);
            console.log(resp.status);
            console.log(resp);
            return resp.json();
        })
        // handles the resolved promisse, from the previous step, where the data (JSON response) is logged to the console, and passed to the setPeople()
        .then(data => {
            console.log(data);
            setStarship(data.result.properties)
        })
        // handle any errors, that occur during the API request or JSON parsing, and logs the error to the console
        .catch(error => {
            console.log(error);
        });
    }

    return (
        <div className="card" style={{width: "20rem"}}>
            {starship && <img src={""} className
            ="card-img-top" alt="..."/>}
            <div className="card-body">
                <h5 className="card-title text-white">{props.starship.name}</h5>
            </div>
            {starship ? (
                <ul className="list-group list-group-flush rounded">
                    <li className="list-group-item">Name: {starship.name}</li>
                    <li className="list-group-item">Model: {starship.model}</li>
                    <li className="list-group-item">Passengers: {starship.passengers}</li>
                    <li className="list-group-item">Cargo: {starship.cargo_capacity}</li>
                </ul>
            ) : (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            )}
            
            <div className="d-flex justify-content-between mt-2 mb-2">
                <button type="button" className="ms-2 btn btn btn-light" onClick={()=> navigate("/onestarship/"+props.starship.uid)}>Learn More!</button>
                <button type="button" className="me-2 btn btn-outline-danger" onClick={()=> actions.addFavorite(props.starship.name)}><i className="far fa-heart"></i></button>
            </div>
        </div>
    )



};

export default Starship;