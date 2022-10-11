import Header from "./Components/MainSections/Header";
import Footer from "./Components/MainSections/Footer";
import Content from "./Components/MainSections/Content";
import Authentication from "./Components/Authentication";

// CSS imports
import './Styles/FooterStyles.css';
import './Styles/HeaderStyles.css';
import './Styles/ContentStyles.css';
import './Styles/AuthenticationStyles.css';



import { useState } from "react";

function App() {

  const [authenticated, setAuthenticated] = useState(false);


  return (
    <div className="App">
      {
      !authenticated ? <Authentication />
      :<>
      <Header />

      <Content />

      <Footer />
      </>
      }
      


    </div>
  );
}

export default App;
