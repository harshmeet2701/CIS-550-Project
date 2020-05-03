const likeReducer = (state = [], action) => {
  switch(action.type){
    case 'LIKE':
      return [...state, action.payload]
    default:
      return state
  }
}

export default likeReducer;