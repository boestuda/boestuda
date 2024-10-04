import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório')
});

const Entrar: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    console.log('🚀 ~ onSubmit ~ data:', data);
  };

  return (
    <div className="relative flex gap-10 items-center justify-center min-h-screen">
      <div className="rounded-3xl bg-black hidden flex-1 items-end justify-center h-[calc(100vh-2rem)] mx-[1.5rem] pb-16 bg-[url('/bg.svg')] md:flex">
        <div className="flex flex-col gap-4 items-center">
          <img src="/logo-bg-dark.svg" alt="Logo do boestudar" className="h-12" />
          <p className="text-white font-medium w-7/12 text-center">
            Bora estudar na melhor plataforma de estudos para vestibular
          </p>
        </div>
      </div>
      <div className="flex-1 h-[calc(100vh-2rem)] mx-[1.5rem]">
        <div className="w-full h-full flex flex-col items-center justify-right">
          <div className="w-full flex items-center justify-end mt-6 gap-2">
            <p className="text-sm font-medium text-gray-600">Já possui uma conta?</p>
            <a href="/entrar">
              <Button className="text-sm font-medium">Entrar</Button>
            </a>
          </div>
          <div className="p-4 w-full h-full flex flex-col items-center justify-center sm:w-5/12 md:w-10/12 lg:w-5/12">
            <div className="pb-4 w-full">
              <h1 className="text-2xl font-bold">Cadastro</h1>
            </div>
            <div className="w-full">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col mb-5">
                  <div className="mb-3">
                    <Input placeholder="Nome" type="email" {...register('email')} />
                    {errors.email && (
                      <p className="text-red-500 text-sm w-full">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <Input placeholder="E-mail" type="email" {...register('email')} />
                    {errors.email && (
                      <p className="text-red-500 text-sm w-full">{errors.email.message}</p>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 lg:flex-row">
                    <div className="w-full">
                      <Input placeholder="Senha" type="password" {...register('password')} />
                      {errors.password && (
                        <p className="text-red-500 text-sm w-full">{errors.password.message}</p>
                      )}
                    </div>
                    <div className="w-full">
                      <Input
                        placeholder="Repita a senha"
                        type="password"
                        {...register('password')}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm w-full">{errors.password.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </form>
              <Button size="lg" className="w-full h-12">
                Cadastrar
              </Button>
            </div>
            <p className="text-sm font-medium text-gray-500 mt-4">© 2024 boestudar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entrar;
