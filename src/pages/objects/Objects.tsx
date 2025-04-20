import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router-dom";
import { SearchIcon, FilterIcon } from "lucide-react";

export default function Objects() {
  // Мок-данные для объектов SCE
  const objects = [
    {
      id: "sce-001",
      name: "Куб преломления",
      class: "Кетер",
      classColor: "red",
      description: "Объект SCE-001 представляет собой куб из неизвестного материала размером 10×10×10 см. При наблюдении преломляет свет таким образом, что создаёт искажение пространства вокруг себя..."
    },
    {
      id: "sce-002",
      name: "Бесконечный блокнот",
      class: "Евклид",
      classColor: "yellow",
      description: "Объект SCE-002 выглядит как обычный спиральный блокнот в мягкой обложке. Несмотря на то, что блокнот содержит только 50 страниц, последняя страница никогда не может быть достигнута..."
    },
    {
      id: "sce-003",
      name: "Шепчущий камень",
      class: "Безопасный",
      classColor: "green",
      description: "Объект SCE-003 - овальный камень размером с человеческую ладонь, серого цвета с зелеными вкраплениями. При прикосновении к нему субъект слышит шепот на различных языках, включая давно вымершие..."
    },
    {
      id: "sce-004",
      name: "Часы обратного отсчёта",
      class: "Евклид",
      classColor: "yellow",
      description: "Объект SCE-004 представляет собой карманные часы XIX века, которые отсчитывают время в обратном направлении. Когда часы достигают нуля, происходит временная аномалия в радиусе 5 метров..."
    },
    {
      id: "sce-005",
      name: "Мигрирующая дверь",
      class: "Кетер",
      classColor: "red",
      description: "Объект SCE-005 является деревянной дверью, которая случайным образом появляется в различных зданиях по всему миру. Дверь ведет в иное измерение, описываемое субъектами как «бесконечный коридор»..."
    },
    {
      id: "sce-006",
      name: "Самозаполняющийся дневник",
      class: "Безопасный",
      classColor: "green",
      description: "Объект SCE-006 - дневник в кожаном переплёте, который заполняется сам собой, описывая события из жизни своего текущего владельца, включая события, которые ещё не произошли..."
    }
  ];

  const getClassBadgeColor = (classType: string) => {
    switch (classType.toLowerCase()) {
      case 'кетер':
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case 'евклид':
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case 'безопасный':
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <MainLayout>
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="sce-container py-8">
          <h1 className="font-scp-bauhaus text-4xl mb-4">
            Архив <span className="text-sce-red">объектов SCE</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            База данных аномальных объектов под наблюдением и контролем SCE Foundation
          </p>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                placeholder="Поиск по ID, названию или описанию..." 
                className="pl-10 bg-white dark:bg-gray-800"
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800">
                  <SelectValue placeholder="Класс объекта" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все классы</SelectItem>
                  <SelectItem value="keter">Кетер</SelectItem>
                  <SelectItem value="euclid">Евклид</SelectItem>
                  <SelectItem value="safe">Безопасный</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="bg-white dark:bg-gray-800">
                <FilterIcon className="h-4 w-4 mr-2" />
                Фильтры
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="sce-container py-8">
        <Tabs defaultValue="grid" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Найдено: {objects.length} объектов
            </div>
            <TabsList>
              <TabsTrigger value="grid">Сетка</TabsTrigger>
              <TabsTrigger value="list">Список</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="grid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {objects.map(object => (
                <div key={object.id} className="sce-paper p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-scp-bauhaus text-xl">{object.id.toUpperCase()}</h3>
                    <span className={`px-2 py-1 ${getClassBadgeColor(object.class)} text-xs font-medium rounded`}>
                      Класс: {object.class}
                    </span>
                  </div>
                  <h4 className="font-bold mb-3">{object.name}</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                    {object.description}
                  </p>
                  <Link to={`/objects/${object.id}`}>
                    <Button variant="link" className="text-sce-red p-0 h-auto">
                      Читать полностью
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="list">
            <div className="sce-paper overflow-hidden">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {objects.map(object => (
                  <div key={object.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-2">
                          <h3 className="font-scp-bauhaus text-lg">{object.id.toUpperCase()}</h3>
                          <span className={`px-2 py-1 ${getClassBadgeColor(object.class)} text-xs font-medium rounded`}>
                            {object.class}
                          </span>
                        </div>
                        <h4 className="font-bold mt-1">{object.name}</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 sm:line-clamp-1 md:line-clamp-2">
                          {object.description}
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <Link to={`/objects/${object.id}`}>
                          <Button variant="outline">Подробнее</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
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
    </MainLayout>
  );
}