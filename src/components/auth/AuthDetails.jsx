import { onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import "./auntification.css"
const AuthDetails = () => {
    const [authUser,setAuthUser] = useState(null)
    useEffect(()=>{
        const listen = onAuthStateChanged(auth,(user)=>{ // Проверка на существует ли user 
            if(user){
                setAuthUser(user)
            }else{
                setAuthUser(null)
            } // Если юзера нет то обработчик(useState) будет null
        })
        return() =>{
            listen()
        }
    },[])

    // Здесь мы выходим с аккаунта
    const userSignOut = ()=>{
        signOut(auth)
        .then(() => console.log("success"))
        .catch((err) =>{
            console.log(err)
        })
    }
  return (
    <div className='auntification'>
        {/* Если пользователь зашел срабатывает кнопку выйти а так же отображается его email  а если нет(то отображается <p>Signed OUT)*/}
        {authUser?(
            <div><p>{`Вы зашли как ${authUser.email}`}</p><button onClick={userSignOut}>Выйти</button></div>
        ): <p>Signed out</p>}
    </div>
  )
}

export default AuthDetails