import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!name || !email || !password || !confirmPassword) return alert('Llena todos los campos');

    if (password.length < 8) return alert('La contraseña debe tener minimo 8 caracteres');

    if(password !== confirmPassword) return alert('Las contraseñas no coinciden');

    navigate("/");
  }

  return (
    <div className='bg-[#FDF7FE] h-screen flex justify-center items-center'>
      <div className='bg-white w-96 border-2 rounded-md relative p-10'>

        <div className='bg-[#E8DDFC] left-0 right-0 mx-auto -top-14 w-28 h-28 absolute flex justify-center items-center text-7xl rounded-full'>
          <i class='bx bx-user'></i>
        </div>

        <form className='mt-8'>
          <div className='mb-4'>
            <p>Nombre completo</p>
            <input onChange={(e) => setName(e.target.value)} className='border-2 rounded-md w-full h-8' placeholder='Alan Brito Delgado' type="text" />
          </div>

          <div className='mb-4'>
            <p>Correo electrónico</p>
            <input onChange={(e) => setEmail(e.target.value)} className='border-2 rounded-md w-full h-8' placeholder='example@domain.com' type="email" />
          </div>

          <div className='mb-4'>
            <p>Contraseña</p>
            <input onChange={(e) => setPassword(e.target.value)} className='border-2 rounded-md w-full h-8' placeholder='********' type="password" />
          </div>

          <div className='mb-8'>
            <p>Confirmar contraseña</p>
            <input onChange={(e) => setConfirmPassword(e.target.value)} className='border-2 rounded-md w-full h-8' placeholder='********' type="password" />
          </div>

          <div onClick={handleLogin} className='bg-black text-white w-full h-8 rounded-md cursor-pointer mb-4 flex justify-center items-center'>Crear Cuenta</div>

        </form>

        <div className='flex absolute bottom-4 ml-6'>
          <p className='text-sm'>¿Ya tienes una cuenta?</p>
          <Link to={'/login'} className='text-sm ml-2 text-blue-600 underline'>Inicia Sesión</Link>
        </div>
      </div>
    </div>
  )
}
