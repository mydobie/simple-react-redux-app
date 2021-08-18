import React from 'react';

// import { Container, Row, Col, Button } from 'react-bootstrap';

// import { useDispatch, useSelector } from 'react-redux';

// import DinoListItem from '../components/DinoListItem';
// import DinoList from '../components/DinoList';

// import {
//   getDinosSelector,
//   isDinosLoadingSelector,
//   getDinoErrorSelector,
// } from '../redux/selectors/dinos';

// import Errors from '../components/Alert';

// class SampleDinoPage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { randomDino: null };
//     this.dinoList = this.dinoList.bind(this);
//     this.handleSelectDinoToggle = this.handleSelectDinoToggle.bind(this);
//     this.handleGetRandomDino = this.handleGetRandomDino.bind(this);
//   }

//   componentDidMount() {
//     const { startLoadingDinos, dinos } = this.props;
//     // Only load dinos if the array in the store is empty
//     if (dinos.length === 0) {
//       startLoadingDinos();
//     }
//   }

//   handleSelectDinoToggle(dinoId, checked) {
//     const { onDinoSelect } = this.props;
//     return onDinoSelect(dinoId, checked);
//   }

//   async handleGetRandomDino() {
//     const { getRandomDino } = this.props;

//     // EXAMPLE: Using a value returned from a thunk
//     const randomDino = await getRandomDino();
//     this.setState({ randomDino });
//   }

//   dinoList() {
//     const { dinos } = this.props;
//     return (
//       <div>
//         <h2>Please select dinosaurs:(stored in Redux)</h2>

//         <ul>
//           {dinos.map((dino) => (
//             <DinoListItem
//               key={dino.id}
//               dinoName={dino.text}
//               dinoId={dino.id}
//               checked={dino.selected}
//               changeCheckBox={this.handleSelectDinoToggle}
//             />
//           ))}
//         </ul>
//       </div>
//     );
//   }

//   render() {
//     const { loading, error } = this.props;
//     const { randomDino } = this.state;
//     return (
//       // EXAMPLE: Calling a loading a screen

//       <Container>
//         <Row>
//           <Col>
//             <h1>Dino Sample Page</h1>
//           </Col>
//         </Row>
//         <Row>
//           <Col>
//             {error !== null && <Errors>{error}</Errors>}

//             {loading === false && error === null ? (
//               <div id='dinoLists'>
//                 {this.dinoList()}
//                 <DinoList />
//               </div>
//             ) : null}
//           </Col>
//         </Row>
//         <Row>
//           <Col>
//             <hr />
//             <h2>Get a random dino (stored in component state)</h2>
//             <p>
//               {randomDino !== null ? (
//                 `Your Dino is a ${randomDino}`
//               ) : (
//                 <Button
//                   id='getRandomDinoButton'
//                   onClick={this.handleGetRandomDino}
//                 >
//                   Get your random dino
//                 </Button>
//               )}
//             </p>
//           </Col>
//         </Row>
//       </Container>
//     );
//   }
// }

// // SampleDinoPage.defaultProps = {
// //   dinos: [],
// //   loading: false,
// //   onDinoSelect: () => {},
// //   error: null,
// // };

// // // NOTE: The values from selectors will be part of the pros:
// // const mapStateToProps = (state) => ({
// //   // EXAMPLE: Calling a selector to get values from redux state
// //   dinos: getDinosSelector(state),
// //   loading: isDinosLoadingSelector(state),
// //   error: getDinoErrorSelector(state),
// // });

// // // NOTE: Functions passed from Thunks and Actions passed to the props
// // const mapDispatchToProps = (dispatch) => ({
// //   // EXAMPLE: Calling a thunk (aka aside action with a ajax call)
// //   startLoadingDinos: () => dispatch(loadDinosThunk()),
// //   getRandomDino: async () => dispatch(loadDinoRandomThunk()),
// //   // EXAMPLE: Calling an action
// //   onDinoSelect: (dinoId, selected) =>
// //     dispatch(setDinoSelectedAction(dinoId, selected)),
// // });

// export default SampleDinoPage;

export default <div>Hello</div>;
