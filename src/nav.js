import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
//import ReactPlayer from "react-player";
//import {VideoSize as sizes} from "./components/style_tools/VideoSize";

export function NavBar(){
    return (
        <div className="navbar22">
            <img className="nav-icon22" src={process.env.PUBLIC_URL+'/younote.png'} alt='icon'/>
            <h1 className="nav-header22">YouNote</h1>
            <a className="home-btn22"  href="https://google.com">Home</a>
            <a className="sign-btn22"  href="https://google.com">Log out</a>
        </div>
    )
}

function Videos (link, title){
    return (

        `
        <div id="test-demo" class="pb-2 pt-2">
            <div class="card" style="height: 27rem; padding-bottom: 5px;">
            <h5 class="card-title align-content-center text-center pt-2">${title}</h5>
                <div class="card-body">
                    <iframe width="100%" height="315" src=https://www.youtube.com/embed/${link}
                    title="YouTube video player" allow="accelerometer; 
                    autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowfullscreen></iframe>
                    <button value=${link} class="btn-demo btn btn-light" about="${title}">${title}</button>
                </div>
            </div>
        </div>
        `

    )
}

export function SearchMain(){
    const [SearchValue, setSearchValue] = useState('');
    const updateSearchField = (e) => {
        setSearchValue(e.target.value);



    };
    function Get_yt(){
        let query = document.getElementById("query").value;
        let response;
        let sources = []
        //var token;
        var titles = []
        let call = async() =>{
            response = await fetch(`/YT?query=${query}`)
            response  = await response.json()
            const data  = response["results"]
            //token = data[0]
            for (let i = 1; i<data.length; i++){
                const id = data[i]["videoId"];
                const emb = `${id}`;
                titles.push(data[i]["title"])
                sources.push(emb)
            }
            document.getElementById("changeable").innerHTML = `${sources.map((source, index) => Videos(source, titles[index]))}`
            const btns = document.querySelectorAll(".btn-demo");

            btns.forEach(btn => {
                btn.addEventListener('click', event => {
                    save(event.target.value, event.target.innerHTML);
                });

            });
        }
        call()
        console.log(sources.length)
        //document.getElementById("changeable").innerHTML = Videos(sources[0])

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
        call();
        document.getElementById("changeable").innerHTML = "";
    }


    return (

        <div className="searchBox22">
            <input className="searchInput22" type="text" id="query" placeholder="Search" defaultValue={SearchValue} onChange={updateSearchField}  required/>
            <button type="submit" className="searchButton22" onClick={Get_yt}
            >
                <i>
                    Search
                </i>
            </button>
        </div>
    )
}





