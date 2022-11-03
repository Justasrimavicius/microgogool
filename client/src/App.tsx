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

  // mainPath, specificSection, mistakesTab or shopTab
  const [centerPathContent, loadCenterPathContent] = useState<string>('');

  useEffect(()=>{
    if(UID!=''){
      console.log(UID);
      setAuthenticated(true);
    }
  },[UID])

  return (
        <UIDContext.Provider value={{UID,setUID}} >
        <div className="App">
            {
            !authenticated ? <Authentication props={{setAuthenticated}}/>
            :<>
            <Header centerPathContentProp={{centerPathContent, loadCenterPathContent}}/>

            <Content centerPathContentProp={{centerPathContent, loadCenterPathContent}}/>

            <Footer />
            </>
            }
        </div>
        </UIDContext.Provider>

  );
}
export default App;
