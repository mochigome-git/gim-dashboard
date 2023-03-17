// src/Home.jsx
import { supabase } from "./lib/supabase";
import Menu from './Menu'
import { Page1 } from "./Page1"
import { Page2 } from "./Page2"
import { Page3 } from "./Page3"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import './lib/css/Home.css';

const Home = () => {

    // ログアウトする
    const signOut = () => {
      supabase.auth.signOut();
    };

  return (
    <div
      style={{ width: "60%", display: "inline-flex", flexDirection: "column",  height: "850px", alignItems: "center"}}
    >
      <div>
        <h1>Home</h1>
      </div>
      <div style={{ marginBottom: "16px" }}>
        <button className="buttonStyle" onClick={signOut}>ログアウト</button>
      </div>
      <div
        style={{
          width: "100%",
          display: "block",
          flexDirection: "column",
        }}
      >
      <Menu />
      <BrowserRouter>
      <div className="Home">
        <div className="wrap clearfix">
          <div className="box"><Link to="/page1" style={linkStyle}>Daily</Link>
          </div>
          <div className="box2"><Link to="/page2" style={linkStyle}>Monthly</Link>
          </div>
          <div className="box"><Link to="/graph" style={linkStyle}>Graph</Link>
          </div>
        </div>
        <Routes>
          {/* exactをつけると完全一致になります。Homeはexactをつけてあげます */}
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/graph" element={<Page3 />} />
        </Routes>
      </div>
    </BrowserRouter>
      </div>
    </div>
  );
};

export default Home;

const linkStyle = {
  margin: "1rem",
  textDecoration: "none",
  color: 'black',
};


