import axios from 'axios';


const URL = 'http://localhost:3003/api/todos'

export const changeDescription = (event) => ({
    type: 'description_changed',
    payload: event.target.value //evento do change quando mexemos no campo do input
    //o onChange eh disparado e chamamos esse método
    //esse método então recebe o event
    //event.target.value target é o p input e value é o valor que recebemos
})

//buscar no backend
//n podemos usar o then, pois ele eh síncroni
//por isso enviamos a request
//precisamos então de um middleware
export const search = () => {
    return (dispatch, getState) =>{
        const description = getState().todo.description
        const search = description ? `&description__regex=/${description}/` : ''
        const request = axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => dispatch({type: 'todo_searched', payload: resp.data}))

    }
}

//precisamos configurar, para sincronizar de forma adequada o search com a rquest
// para isso é necessário utilizar o middleware thunk
//ele vai garantir que o search só seja chamada, quando a request se completa

//o middleware promisse: sempreq eu é retornada uma promise dentro da action 
//ele 'espera' a promise ser resolvida p disparar os reducers 

export const add = (description) => {
    return dispatch => {
        axios.post(URL, {description})
            .then(resp => dispatch(clear()))
            //esse outro then, só será executado quando a resposta retornar
            .then(resp => dispatch(search()))
    }
}

export const markAsDone = (todo) => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, {...todo, done: true})
            .then(resp => dispatch(search()))
    }
}

export const markAsPending = (todo) => {
    return dispatch => {
        axios.put(`${URL}/${todo._id}`, {...todo, done: false})
            .then(resp => dispatch(search()))
    }
}

export const remove = todo => {
    return dispatch => {
        axios.delete(`${URL}/${todo._id}`)
        .then(resp => dispatch(search()))

    }
}

//o multi interpreta esse array de ações
export const clear = () => {
    return [{ type: 'todo_clear'}, search()]
}