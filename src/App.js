import './scss/App.scss';
import HomePage from './components/HomePage';
import RfpInboxPage from './components/RfpInboxPage';
import Banner from './components/Banner';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PreProcessPage from './components/PreProcessPage';
import ResponsesPage from './components/ResponsesPage';

function App() {
  return (
    <div className="App">
      <Banner />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/rfp_inbox_page' element={<RfpInboxPage />} />
          <Route path='/pre_process_page/:rfp_name/:contractor_name' element={<PreProcessPage />} />
          <Route path='/responses_page/:rfp_name' element={<ResponsesPage />} />
        </Routes>    
      </BrowserRouter>      
    </div>
  );
}

export default App;
