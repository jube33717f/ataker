const inititalState = {
    distance: ''
}
  
const distance = (state = inititalState, action) => {
    console.log('======', action)
    switch (action.type) {
      case 'CHANGE_DISTANCE':
        return {
          ...state,
          distance: action.distance.distance
        }
      default:
        return state;
    }
}
  
export default distance;