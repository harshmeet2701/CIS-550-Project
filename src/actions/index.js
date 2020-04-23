export const login = (email) => {
  return {
    type: 'LOGIN',
    payload: email
  }
}