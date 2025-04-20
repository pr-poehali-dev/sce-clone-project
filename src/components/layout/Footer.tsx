import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-sce-dark text-white py-8 mt-12">
      <div className="sce-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="flex items-center">
              <span className="font-scp-bauhaus text-2xl text-sce-red mr-2">SCE</span>
              <span className="font-scp-bauhaus text-xl">FOUNDATION</span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm">
              SCE Foundation - Secure. Control. Explore.
              <br />
              Документируем и классифицируем аномальные явления и объекты.
            </p>
          </div>
          
          <div>
            <h3 className="font-scp-bauhaus text-lg mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/objects" className="hover:text-sce-red transition-colors">
                  Объекты SCE
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-sce-red transition-colors">
                  Новости и события
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-sce-red transition-colors">
                  О проекте
                </Link>
              </li>
              <li>
                <Link to="/submit" className="hover:text-sce-red transition-colors">
                  Отправить материал
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-scp-bauhaus text-lg mb-4">Правовая информация</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link to="/privacy" className="hover:text-sce-red transition-colors">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-sce-red transition-colors">
                  Условия использования
                </Link>
              </li>
              <li>
                <Link to="/rules" className="hover:text-sce-red transition-colors">
                  Правила сообщества
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sce-red transition-colors">
                  Связаться с нами
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
          <p>© {currentYear} SCE Foundation. Все права защищены.</p>
          <p className="mt-2">
            Хостинг на <a href="https://www.reg.ru" className="text-sce-red hover:underline" target="_blank" rel="noopener noreferrer">reg.ru</a>
          </p>
        </div>
      </div>
    </footer>
  );
}