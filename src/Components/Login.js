// import React from 'react'

// const Login = () => {
//   return (
//     <div  className='w-full min-h-screen  flex items-center justify-center'>
//       <div className='w-[90%] md:w-[75%] border border-gray-600 rounded-lg p-4 flex flex-col items-center justify-center gap-4'></div>
      
      
//     </div>
//   )
// }

// export default Login






import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({email: "", password: ""});
  const navigate = useNavigate();
  const host = process.env.REACT_APP_HOST;

  const handleSubmit = async(e)=>{
    e.preventDefault()

    const response = await fetch(`${host}${process.env.REACT_APP_LOGIN_URL}`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: credentials.email, password: credentials.password})
    });

    const json = await response.json();

    if(json.success){
      localStorage.setItem('authToken', json.authToken);
      navigate('/');
    }
    else{
        document.querySelector('.error-message').innerHTML = json.error;
    }
  }

  const onChange = (e)=>{
    setCredentials({...credentials, [e.target.name]:e.target.value})
  }
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{height: "80%"}}>
        <h3 className="text-black">Please Log In to continue...</h3>
    <form className="my-3 d-flex flex-column align-items-center justify-content-center p-3 p-lg-5 " style={{backgroundColor:"rgba(0,0,0,0.4)"}} onSubmit={handleSubmit}>
      <div className='error-message mb-3' style={{color: "red"}}></div>
      <div className="input-group mb-3">
        <span className="input-group-text" id="basic-addon2">
          @example.com
        </span>
        <input
          type="email"
          className="form-control"
          placeholder="User Email ID"
          aria-label="User Email ID"
          aria-describedby="basic-addon2"
          value={credentials.email}
          onChange={onChange}
          name="email"
          required
          autoComplete="off"
        />
      </div>
      <div className="input-group mb-3" id="basic-addon3">
        <span className="input-group-text">
            Password
        </span>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Password"
          aria-label="Password"
          aria-describedby="basic-addon3"
          value={credentials.password}
          onChange={onChange}
          minLength={5}
          name="password"
          required
        />
      </div>
      
      <button type="submit" className="btn btn-primary" style={{position: "relative"}}>Login</button>
    </form>
    </div>
  )
}

export default Login