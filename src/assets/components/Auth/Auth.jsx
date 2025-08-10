import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import left from '../../img/left.svg'
import cls from '../../img/cls.svg'
import Code from './Code.jsx';
import Login from './Login.jsx'
import Create from './Create.jsx';
import '../../scss/auth.scss'

export default function Auth() {
  const [isOpen, setIsOpen] = useState(true)
  const [title, setTitle] = useState('')
  const [current, setCurrent] = useState('create')
  const [backBtn, setBackBtn] = useState(false)
  const navigate = useNavigate()
  const [phone, setPhone] = useState("")
  const [fullName, setFullName] = useState("")

  useEffect(() => {
    if (!['create', 'login', 'code'].includes(current)) {
      navigate('/');
    }
    
  }, [current]);
  return (

    <div className={isOpen ? 'auth__outer' : 'auth__dis'}>
      <div className="auth" onClick={() => { setIsOpen(false) }}>
        <div className="auth__wrap" onClick={(e) => { e.stopPropagation() }}>
          <div className="auth__desc">
            <p className='auth__desc-text'>
              {backBtn ? (<img onClick={()=>{setCurrent('create')}}  className='auth__desc-text__back' src={left} />) : ''}
              {title}
            </p>
            <img src={cls} onClick={() => { setIsOpen(false) }} />

          </div>
          <div className="auth__child">
            {
              current == 'create' ? (
                <Create title={setTitle} setCurrent={setCurrent} setBack={setBackBtn} phone={phone} setPhone={setPhone}
                  setFullName={setFullName} />
              ) : current == 'login' ? (
                <Login title={setTitle} setCurrent={setCurrent} setBack={setBackBtn} phone={phone} setPhone={setPhone}/>
              ) : current == 'code' ? (
                <Code title={setTitle} setCurrent={setCurrent} setBack={setBackBtn} phone={phone} fullName={fullName}/>

              ) : null
            }
          </div>

        </div>
      </div>
    </div>
  )
}
