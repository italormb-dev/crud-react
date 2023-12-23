import React, { Component} from 'react'
import axios from 'axios'
import Main from '../template/main'


const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'

}

//serve para restaurar o estado o estado inicial, quando usuário clica em cancelar no formulário e outras situações
const baseUrl = 'http://localhost:3001/users' //port do backend

//definindo estado inciial na mão
const initialState = {
    user: {name: '', email: ''},
    list: []
}

export default class UserCrud extends Component {
    //configurando
    state= {... initialState}
    //é uma função chamada para obter a lista cadastrada e depois mostra no console.log
    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({list: resp.data})
        })
    }
    //limpar o formulário
    clear () {
        this.setState({user: initialState.user})
    }
    // incluir (post) um novo usuário ou alterar(put) um novo usuário (tem id setado)
    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post' //ser user.id for verdadeira faço put, caso contrário faço post
        const url = user.id ? `${baseUrl}/${user.id}` :baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data) //criar a list com mesmo nome pq está dentro da função
                this.setState({user: initialState.user, list})
            })
    
    }

    //serve para atualizar já adicionando o novo usuário ou alterando se já existir na lista
    getUpdatedList(user, add = true){
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    //serve para atualizar nome ou e-mail
    updateField(event) {
        const user = {...this.state.user} //vai alterar o estado de usuário=componente, apos fazer esse clone
        user[event.target.name] = event.target.value 
        this.setState({user})
    }

    //vou colocar o jsx que vai renderizar o formulário e outra tabela e outra linhas da tabela
    renderForm () {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type='text' className='form-control' 
                            name='name' value={this.state.user.name} 
                            onChange={e => this.updateField(e)}
                            placeholder='Digite o nome...' />

                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type='text' className='form-control' 
                            name='email' value={this.state.user.email} 
                            onChange={e => this.updateField(e)}
                            placeholder='Digite o e-mail...' />

                        </div>
                    </div>
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>



            </div>
        )

    }


    load(user) {
        this.setState({ user})
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            //const list = this.state.list.filter(u => u !== user)
            const list = this.getUpdatedList(user, false)
            this.setState({list})
        })
    }


    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    
    render() {
        //console.log(this.state.list)

        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}
