import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  setAuth: (auth: boolean) => void;
  setLoading: (state: boolean) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loading: true,
  setAuth: () => {},
  setLoading: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

const validateToken = async () => {
  const token = localStorage.getItem("token");

  if (!token || token == undefined) {
    return false;
  } else {
    return true;
  }

  /*try {
    const response = await fetch('/api/validate', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const data = await response.json();

      return true;
    } else if (response.status === 401 || response.status === 403) {
      localStorage.removeItem('token');
      return false;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Token validation failed:', error);
    return false;
  }*/
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const role = localStorage.getItem("userRole");
  const navigate = useNavigate();

  const setAuth = (auth: boolean) => {
    setIsAuthenticated(auth);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };
  useEffect(() => {
    if (window.location.pathname === "/create-user" && role !== "admin") {
      navigate("/");
    }
    if (!loading && !isAuthenticated) {
      if (
        window.location.pathname !== "/forgot-password" &&
        window.location.pathname !== "/unsubscribe" &&
        window.location.pathname !== "/forgot-password/confirm" &&
        window.location.pathname !== "/set-password" &&
        window.location.pathname !== "/password-changed"
      ) {
        navigate("/login");
      }
    }
  }, [loading, isAuthenticated, navigate]);
  useEffect(() => {
    const checkAuthState = async () => {
      const isValid = await validateToken();
      setIsAuthenticated(isValid);
      setLoading(false);

      if (!isValid) {
        localStorage.removeItem("token");
        if (
          window.location.pathname !== "/forgot-password" &&
          window.location.pathname !== "/unsubscribe" &&
          window.location.pathname !== "/forgot-password/confirm" &&
          window.location.pathname !== "/set-password" &&
          window.location.pathname !== "/password-changed"
        ) {
          navigate("/login");
        }
      }
    };

    checkAuthState();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, setAuth, setLoading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
