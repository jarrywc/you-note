import {VideoTest} from  "./components/VideoTest"
import './App.css';
import axios from 'axios';
import {List} from "./components/List";
import {
  MDBContainer,
  MDBRow} from "mdb-react-ui-kit"
// import { Button, Modal } from "react-bootstrap";

const getServerData = url => async () => {
  const response = await axios.get(url);
  return response.data;
}
export function MyVideos() {
  document.getElementById("changeable").innerHTML = "";
  return (
        <>
          <MDBContainer className='d-lg-flex'>
            <MDBRow xs={3} style={{padding:"5px", height:"100%"}}>
            <List getList={getServerData('/get_videos')}
                  resourceName='video'
                  itemComponent={VideoTest}/>
            </MDBRow>
          </MDBContainer>
    </>
  );
}