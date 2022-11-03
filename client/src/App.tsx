import Header from "./Components/MainSections/Header";
import Footer from "./Components/MainSections/Footer";
import Content from "src/Components/MainSections/Content";
import Authentication from "./Components/Authentication/Authentication";
import LoadingScreen from "./Components/LoadingScreen";

// CSS imports
import './Styles/FooterStyles.css';
import './Styles/HeaderStyles.css';
import './Styles/ContentStyles.css';
import './Styles/AuthenticationStyles.css';
import './Styles/LoadingScreenStyles.css';
import './Styles/MainStyles.css';
import './Styles/LessonOverviewStyles.css';
import './Styles/MistakesTabStyles.css';

import { useEffect, useState } from "react";
import React from "react";
import UIDContext from 'src/UIDContext';

function App() {
  
  const [UID, setUID] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [loadingScreen, triggerLoadingScreen] = useState(false);

  useEffect(()=>{
    if(UID!=''){
      console.log(UID);
      // triggerLoadingScreen(true);
      // setTimeout(() => {
        setAuthenticated(true);
        // triggerLoadingScreen(false);
      // }, 2000);
    }
  },[UID])

  return (
        <UIDContext.Provider value={{UID,setUID}} >
        <div className="App">
            {/* {loadingScreen ? <LoadingScreen /> : null} */}
            {
            !authenticated ? <Authentication props={{setAuthenticated}}/>
            :<>
            <Header />

            <Content />

            <Footer />
            </>
            }
        </div>
        </UIDContext.Provider>

  );
}
export default App;
