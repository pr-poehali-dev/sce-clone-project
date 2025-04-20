import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/lib/authContext";
import { AlertCircle, Info } from "lucide-react";

const registerSchema = z.object({
  username: z.string()
    .min(3, "Имя пользователя должно содержать минимум 3 символа")
    .max(20, "Имя пользователя не должно превышать 20 символов")
    .regex(/^[a-zA-Z0-9_-]+$/, "Имя пользователя может содержать только латинские буквы, цифры, - и _"),
  email: z.string().email("Введите корректный email адрес"),
  password: z.string()
    .min(8, "Пароль должен содержать минимум 8 символов")
    .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
    .regex(/[a-z]/, "Пароль должен содержать хотя бы одну строчную букву")
    .regex(/[0-9]/, "Пароль должен содержать хотя бы одну цифру"),
  confirmPassword: z.string(),
  captcha: z.string().min(1, "Пожалуйста, заполните капчу"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      captcha: "",
    },
  });

  async function onSubmit(values: RegisterValues) {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      // Проверка капчи будет здесь в реальном приложении
      await register(values.username, values.email, values.password);
      setSuccess("Регистрация успешна! На ваш email было отправлено письмо для подтверждения.");
      // Если нужно автоматически переходить на другую страницу после успешной регистрации
      // setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Произошла ошибка при регистрации. Пожалуйста, попробуйте снова.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <MainLayout>
      <div className="sce-container py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-scp-bauhaus text-3xl mb-2">
              <span className="text-sce-red">Регистрация</span> в системе
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Создайте аккаунт для доступа к ресурсам SCE Foundation
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-6 bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800">
              <Info className="h-4 w-4" />
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="sce-paper p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Имя пользователя</FormLabel>
                      <FormControl>
                        <Input placeholder="Введите имя пользователя" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Введите email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Введите пароль" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Подтверждение пароля</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Повторите пароль" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Имитация поля капчи - в реальном приложении будет использоваться настоящая капча */}
                <FormField
                  control={form.control}
                  name="captcha"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Капча</FormLabel>
                      <div className="mb-2 bg-gray-100 dark:bg-gray-800 p-4 text-center">
                        <span className="font-mono text-lg tracking-widest">A7X9CF</span>
                      </div>
                      <FormControl>
                        <Input placeholder="Введите код с изображения" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-sce-red hover:bg-red-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Регистрация..." : "Зарегистрироваться"}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Уже есть аккаунт? </span>
                  <Link to="/login" className="text-sce-red hover:underline">
                    Войти
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}