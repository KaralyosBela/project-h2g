import Container from "../components/Container";
//import classes from './Custom.module.css';

function MainPage() {
  return (
    <Container>
      <div>
        <h1>This is the main page.</h1>
        <p>This is a react demo project that calls an api and displays the weather.</p>
      </div>
    </Container>
  );
}

export default MainPage;

// //TODO: new page for weekly weather, add weekly weather data from different api call, add day names to the cards

// import React, { Component } from "react";
// import Container from "../components/Container";

// class MainPage extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       text1: "hehe",
//       text2: "heheheh"
//     };
//   }

//   render() {

//     return (
//         <div>
//           <Container>
//           <h1>This is the main page. {this.state.text1}</h1>
//           <p>This is a react demo project that calls an api and displays the weather. {this.state.text2}</p>
//           </Container>
//         </div>
//       );  }
// }

// export default MainPage;
