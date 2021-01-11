import React, { useEffect } from 'react'
import { Header } from './common/header'

 const AppLayout = (props) => {

    useEffect(() => {
        if (window.location.pathname !== '/login' && window.location.pathname !== '/signup' && !localStorage.getItem('utoken')){
            window.location.href = '/login'
        }else if (window.location.pathname !== '/task' && window.location.pathname !== '/archive-task' && localStorage.getItem('utoken')){
            window.location.href = '/task'
        }
        
    })

    return (
        <div style={{width:'100%', backgroundColor:'#798390', height:'100vh'}} onContextMenu={(e)=> e.preventDefault()}>
            <Header />
            <div className="container main-body" >
                {props.children}
            </div>
        </div>
    )
}

export default AppLayout;