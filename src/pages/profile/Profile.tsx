import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/lib/authContext";
import { UserRole } from "@/types";
import { LockIcon, ShieldIcon, FileIcon, SettingsIcon } from "lucide-react";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const { isAuthenticated, user, hasPermission } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const getRoleDisplay = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return { name: "Администратор", description: "Полный доступ к управлению контентом и модерации", icon: <ShieldIcon className="h-5 w-5 text-sce-red" /> };
      case UserRole.RESEARCHER:
        return { name: "Исследователь", description: "Создание и редактирование SCE-объектов", icon: <FileIcon className="h-5 w-5 text-yellow-500" /> };
      case UserRole.STAFF:
        return { name: "Персонал", description: "Ограниченный доступ к контенту", icon: <LockIcon className="h-5 w-5 text-blue-500" /> };
      case UserRole.READER:
        return { name: "Читатель", description: "Доступ только для чтения", icon: <FileIcon className="h-5 w-5 text-gray-500" /> };
      default:
        return { name: "Неизвестно", description: "Роль не определена", icon: <SettingsIcon className="h-5 w-5" /> };
    }
  };

  const roleInfo = getRoleDisplay(user?.role || UserRole.READER);

  return (
    <MainLayout>
      <div className="sce-container py-8">
        <h1 className="font-scp-bauhaus text-3xl mb-6">
          Профиль <span className="text-sce-red">сотрудника</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="sce-paper">
              <CardHeader>
                <div className="flex justify-center">
                  <div className="relative w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-4xl">{user?.username?.charAt(0).toUpperCase()}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <h2 className="text-xl font-bold">{user?.username}</h2>
                  <div className="flex items-center justify-center mt-2">
                    {roleInfo.icon}
                    <span className="ml-2">{roleInfo.name}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{roleInfo.description}</p>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Email:</span>
                    <span className="font-medium">{user?.email}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Дата регистрации:</span>
                    <span className="font-medium">04.05.2023</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Статус:</span>
                    <span className="font-medium text-green-500">Активен</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Редактировать профиль</Button>
              </CardFooter>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="activity">Активность</TabsTrigger>
                <TabsTrigger value="objects">Объекты</TabsTrigger>
                <TabsTrigger value="security">Безопасность</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activity">
                <Card className="sce-paper">
                  <CardHeader>
                    <CardTitle>Активность</CardTitle>
                    <CardDescription>История ваших действий в системе</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-4 items-start border-b border-gray-200 dark:border-gray-700 pb-4">
                        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                          <FileIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Просмотр объекта SCE-003</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Сегодня, 14:32</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start border-b border-gray-200 dark:border-gray-700 pb-4">
                        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                          <FileIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Просмотр объекта SCE-001</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Сегодня, 14:15</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                          <LockIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium">Вход в систему</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Сегодня, 14:00</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="objects">
                <Card className="sce-paper">
                  <CardHeader>
                    <CardTitle>Мои объекты</CardTitle>
                    <CardDescription>Объекты SCE созданные или отредактированные вами</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {hasPermission(UserRole.RESEARCHER) ? (
                      <div className="space-y-4">
                        <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                          <div className="flex justify-between items-center">
                            <h3 className="font-scp-bauhaus text-xl">SCE-007</h3>
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs font-medium rounded">
                              Евклид
                            </span>
                          </div>
                          <h4 className="font-bold my-2">Меняющий полярность</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                            Создан: 27.04.2023 | Обновлен: 30.04.2023
                          </p>
                          <Button variant="outline" size="sm">Редактировать</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">
                          У вас нет прав для создания объектов SCE. 
                          Для получения статуса исследователя, пожалуйста, свяжитесь с администрацией.
                        </p>
                      </div>
                    )}
                  </CardContent>
                  {hasPermission(UserRole.RESEARCHER) && (
                    <CardFooter>
                      <Button className="w-full bg-sce-red hover:bg-red-700">Создать новый объект</Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>
              
              <TabsContent value="security">
                <Card className="sce-paper">
                  <CardHeader>
                    <CardTitle>Безопасность</CardTitle>
                    <CardDescription>Управление параметрами безопасности вашего аккаунта</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Смена пароля</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Рекомендуется менять пароль каждые 3 месяца. Последнее изменение: 04.05.2023
                      </p>
                      <Button variant="outline" size="sm">Изменить пароль</Button>
                    </div>
                    
                    <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="font-medium">Двухфакторная аутентификация</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Включите двухфакторную аутентификацию для дополнительной защиты вашего аккаунта.
                      </p>
                      <Button variant="outline" size="sm">Настроить 2FA</Button>
                    </div>
                    
                    <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="font-medium">Активные сессии</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Вы можете просмотреть список всех устройств, с которых выполнен вход в ваш аккаунт.
                      </p>
                      <Button variant="outline" size="sm">Управление сессиями</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}