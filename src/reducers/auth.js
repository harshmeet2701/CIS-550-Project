const state = sessionStorage.getItem('sessionObject')
const initialState = state ? JSON.parse(sessionStorage.getItem('sessionObject')).email : ""

const authReducer = (state = initialState, action) => {
  switch(action.type){
    case 'LOGIN':
      return {...state, auth: action.payload}
    case 'LOGOUT':
      return ""  
    default:
      return state
  }
}

export default authReducer;