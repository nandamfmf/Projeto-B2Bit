import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/Input';
import Button from '../../components/Button';
import './login.css'; 

function LoginPage() {
  const { signIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    const result = await signIn(email, password);

    if (result.success) {
    } else {
      setError(result.message);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div id="box">
      <div className="logo-placeholder">
          {}
      </div>
      <h3 className="email">E-mail</h3>
      <form id="formLogin" onSubmit={handleSubmit}>
        <Input 
          id="emailinp"
          type="email" 
          placeholder="@gmail.com" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h3 className="senha">Senha</h3>
        <Input 
          id="senhainp"
          type="password" 
          placeholder="*********" 
          required 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        {error && <p id="errorMessage" style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
        
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Entrando...' : 'Sign In'}
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;