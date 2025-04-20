import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/lib/authContext";
import { AlertCircle } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(3, "Имя пользователя должно содержать минимум 3 символа"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
  remember: z.boolean().default(false),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      remember: false,
    },
  });

  async function onSubmit(values: LoginValues) {
    setIsLoading(true);
    setError(null);
    
    try {
      await login(values.username, values.password);
      navigate("/");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Произошла ошибка при входе. Пожалуйста, попробуйте снова.");
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
              <span className="text-sce-red">Вход</span> в систему
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Введите ваши учетные данные для доступа к SCE Foundation
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
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

                <div className="flex items-center justify-between">
                  <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm cursor-pointer">Запомнить меня</FormLabel>
                      </FormItem>
                    )}
                  />

                  <Link to="/reset-password" className="text-sm text-sce-red hover:underline">
                    Забыли пароль?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-sce-red hover:bg-red-700 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Вход..." : "Войти"}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Нет аккаунта? </span>
                  <Link to="/register" className="text-sce-red hover:underline">
                    Зарегистрироваться
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