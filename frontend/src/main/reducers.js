import { combineReducers } from "redux";
import todoReducer from "../todo/todoReducer";

const rootReducer = combineReducers({
    //se tivesse colocado apenas chaves seria o corpo da função
    // mas dessa maneira, temos um objeto
    todo: todoReducer
})

export default rootReducer