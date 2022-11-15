import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccount = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    
    const navigate = useNavigate();

    const createAccount = async () => {
        try {
            if(password !== confirmPassword){
                setError('Password and confirm password does not match.');
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch(e){
            setError(e.message);
        }
    }

    return (
        <>
        <h1>Create Account.</h1>
        {error && <p className="error">{error}</p>}
        <input 
        placeholder="Your email here"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required />
        <input 
        type="password" 
        placeholder="Your Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required />
        <input 
        type="password" 
        placeholder="Re-enter Your Password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        required />
        <button onClick={createAccount}>Create Account</button>
        <Link to="/login">Already have an account? Log in.</Link>
        </>
    );
}

export default CreateAccount;