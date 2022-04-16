import './App.css';
import { NavBar,SearchMain} from './nav';
import {Menu} from './menu'
import { Route, Routes} from 'react-router-dom';
import {MyVideos} from './MyVideos'
import {Results} from './results'
function App() {

  //const user_id = "some_user_id";


  return (
    <div>
      <Menu></Menu>
      <div id='changeable'>
      <SearchMain/>
      </div>
      <Routes>
          <Route path='/videos' element={<MyVideos/>}/>
          <Route path='/results' element ={<Results/>}/>

      </Routes>
    </div>
  );
}

export default App;
