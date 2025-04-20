import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  hasPermission: (requiredRole: UserRole) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // При загрузке компонента проверяем наличие сохраненного токена
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('sce_token');
        if (token) {
          // Здесь будет запрос к API для проверки токена
          // и получения данных пользователя
          // Пока используем моковые данные
          if (token === 'admin_token') {
            setUser({
              id: '1',
              username: 'admin',
              email: 'artemkauniti@gmail.com',
              role: UserRole.ADMIN,
              createdAt: new Date(),
              lastLogin: new Date(),
              isActive: true,
              isVerified: true
            });
          }
        }
      } catch (error) {
        console.error('Ошибка при проверке аутентификации:', error);
        localStorage.removeItem('sce_token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      // Здесь будет запрос к API для аутентификации
      // Пока используем моковые данные
      if (username === 'admin' && password === 'admin') {
        const userData: User = {
          id: '1',
          username: 'admin',
          email: 'artemkauniti@gmail.com',
          role: UserRole.ADMIN,
          createdAt: new Date(),
          lastLogin: new Date(),
          isActive: true,
          isVerified: true
        };
        setUser(userData);
        localStorage.setItem('sce_token', 'admin_token');
      } else {
        throw new Error('Неверные учетные данные');
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Здесь будет запрос к API для регистрации
      // Возвращаем моковые данные
      if (email === 'artemkauniti@gmail.com') {
        const userData: User = {
          id: '1',
          username,
          email,
          role: UserRole.ADMIN,
          createdAt: new Date(),
          lastLogin: null,
          isActive: true,
          isVerified: false
        };
        setUser(userData);
        localStorage.setItem('sce_token', 'admin_token');
      } else {
        const userData: User = {
          id: Math.random().toString(),
          username,
          email,
          role: UserRole.READER,
          createdAt: new Date(),
          lastLogin: null,
          isActive: true,
          isVerified: false
        };
        setUser(userData);
        localStorage.setItem('sce_token', 'user_token');
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('sce_token');
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      // Здесь будет запрос к API для сброса пароля
      console.log(`Запрос на сброс пароля для ${email} отправлен`);
    } catch (error) {
      console.error('Ошибка сброса пароля:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const hasPermission = (requiredRole: UserRole): boolean => {
    if (!user) return false;
    // Возвращаем true, если роль пользователя выше или равна требуемой роли
    // (меньшее число = более высокий уровень доступа)
    return user.role <= requiredRole;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        resetPassword,
        hasPermission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};