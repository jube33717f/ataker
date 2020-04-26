const inititalState = {
    price: []
}
  
const price = (state = inititalState, action) => {
    console.log('======', action)
    switch (action.type) {
      case 'CHANGE_PRICE':
        return {
          ...state,
          price: action.price.price
        }
      default:
        return state;
    }
}
  
export default price;