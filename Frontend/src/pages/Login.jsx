import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return alert('Llena todos los campos');

    if (password.length < 8) return alert('La contraseña debe tener minimo 8 caracteres');

    navigate("/");
  }

  return (
    <div className='bg-[#FDF7FE] h-screen flex justify-center items-center'>
      <div className='bg-white h-96 w-96 border-2 rounded-md relative p-10'>

        <div className='bg-[#E8DDFC] left-0 right-0 mx-auto -top-14 w-28 h-28 absolute flex justify-center items-center text-7xl rounded-full'>
          <i class='bx bx-user'></i>
        </div>

        <form className='mt-8'>
          <div className='mb-4'>
            <p>Correo Electrónico</p>
            <input onChange={setEmail} className='border-2 rounded-md w-full h-8' placeholder='example@domain.com' type="email" />
          </div>

          <div className='mb-8'>
            <p>Contraseña</p>
            <input onChange={setPassword} className='border-2 rounded-md w-full h-8' placeholder='********' type="password" />
          </div>

          <div onClick={handleLogin} className='bg-black text-white w-full h-8 rounded-md cursor-pointer mb-4 flex justify-center items-center'>Iniciar Sesión</div>

          <p className='cursor-pointer text-xs underline'>¿Olvidaste tu contraseña?</p>
        </form>

        <div className='flex absolute bottom-4 ml-2'>
          <p className='text-sm'>¿Todavía no tienes una cuenta?</p>
          <Link to={'/register'} className='text-sm ml-2 text-blue-600 underline'>Regístrate</Link>
        </div>
      </div>
    </div>
  )
}
