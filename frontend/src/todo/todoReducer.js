const initial_state = {
  description: "",
  list: [],
};

//reducer recebe o estado atual e uma action
//sempre que uma action é executada, os reducers são chamados

export default (state = initial_state, action) => {
    switch(action.type) {
        case 'description_changed':
            return {...state, description: action.payload}
        case 'todo_searched':
            return {...state, list: action.payload}
        case 'todo_clear':
            return {...state, description: ''}
        default:
            return state

    }
}