import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc'
import shareVideo from '../assets/login_bg.mp4'
import logo from '../assets/logo.png'
import { client } from '../client';

function Login() {
  const navigate = useNavigate();

  const responseGoogle = (response)=>{
    const {name,picture,sub} = jwt_decode(response.credential);
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    }
    localStorage.setItem('user',JSON.stringify(doc));
    client.createIfNotExists(doc)
    .then(()=>{
      navigate('/',{replace: true});
    })
    // console.log(doc);
  }
  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
      <video src={shareVideo} type="video/mp4" loop muted autoPlay className='w-full h-full object-cover' />
      <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay '>
      <div className="p-5">
        <img src={logo} alt='logo' width="130px"/>
      </div>
      <div className='shadow-2xl'>
        <GoogleLogin
          render={(renderProps)=>(
            <button type='button' className='bg-mainColor'
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            >
              <FcGoogle className='mr-4'/>Sign in with Google
            </button>
          )}
          onSuccess={responseGoogle}
          onError={responseGoogle}
        />
      </div>
      </div>
      

      </div>
    </div>
  )
}

export default Login