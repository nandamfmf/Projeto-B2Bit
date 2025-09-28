import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = "https://api.homologation.cliqdrive.com.br/auth";
const HEADERS = {
  Accept: "application/json;version=v1_web",
  "Content-Type": "application/json",
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [user, setUser] = useState(() => {
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const userAvatar = localStorage.getItem('userAvatar');
    return userName ? { name: userName, email: userEmail, avatarUrl: userAvatar } : null;
  });
  
  const [loading, setLoading] = useState(true);

  const signIn = useCallback(async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login/`, { email, password }, { headers: HEADERS });
      
      const newToken = response.data.tokens.access;
      const userData = response.data.user;
      
      if (!newToken) {
        throw new Error("Token não recebido.");
      }

      localStorage.setItem('token', newToken);
      localStorage.setItem('userName', userData.name);
      localStorage.setItem('userEmail', userData.email);
      localStorage.setItem('userAvatar', userData.avatar?.url || '');
      
      setToken(newToken);
      setUser({
        name: userData.name,
        email: userData.email,
        avatarUrl: userData.avatar?.url
      });

      return { success: true };
    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, message: "E-mail ou senha inválidos!" };
    }
  }, []);


  const signOut = useCallback(() => {
    localStorage.clear(); 
    setToken(null);     
    setUser(null);
  }, []);


  const fetchUserProfile = useCallback(async (current_token) => {
    if (!current_token) return;

    try {
      const response = await axios.get(`${API_URL}/profile/`, {
        headers: {
          ...HEADERS,
          Authorization: `Bearer ${current_token.trim()}`,
        },
      });

      const userData = response.data;
      
      localStorage.setItem("userName", userData.name);
      localStorage.setItem("userEmail", userData.email);
      localStorage.setItem("userAvatar", userData.avatar?.url || "");
      
      setUser({
        name: userData.name,
        email: userData.email,
        avatarUrl: userData.avatar?.url
      });

    } catch (error) {
      console.error("Falha ao buscar perfil, token pode estar expirado.", error);
      signOut(); 
    }
  }, [signOut]);

  useEffect(() => {
    if (token) {
      fetchUserProfile(token);
    }
    setLoading(false); 
  }, [token, fetchUserProfile]);


  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);