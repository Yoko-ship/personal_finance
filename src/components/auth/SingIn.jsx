import {signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { useState } from 'react'
import { auth } from '../../firebase'


const SingIn = () => {
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")
    const [error,setError] = useState("")

    const nameHanlder = (event)=>{
        setName(event.target.value)
    }
    const passwordHanlder = (event) =>{
        setPassword(event.target.value)
    }

    const emailHanlder = (event)=>{
        setEmail(event.target.value)
    }

    function logIn(e){
        e.preventDefault()
        signInWithEmailAndPassword(auth,email,password) // передаем auth(которого мы импортуреем,почту и пароль)(signInWithEmailAndPassword это войти в акк)
        .then((user) =>{
            console.log(user)
            setEmail("")
            setPassword("")
            setError("")
            setName("")
        }).catch((err)=>{
            console.log(err)
            setError("Извините мы не смогли найти ваш аккаунт")
        })

    }
  return (
    <div>
        <form>
            <h2>Войти в аккаунт</h2>
            <label htmlFor='name'>Имя</label>
            <input type='text' id='name' onChange={nameHanlder} value={name}/>
            <label htmlFor='email'>Почта</label>
            <input type='email' id='email' onChange={emailHanlder} value={email}/>
            <label htmlFor='password'>Пароль</label>
            <input type='password'  onChange={passwordHanlder} value={password}/>
            <button onClick={logIn} style={{color:"White"}}>Подтвердить</button>
            {error? <p style={{color:"red"}}>{error}</p> : ""}
        </form>
    </div>
  )
}

export default SingIn