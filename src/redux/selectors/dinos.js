/*
Selectors pull data from the redux store so individual components
don't need to know the store structure
*/

// EXAMPLE: Selector
export const getDinosSelector = (state) => state.dinos.data;

export const getDinoSelector = (state, id = '') => {
  const myDino = state.dinos.data.find((dino) => dino.id === id);

  if (myDino === undefined) {
    return myDino;
  }
  return {
    id: myDino.id,
    text: myDino.text,
    selected: myDino.selected,
  };
};

export const getSelectedDinosSelector = (state) =>
  state.dinos.data.filter((dino) => dino.selected === true);

export const isDinosLoadingSelector = (state) => state.dinos.loading;

export const getDinoErrorSelector = (state) => state.dinos.error;
