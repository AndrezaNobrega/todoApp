import React, {Component} from 'react'
import PageHeader from '../template/pageHeader'
import axios from 'axios'
import todoForm from './todoForm'
import lista from './lista'

const URL = 'http://localhost:3003/api/todos'

import TodoForm from './todoForm'
import Lista from './lista'
export default class Todo extends Component {
    constructor(props){
        super(props)
        this.state = {description: '', list: [] }

        this.handleChange = this.handleChange.bind(this)
        //aqui indica que o this sempre está referenciando o componente atual
        this.handleAdd = this.handleAdd.bind(this)

        this.handleRemove = this.handleRemove.bind(this)
        this.handleSearch = this.handleSearch.bind(this)

        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.refresh()
    }

    refresh(description = ''){
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
        .then(resp => this.setState({...this.state, description, list: resp.data}))
    }

    handleSearch(){
        this.refresh(this.state.description)
    }

    handleChange(e){
        this.setState({...this.state, description: e.target.value})
    }

    handleRemove(todo){
        axios.delete(`${URL}/${todo._id}`)
            .then(resp => this.refresh(this.state.description))
    }

    handleAdd(){
        const description = this.state.description
        if (description == '') {
            alert('Insira a tareafa')
        } else {
            //enviando o objeto
            axios.post(URL, {description})
                .then(resp => this.refresh())
        }

    }

    handleMarkAsDone(todo) {
        //c o ...todo pegamos  o objeto inteiro
        // e alteramos apenas o objeto done p true
        axios.put(`${URL}/${todo._id}`, {...todo, done: true})
            // quando chega a resposta apenas atualizamos a página
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsPending(todo){
        axios.put(`${URL}/${todo._id}`, {...todo, done:false})
            .then(resp => this.refresh(this.state.description))
    }

    handleClear(){
        this.refresh()
    }

    render(){
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro'/>
                <TodoForm description={this.state.description}
                handleChange={this.handleChange}
                handleAdd={this.handleAdd}
                handleSearch = {this.handleSearch}
                handleClear = {this.handleClear}/>
                <Lista list={this.state.list}
                //enviando os métodos para o componente filhos
                // para que ele seja chamado
                handleRemove={this.handleRemove}
                handleMarkAsDone={this.handleMarkAsDone}
                handleMarkAsPending = {this.handleMarkAsPending}
                
                />
            </div>
        )
    }
}