import { createUserWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { useState } from 'react'
import { auth } from '../../firebase'

const SingUp = () => {
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [copyPassword,setCopyPassword] = useState("")
    const [email,setEmail] = useState("")
    const [error,setError] = useState("")

    const nameHanlder = (event)=>{
        setName(event.target.value)
    }
    const passwordHanlder = (event) =>{
        setPassword(event.target.value)
    }
    const secondPasswordHanlder =(event)=>{
        setCopyPassword(event.target.value)
    }
    const emailHanlder = (event)=>{
        setEmail(event.target.value)
    }

    function register(e){
        e.preventDefault()
        if(copyPassword !== password){
            setError("Пароли не совпадают")
            return
        }
        createUserWithEmailAndPassword(auth,email,password) // передаем auth(которого мы импортуреем,почту и пароль)
        .then((user) =>{
            console.log(user)
            setEmail("")
            setPassword("")
            setCopyPassword("")
            setError("")
            setName("")
        }).catch((err)=>{
            console.log("Произошла ошибка " , err)
        })

    }
  return (
    <div>
        <form onSubmit={register}>
            <h2>Создать аккаунт</h2>
            <label htmlFor='name'>Имя</label>
            <input type='text' id='name' onChange={nameHanlder} value={name}/>
            <label htmlFor='email'>Почта</label>
            <input type='email' id='email' onChange={emailHanlder} value={email}/>
            <label htmlFor='password'>Пароль</label>
            <input type='password'  onChange={passwordHanlder} value={password}/>
            <label htmlFor='password'>Подтвердите пароль</label>
            <input type='password' id='password' onChange={secondPasswordHanlder} value={copyPassword}/>
            <button style={{color:"white"}}>Подтвердить</button>
            {error ? <p style={{color:"red"}}>{error}</p>: ""}
        </form>
    </div>
  )
}

export default SingUp