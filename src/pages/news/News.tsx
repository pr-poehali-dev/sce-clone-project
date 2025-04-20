import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { SearchIcon, CalendarIcon } from "lucide-react";

export default function News() {
  // Мок-данные для новостей
  const news = [
    {
      id: 1,
      title: "Открытие новой лаборатории SCE",
      date: "12 октября 2023",
      category: "Инфраструктура",
      excerpt: "Сегодня состоялось открытие новой лаборатории SCE Foundation в закрытом районе. Современное оборудование позволит нашим исследователям проводить более сложные эксперименты и содержать аномальные объекты в более безопасных условиях.",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Набор полевых исследователей",
      date: "5 октября 2023",
      category: "Персонал",
      excerpt: "SCE Foundation объявляет дополнительный набор полевых исследователей для работы с аномальными объектами класса Безопасный и Евклид. Требуется опыт научной работы и готовность к нестандартным ситуациям.",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Обнаружены новые аномальные объекты",
      date: "28 сентября 2023",
      category: "Исследования",
      excerpt: "За последний месяц полевые агенты SCE Foundation обнаружили три новых аномальных объекта. После первичной классификации два из них отнесены к классу Безопасный, один — к классу Евклид. Все объекты помещены в специальные условия содержания.",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Конференция по аномальным явлениям",
      date: "15 сентября 2023",
      category: "События",
      excerpt: "Ведущие исследователи SCE Foundation примут участие в закрытой международной конференции по изучению аномальных явлений. На конференции будут представлены новые методики содержания и исследования объектов класса Кетер.",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "Обновление протоколов безопасности",
      date: "2 сентября 2023",
      category: "Безопасность",
      excerpt: "В связи с инцидентом [ДАННЫЕ УДАЛЕНЫ] SCE Foundation вводит обновленные протоколы безопасности для работы с объектами класса Евклид и Кетер. Всем сотрудникам необходимо пройти инструктаж до 10 сентября.",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "Новые методы анализа аномальных свойств",
      date: "25 августа 2023",
      category: "Технологии",
      excerpt: "Исследовательский отдел SCE Foundation разработал новые методы анализа аномальных свойств объектов. Новая технология позволяет с большей точностью определять потенциальную опасность и механизмы действия аномалий.",
      image: "/placeholder.svg"
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'инфраструктура':
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case 'персонал':
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case 'исследования':
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case 'события':
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case 'безопасность':
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case 'технологии':
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="sce-container py-8">
          <h1 className="font-scp-bauhaus text-4xl mb-4">
            <span className="text-sce-red">Новости</span> SCE Foundation
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Последние события, исследования и открытия в мире аномальных явлений
          </p>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Поиск по заголовку или содержанию..." 
                className="pl-10 bg-white dark:bg-gray-800"
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800">
                  <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все категории</SelectItem>
                  <SelectItem value="infrastructure">Инфраструктура</SelectItem>
                  <SelectItem value="personnel">Персонал</SelectItem>
                  <SelectItem value="research">Исследования</SelectItem>
                  <SelectItem value="events">События</SelectItem>
                  <SelectItem value="security">Безопасность</SelectItem>
                  <SelectItem value="technology">Технологии</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="bg-white dark:bg-gray-800">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Архив
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="sce-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              {news.map(item => (
                <div key={item.id} className="sce-paper overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <div className="aspect-w-16 aspect-h-9 md:aspect-h-full md:h-full">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </div>
                    <div className="p-6 md:w-2/3">
                      <div className="flex items-center text-sm mb-2">
                        <span className="text-gray-500 dark:text-gray-400 flex items-center">
                          <CalendarIcon className="h-4 w-4 mr-1" />
                          {item.date}
                        </span>
                        <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                        <span className={`px-2 py-1 ${getCategoryColor(item.category)} text-xs font-medium rounded`}>
                          {item.category}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold mb-3">{item.title}</h2>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {item.excerpt}
                      </p>
                      <Link to={`/news/${item.id}`}>
                        <Button className="bg-sce-red hover:bg-red-700 text-white">
                          Читать далее
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              <div className="flex gap-1">
                <Button variant="outline" className="bg-white dark:bg-gray-800" disabled>
                  Предыдущая
                </Button>
                <Button variant="outline" className="bg-white dark:bg-gray-800 hover:bg-sce-red hover:text-white">
                  1
                </Button>
                <Button variant="outline" className="bg-white dark:bg-gray-800">
                  2
                </Button>
                <Button variant="outline" className="bg-white dark:bg-gray-800">
                  3
                </Button>
                <Button variant="outline" className="bg-white dark:bg-gray-800">
                  Следующая
                </Button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sce-paper p-6 mb-6">
              <h3 className="font-scp-bauhaus text-xl mb-4">Категории</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Инфраструктура</span>
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Персонал</span>
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Исследования</span>
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>События</span>
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Безопасность</span>
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">6</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Технологии</span>
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">7</span>
                </div>
              </div>
            </div>
            
            <div className="sce-paper p-6 mb-6">
              <h3 className="font-scp-bauhaus text-xl mb-4">Архив</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Октябрь 2023</span>
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Сентябрь 2023</span>
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Август 2023</span>
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">9</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Июль 2023</span>
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">11</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Июнь 2023</span>
                  <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">8</span>
                </div>
              </div>
            </div>
            
            <div className="sce-paper p-6">
              <h3 className="font-scp-bauhaus text-xl mb-4">Подписка на новости</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Получайте последние новости SCE Foundation на вашу электронную почту
              </p>
              <div className="space-y-4">
                <Input placeholder="Ваш email" />
                <Button className="w-full bg-sce-red hover:bg-red-700 text-white">
                  Подписаться
                </Button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Нажимая кнопку "Подписаться", вы соглашаетесь с нашей политикой конфиденциальности и правилами обработки данных.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}