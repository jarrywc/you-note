import { useState } from "react";
import { useNavigate } from "react-router-dom";
export function NavBar(props){
    return (
        <div className="navbar">
            <img className="nav-icon"src={process.env.PUBLIC_URL+'/younote.png'} alt='icon'/>
            <h1 className="nav-header">YouNote</h1>
            <a className="home-btn"  href="https://google.com">Home</a>
            <a className="sign-btn"  href="https://google.com">Log out</a>
        </div>
    )
}

function Videos (link, title){
    return (
        `
        <div id="test-demo">
        <h4>${title}</h4>
        <iframe width="560" height="315" src=https://www.youtube.com/embed/${link}
        title="YouTube video player" frameborder="0" allow="accelerometer; 
        autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen></iframe>
        <button value=${link} class="btn-demo" >${title}</button>
        </div>
        `
    )
}

export function SearchMain(props){
    const navigate = useNavigate();
    const [SearchValue, setSearchValue] = useState('');
    const updateSearchField = (e) => {
        setSearchValue(e.target.value);
    };
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
            const btns = document.querySelectorAll(".btn-demo")

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
        navigate("/videos/list/");
    }


    return (
        <div className="searchBox">
            <input className="searchInput"type="text" id="query" placeholder="Search" defaultValue={SearchValue} onChange={updateSearchField}  required/>
            <button type="submit" className="searchButton" onClick={Get_yt}
            >
                <i>
                    Search
                </i>
            </button>
        </div>
    )
}





