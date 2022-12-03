import React, {useEffect} from 'react'
import {v4 as uuidV4} from "uuid";

const Form = ({input, setInput, todo, setTodo, editTodo, setEditTodo}) => {
  
    const updateTodo = (title, id, completed) => {
        const newTodo = todo.map((todo) => 
            todo.id === id ? {title, id, completed} : todo
        );
        setTodo(newTodo);
        setEditTodo("");
    }

    useEffect(() => {
        if(editTodo) {
            setInput(editTodo.title);
        } else {
            setInput("");
        }
    }, [setInput,editTodo]);
    
    const onInputChange = (event) => {
        setInput(event.target.value);
    } 

    const onformSubmit = (event) =>{
        event.preventDefault();
        if(!editTodo){
        setTodo([...todo, {id: uuidV4(), title: input, completed: false}])
        setInput("");
        } else {
            updateTodo(input, editTodo.id, editTodo.completed)
        }
    }  
    return (
    <form onSubmit={onformSubmit}>
        <input type="text" 
        placeholder='Masukkan kegiatan anda' 
        className='task-input'
        value={input}
        required
        onChange={onInputChange}
        />
        <button className='button-add' type='submit'>
            {editTodo ? "Simpan" : "Kirim"}
        </button>
    </form>
  )
}

export default Form