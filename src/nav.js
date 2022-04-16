import { useState } from "react";
export function NavBar(props){
    return (
        <div class="navbar">
        <img class="nav-icon"src={process.env.PUBLIC_URL+'/younote.png'} alt='icon'></img>
        <h1 class="nav-header">YouNote</h1>
        <a class="home-btn"  href="https://google.com">Home</a>
        <a class="sign-btn"  href="https://google.com">Log out</a>
    </div>
    )
}
export function SearchMain(props){
    return (
        <div class="searchBox">
            
        <input class="searchInput"type="text" id="query" placeholder="Search" required></input>
        <button type="submit" class="searchButton" onClick={Get_yt}
        >
            <i>
                Search
            </i>
            </button>
    </div>
    )
}
function Get_yt(){
    let query = document.getElementById("query").value;
    let response;
    let call = async() =>{
        response = await fetch(`/YT?query=${query}`)
        response  = await response.json()
        const data  = response["results"]
        console.log(data)
        const id = data[0]["videoId"]
        const emb = `https://www.youtube.com/embed/${id}`
        document.getElementById("changeable").innerHTML = Videos(emb);
    }
    call()

}
function Videos (link){
    return (
        <iframe width="560" height="315" src={link}
        title="YouTube video player" frameborder="0" allow="accelerometer; 
        autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>
    )
}
