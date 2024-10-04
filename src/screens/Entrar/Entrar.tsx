import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const slideInAnimation = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: [10, 0],
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  },
  exit: { y: -50, opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }
};

const schema = yup.object({
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup.string().required('Senha é obrigatória')
});

const Entrar: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    navigate('/');
    console.log('🚀 ~ onSubmit ~ data:', data);
  };

  return (
    <div className="relative flex gap-10 items-center justify-center min-h-screen">
      <div className="rounded-3xl bg-black hidden flex-1 items-end justify-center h-[calc(100vh-2rem)] mx-[1.5rem] pb-16 bg-[url('/bg.svg')] md:flex">
        <div className="flex flex-col gap-4 items-center">
          <img src="/logo-bg-dark.svg" alt="Logo do boestudar" className="h-12" />
          <p className="text-white font-medium w-8/12 text-center">
            Bora estudar na melhor plataforma de estudos para o ENEM
          </p>
        </div>
      </div>
      <div className="flex-1 h-[calc(100vh-2rem)] mx-[1.5rem]">
        <div className="w-full h-full flex flex-col  items-center justify-right">
          <div className="w-full flex items-center justify-end mt-6 gap-2">
            <p className="text-sm font-medium text-gray-600">Não possui uma conta?</p>
            <a href="/cadastro">
              <Button className="text-sm font-medium">Cadastre-se</Button>
            </a>
          </div>
          <AnimatePresence>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={slideInAnimation}
              className="w-full h-full flex flex-col items-center justify-center sm:w-5/12 md:w-10/12 lg:w-5/12"
            >
              <div className="p-4 w-full h-full flex flex-col items-center justify-center">
                <div className="pb-4 w-full">
                  <h1 className="text-2xl font-bold">Entrar</h1>
                </div>
                <div className="w-full">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col mb-5">
                      <div className="mb-3">
                        <Input
                          placeholder="E-mail"
                          type="email"
                          {...register('email')}
                          className="mb-1"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm w-full">{errors.email.message}</p>
                        )}
                      </div>
                      <div>
                        <Input
                          placeholder="Senha"
                          type={showPassword ? 'text' : 'password'}
                          {...register('password')}
                          className="mb-1"
                          action={
                            !showPassword ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Eye
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="cursor-pointer text-gray-500 h-5 w-5"
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Mostrar senha</p>
                                </TooltipContent>
                              </Tooltip>
                            ) : (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <EyeOff
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="cursor-pointer text-gray-500 h-5 w-5"
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Esconder senha</p>
                                </TooltipContent>
                              </Tooltip>
                            )
                          }
                        />
                        {errors.password && (
                          <p className="text-red-500 text-sm w-full">{errors.password.message}</p>
                        )}
                      </div>
                    </div>
                    <Button size="lg" className="w-full h-12" type="submit">
                      Entrar
                    </Button>
                  </form>
                </div>
                <p className="text-sm font-medium text-gray-500 mt-4">© 2024 boestudar</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Entrar;
