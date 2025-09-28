import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import './home.css'; 

function HomePage() {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate(); 

  if (loading) {
    return <div>Carregando perfil...</div>; 
  }

  const handleLogout = () => {
    signOut(); 
    navigate('/');
  };

  if (!user) {
    navigate('/'); 
    return null;
  }

  return (
    <div id="box">
        <Button 
            id="logout" 
            onClick={handleLogout} 
            style={{ float: 'right', marginTop: '20px', marginRight: '20px' }}
        >
          Logout
        </Button>
        <h3 className="profile">Profile picture</h3>
        <img 
          id="avatar" 
          src={user.avatarUrl || "https://placehold.co/150x150"} 
          alt="Foto de perfil" 
        />

        <h3>Your name</h3>
        <div className="nome">
            <h4 id="name">{user.name}</h4>
        </div>

        <h3>Your E-mail</h3>
        <div className="email">
            <h4 id="email">{user.email}</h4>
        </div>
    </div>
  );
}

export default HomePage;