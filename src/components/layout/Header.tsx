import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuth } from "@/lib/authContext";
import { UserRole } from "@/types";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout, hasPermission } = useAuth();

  return (
    <header className="bg-sce-dark text-white sticky top-0 z-50">
      <div className="sce-container">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="font-scp-bauhaus text-2xl text-sce-red mr-2">SCE</span>
              <span className="hidden sm:inline font-scp-bauhaus text-xl">FOUNDATION</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-6">
              <Link to="/objects" className="hover:text-sce-red transition-colors">Объекты</Link>
              <Link to="/news" className="hover:text-sce-red transition-colors">Новости</Link>
              <Link to="/about" className="hover:text-sce-red transition-colors">О проекте</Link>
              {hasPermission(UserRole.RESEARCHER) && (
                <Link to="/submit" className="hover:text-sce-red transition-colors">Создать объект</Link>
              )}
              {hasPermission(UserRole.ADMIN) && (
                <Link to="/admin" className="hover:text-sce-red transition-colors">Админ-панель</Link>
              )}
            </nav>
            
            <div className="flex items-center space-x-3">
              <Button size="icon" variant="ghost" className="text-white hover:text-sce-red hover:bg-transparent">
                <Search className="w-5 h-5" />
              </Button>
              <ThemeToggle />
              
              {isAuthenticated ? (
                <div className="relative group">
                  <Button variant="ghost" className="text-white hover:text-sce-red hover:bg-transparent">
                    <User className="w-5 h-5 mr-2" />
                    <span className="hidden sm:inline">{user?.username}</span>
                  </Button>
                  <div className="absolute right-0 w-48 bg-sce-dark border border-gray-700 rounded-sm shadow-lg py-1 mt-1 invisible group-hover:visible">
                    <Link to="/profile" className="block px-4 py-2 hover:bg-gray-800">Профиль</Link>
                    <button 
                      onClick={logout} 
                      className="block w-full text-left px-4 py-2 hover:bg-gray-800"
                    >
                      Выйти
                    </button>
                  </div>
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="ghost" className="text-white hover:text-sce-red hover:bg-transparent">
                    <User className="w-5 h-5 mr-2" />
                    <span>Войти</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <ThemeToggle />
            <Button 
              size="icon" 
              variant="ghost" 
              className="text-white ml-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Мобильное меню */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-sce-dark border-t border-gray-700">
          <div className="sce-container py-4">
            <div className="flex items-center mb-4">
              <Search className="w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Поиск..."
                className="w-full bg-transparent border-b border-gray-700 ml-2 pb-1 focus:outline-none focus:border-sce-red"
              />
            </div>
            
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/objects" 
                className="hover:text-sce-red transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Объекты
              </Link>
              <Link 
                to="/news" 
                className="hover:text-sce-red transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Новости
              </Link>
              <Link 
                to="/about" 
                className="hover:text-sce-red transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                О проекте
              </Link>
              
              {hasPermission(UserRole.RESEARCHER) && (
                <Link 
                  to="/submit" 
                  className="hover:text-sce-red transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Создать объект
                </Link>
              )}
              
              {hasPermission(UserRole.ADMIN) && (
                <Link 
                  to="/admin" 
                  className="hover:text-sce-red transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Админ-панель
                </Link>
              )}
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/profile" 
                    className="hover:text-sce-red transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Профиль ({user?.username})
                  </Link>
                  <button 
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }} 
                    className="text-left hover:text-sce-red transition-colors"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="hover:text-sce-red transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Войти / Регистрация
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}