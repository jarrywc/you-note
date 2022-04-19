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
    let sources = []
    var token;
    var titles = []
    let call = async() =>{
        response = await fetch(`/YT?query=${query}`)
        response  = await response.json()
        const data  = response["results"]
        token = data[0]
        for (let i = 1; i<data.length; i++){
        const id = data[i]["videoId"];
        const emb = `${id}`;
        titles.push(data[i]["title"])
        sources.push(emb)
        }
        document.getElementById("changeable").innerHTML = `${sources.map((source, index) => Videos(source, titles[index]))}
        <
        `
    }
    call()
    console.log(sources.length)
    //document.getElementById("changeable").innerHTML = Videos(sources[0])

}
function Videos (link, title){
    return (
        `<div>
        <h4>${title}</h4>
        <iframe width="560" height="315" src=https://www.youtube.com/embed/${link}
        title="YouTube video player" frameborder="0" allow="accelerometer; 
        autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>
        <button onclick = ${save(link, title)}>Save this video</button>
        </div>`
    )
}
function save(link, title){
    const call = async()=>{
        var response = await fetch(`/save?link=https://www.youtube.com/watch?v=${link}&title=${title}`);
        response = await response.json();
        response = response["success"]
        console.log(response)
        if (response === 200){
            alert(`"${title}" has been successfully saved.`)
        }
    }
    call()
}
