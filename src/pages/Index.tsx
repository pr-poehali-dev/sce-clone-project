import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/authContext";

export default function Index() {
  const { isAuthenticated } = useAuth();

  return (
    <MainLayout>
      {/* Герой-секция */}
      <section className="relative bg-sce-dark text-white py-16">
        <div className="absolute inset-0 bg-[url('/images/sce-pattern.png')] opacity-10"></div>
        <div className="sce-container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-scp-bauhaus text-4xl md:text-5xl lg:text-6xl mb-6">
              <span className="text-sce-red">SCE</span> FOUNDATION
            </h1>
            <p className="text-xl mb-8">Secure. Control. Explore.</p>
            <p className="text-gray-300 mb-8 text-lg">
              Мы документируем и классифицируем аномальные явления и объекты для безопасности человечества. 
              Исследуя неизвестное, мы контролируем непознанное и защищаем наше общее будущее.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/objects">
                <Button size="lg" variant="default" className="w-full sm:w-auto bg-sce-red hover:bg-red-700 text-white">
                  Архив объектов
                </Button>
              </Link>
              {!isAuthenticated && (
                <Link to="/register">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-sce-red text-sce-red hover:bg-sce-red/10">
                    Присоединиться
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Последние объекты SCE */}
      <section className="py-12">
        <div className="sce-container">
          <h2 className="font-scp-bauhaus text-3xl mb-8 text-center">
            <span className="text-sce-red">Последние</span> объекты
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Демо-объект 1 */}
            <div className="sce-paper p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-scp-bauhaus text-xl">SCE-001</h3>
                <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs font-medium rounded">
                  Класс: Кетер
                </span>
              </div>
              <h4 className="font-bold mb-3">Куб преломления</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                Объект SCE-001 представляет собой куб из неизвестного материала размером 10×10×10 см. 
                При наблюдении преломляет свет таким образом, что создаёт искажение пространства вокруг себя...
              </p>
              <Link to="/objects/sce-001">
                <Button variant="link" className="text-sce-red p-0 h-auto">
                  Читать полностью
                </Button>
              </Link>
            </div>

            {/* Демо-объект 2 */}
            <div className="sce-paper p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-scp-bauhaus text-xl">SCE-002</h3>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs font-medium rounded">
                  Класс: Евклид
                </span>
              </div>
              <h4 className="font-bold mb-3">Бесконечный блокнот</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                Объект SCE-002 выглядит как обычный спиральный блокнот в мягкой обложке. 
                Несмотря на то, что блокнот содержит только 50 страниц, последняя страница 
                никогда не может быть достигнута...
              </p>
              <Link to="/objects/sce-002">
                <Button variant="link" className="text-sce-red p-0 h-auto">
                  Читать полностью
                </Button>
              </Link>
            </div>

            {/* Демо-объект 3 */}
            <div className="sce-paper p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-scp-bauhaus text-xl">SCE-003</h3>
                <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs font-medium rounded">
                  Класс: Безопасный
                </span>
              </div>
              <h4 className="font-bold mb-3">Шепчущий камень</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                Объект SCE-003 - овальный камень размером с человеческую ладонь, серого цвета с 
                зелеными вкраплениями. При прикосновении к нему субъект слышит шепот на различных
                языках, включая давно вымершие...
              </p>
              <Link to="/objects/sce-003">
                <Button variant="link" className="text-sce-red p-0 h-auto">
                  Читать полностью
                </Button>
              </Link>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/objects">
              <Button className="bg-sce-red hover:bg-red-700 text-white">
                Смотреть все объекты
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Последние новости */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="sce-container">
          <h2 className="font-scp-bauhaus text-3xl mb-8 text-center">
            <span className="text-sce-red">Последние</span> новости
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Новость 1 */}
            <div className="sce-paper overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src="/placeholder.svg" 
                  alt="Новая лаборатория" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <span>12 октября 2023</span>
                  <span className="mx-2">•</span>
                  <span>Инфраструктура</span>
                </div>
                <h3 className="font-bold text-xl mb-3">Открытие новой лаборатории SCE</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                  Сегодня состоялось открытие новой лаборатории SCE Foundation в закрытом районе. 
                  Современное оборудование позволит нашим исследователям...
                </p>
                <Link to="/news/1">
                  <Button variant="link" className="text-sce-red p-0 h-auto">
                    Читать полностью
                  </Button>
                </Link>
              </div>
            </div>

            {/* Новость 2 */}
            <div className="sce-paper overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src="/placeholder.svg" 
                  alt="Набор сотрудников" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <span>5 октября 2023</span>
                  <span className="mx-2">•</span>
                  <span>Персонал</span>
                </div>
                <h3 className="font-bold text-xl mb-3">Набор полевых исследователей</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                  SCE Foundation объявляет дополнительный набор полевых исследователей для работы с 
                  аномальными объектами класса Безопасный и Евклид...
                </p>
                <Link to="/news/2">
                  <Button variant="link" className="text-sce-red p-0 h-auto">
                    Читать полностью
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/news">
              <Button className="bg-sce-red hover:bg-red-700 text-white">
                Все новости
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Присоединиться к проекту */}
      <section className="py-16 bg-sce-dark text-white">
        <div className="sce-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-scp-bauhaus text-3xl mb-6">
              Присоединяйтесь к <span className="text-sce-red">SCE Foundation</span>
            </h2>
            <p className="text-gray-300 mb-8">
              Станьте частью команды, документирующей и исследующей аномальные явления. 
              Вместе мы защитим человечество от неизвестного.
            </p>
            <Link to={isAuthenticated ? "/profile" : "/register"}>
              <Button size="lg" className="bg-sce-red hover:bg-red-700 text-white">
                {isAuthenticated ? "Перейти в профиль" : "Зарегистрироваться"}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}