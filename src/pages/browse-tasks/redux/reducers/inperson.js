const inititalState = {
    inperson: 'in person'
}
//or 'remotely'
const inperson = (state = inititalState, action) => {
    console.log('======', action)
    switch (action.type) {
      case 'CHANGE_INPERSON':
        return {
          ...state,
          inperson: action.inperson.inperson
        }
      default:
        return state;
    }
}
  
export default inperson;