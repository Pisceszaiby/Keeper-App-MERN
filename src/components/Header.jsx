import React from "react";
// import {theme} from "./Background";
import HighlightIcon from "@material-ui/icons/Highlight";

function Header(props) {
  return (
    <header style={{backgroundColor: props.bgcolor}}>
      <h1>
        <HighlightIcon />
         Note It </h1>
    </header>
  );
}
export default Header;
