import { useState, useEffect } from 'react'
import './styles.css'
import { Login } from './Login'
import { Register } from './Register'

export const Authentication = () => {
  const [form, setForm] = useState(false)
  
  return (
    <div className="auth-body">
      <div className="auth-container">
        <div className="right-side">
          <h2>PanpacificU E-Library</h2>
        </div>
        <div className="left-side">
          {form ? (
            <Register/>
          ) : (
            <Login/>
          )}
          <div className='create-account'>
            {!form && (
              <p>
                Don't have an account yet?
              </p>
            )}
            <button 
              className='buttons'
              onClick={() => {
                setForm(!form)
              }}
            >
              { form ? 
                'Go to login page' 
                  : 
                'Create an account'
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}