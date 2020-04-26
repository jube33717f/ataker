const inititalState = {
    locations: ''
}
  
const locations = (state = inititalState, action) => {
    console.log('======', action)
    switch (action.type) {
      case 'CHANGE_LOCATION':
        return {
          ...state,
          locations: action.locations.locations
        }
      default:
        return state;
    }
}
  
export default locations;