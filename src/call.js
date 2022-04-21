 function Call(){
    const query = "Congo";
    const endpoint = `YT?q=${query}`
    const response = fetch(endpoint);
    const data = response.json()["results"];

    console.log(data)
    return <h1>This is just a div</h1>

}
export default Call;