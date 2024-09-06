import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import UserService from "./UserService";
import '../CSS/LoginPage.css'

function LoginPage(){
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState('')
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const userData = await UserService.login(email, password);
        console.log(userData);
        if (userData.token) {
            localStorage.setItem('token', userData.token);
            localStorage.setItem('role', userData.role);

            // Trigger the storage event manually to update other components
            window.dispatchEvent(new Event('storage'));

            navigate('/home');
        } else {
            setError(userData.message);
        }
    } catch (error) {
        console.log(error);
        setError(error.message);
        setTimeout(() => {
            setError('');
        }, 5000);
    }
};



    return(
        <div className="auth-container">
                        <br/>
            
           

            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email: </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
<div>
<br/>
    <h3>Use below details to login:</h3>
    <h5>Admin</h5>email: admin@sahara.com<br/>password: admin<br/>
    <h5>Non-Admin</h5>email: user1@sahara.com<br/>password: user1
</div> 

        </div>
    )

}

export default LoginPage;
