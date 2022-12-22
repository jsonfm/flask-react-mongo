import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export const Users = () => {

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
        users: [],
        editing: false,
        id: ''
    });

    const clearForm = (editing=false) => {
        setState({
            ...state,
            name: '',
            email: '',
            password: '',
            editing,
        })
    }

    const getUsers = async () => {
        const response = await fetch(`${API_URL}/users`).then(res => res.json());
        setState({...state, users: response, editing: false});
    }

    const createUser = async () => {
        const userResponse = window.confirm('Are you sure you want to create this user?');
        if(!userResponse) return;
        const response = await fetch(`${API_URL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: state.name,
                email: state.email,
                password: state.password
            })
        }).then(res => res.json());
    }

    const deleteUser = async (id) => {
        const userResponse = window.confirm('Are you sure you want to delete this user?');
        if(!!userResponse){
            await fetch(`${API_URL}/user/${id}`,{
                method: 'DELETE',
            });
            await getUsers();
        }
    }

    const editUser = async (id) => {

        const { user } = await fetch(`${API_URL}/user/${id}`).then(res => res.json());
        setState({
            ...state,
            name: user.name,
            email: user.email,
            password: user.password,
            id: id,
            editing: true
        });

    }

    useEffect(() => {
        getUsers()
    }, []);

    const updateUser = async () => {
        const { id } = state;
        const response = await fetch(`${API_URL}/user/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: state.name,
                email: state.email,
                password: state.password
            })      
        }).then(res => res.json());
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!state.editing){
            await createUser();
        }else{
           await updateUser();
        }
        await getUsers();
    }

    return (
        <>
            <div className="row">
                <div className="col-md-4">
                    <form onSubmit={handleSubmit} className="card card-body">
                        <div className="my-2">
                            <input 
                                type="text" 
                                value={state.name}
                                onChange={(e) => setState({ ...state, name: e.target.value})}
                                className="form-control"
                                placeholder="Name"
                                autoFocus
                            />
                        </div>
                        <div className="my-2">
                            <input 
                                type="email" 
                                value={state.email}
                                onChange={(e) => setState({...state, email: e.target.value})}
                                className="form-control"
                                placeholder="Email"
                                autoFocus
                            />
                        </div>
                        <div className="my-2">
                            <input 
                                type="password" 
                                value={state.password}
                                onChange={(e) => setState({...state, password: e.target.value})}
                                className="form-control"
                                placeholder="Password"
                                autoFocus
                            />
                        </div>
                        <button 
                            type="submit"
                            className={`btn ${state.editing ? 'btn-primary': 'btn-info'} mt-4`}
                        >
                            {state.editing ? 'EDIT': 'CREATE'}
                        </button>
                    </form>
                </div>
                <div className="col-md-8">
                    <div className="card card-body">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {state.users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>
                                        <button 
                                            className="btn btn-secondary btn-sm btn-block"
                                            onClick={() => editUser(user._id)}
                                        >Edit</button>
                                        <button 
                                            onClick={() => deleteUser(user._id)}
                                            className="btn btn-danger btn-sm btn-block"
                                        >Delete</button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}