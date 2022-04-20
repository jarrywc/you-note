// import { Outlet } from "react-router-dom";
// import {useState} from "react";
// import {VideoTest} from  "./components/VideoTest"
import './App.css';
import axios from 'axios';
//import {List} from "./components/List";
const getServerData = url => async () => {
  const response = await axios.get(url);
  return response.data;
}
const query =  window.location.search;
export function Results() {
const results = getServerData(`/YT?=${query}`);
console.log(results)


  return ("BEnny Lisangi"
  );
}