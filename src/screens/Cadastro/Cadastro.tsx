import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Eye, EyeOff, Star } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

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

const Entrar: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [step, setStep] = useState(1);

  const schema = yup.object({
    name: yup.string().when('$step', {
      is: 1,
      then: (schema) => schema.required('Nome é obrigatório'),
      otherwise: (schema) => schema.nullable()
    }),
    email: yup.string().when('$step', {
      is: 1,
      then: (schema) => schema.email('E-mail inválido').required('E-mail é obrigatório'),
      otherwise: (schema) => schema.nullable()
    }),
    password: yup.string().when('$step', {
      is: 1,
      then: (schema: yup.StringSchema) =>
        schema.required('Senha é obrigatória').min(6, 'A senha deve ter no mínimo 6 caracteres'),
      otherwise: (schema: yup.StringSchema) => schema.nullable()
    }),
    confirm_password: yup.string().when('$step', {
      is: 1,
      then: (schema: yup.StringSchema) =>
        schema
          .oneOf([yup.ref('password'), ''], 'As senhas devem ser iguais')
          .required('A confirmação da senha é obrigatória'),
      otherwise: (schema: yup.StringSchema) => schema.nullable()
    }),
    school: yup.string().when('$step', {
      is: 2,
      then: (schema) => schema.required('Curso é obrigatório'),
      otherwise: (schema) => schema.nullable()
    }),
    school_level: yup.string().when('$step', {
      is: 2,
      then: (schema) => schema.required('Nível de escolaridade é obrigatório'),
      otherwise: (schema) => schema.nullable()
    })
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({ context: { step }, resolver: yupResolver(schema) });

  const onSubmit = async (data: {
    name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
    school?: string;
    school_level?: string;
  }) => {
    if (step === 1) {
      return setStep(2);
    }
    console.log('🚀 ~ onSubmit ~ data:', data);
    return setStep(3);
  };

  const handleSelectChange = (
    name: 'name' | 'email' | 'password' | 'confirm_password' | 'school' | 'school_level',
    value: string
  ) => {
    setValue(name, value);
  };

  return (
    <div className="relative flex gap-10 items-center justify-center min-h-screen">
      <div className="rounded-3xl bg-black hidden flex-1 items-end justify-center h-[calc(100vh-2rem)] mx-[1.5rem] pb-16 bg-[url('/bg.svg')] md:flex">
        <div className="flex flex-col gap-4 items-center">
          <img src="/logo-bg-dark.svg" alt="Logo do boestudar" className="h-12" />
          <p className="text-white font-medium w-8/12 text-center">
            Cadastre-se na melhor plataforma de estudos para o ENEM
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
          {step === 1 && (
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
                    <h1 className="text-2xl font-bold">Cadastro</h1>
                  </div>
                  <div className="w-full">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex flex-col mb-5">
                        <div className="mb-3">
                          <Input placeholder="Nome" {...register('name')} className="mb-1" />
                          {errors.name && (
                            <p className="text-red-500 text-sm w-full">{errors.name.message}</p>
                          )}
                        </div>
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
                        <div className="flex flex-col gap-2 lg:flex-row">
                          <div className="w-full">
                            <Input
                              placeholder="Senha"
                              type={showPassword ? 'text' : 'password'}
                              className="mb-1"
                              action={
                                showPassword ? (
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
                              {...register('password')}
                            />
                            {errors.password && (
                              <p className="text-red-500 text-sm w-full">
                                {errors.password.message}
                              </p>
                            )}
                          </div>
                          <div className="w-full">
                            <Input
                              placeholder="Repita a senha"
                              type={showPasswordConfirm ? 'text' : 'password'}
                              className="mb-1"
                              {...register('confirm_password')}
                              action={
                                showPasswordConfirm ? (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Eye
                                        onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
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
                                        onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
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
                            {errors.confirm_password && (
                              <p className="text-red-500 text-sm w-full">
                                {errors.confirm_password.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button size="lg" className="w-full h-12" type="submit">
                        Continuar
                      </Button>
                    </form>
                  </div>
                  <p className="text-sm font-medium text-gray-500 mt-4">© 2024 boestudar</p>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {step === 2 && (
            <AnimatePresence>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideInAnimation}
                className="w-full h-full flex flex-col items-center justify-center sm:w-5/12 md:w-10/12 lg:w-5/12"
              >
                <div className="p-4 w-full h-full flex flex-col items-center justify-center">
                  <div className="pb-4 w-full flex flex-col gap-1">
                    <h1 className="text-2xl font-bold">Vamo melhorar sua experiência</h1>
                    <p className="text-base font-medium text-gray-500">
                      Responda algumas perguntas para adaptarmos a plataforma para você
                    </p>
                  </div>
                  <div className="w-full">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex flex-col mb-5">
                        <div className="mb-3">
                          <Select
                            onValueChange={(value) => handleSelectChange('school_level', value)}
                            defaultValue=""
                          >
                            <SelectTrigger className="w-full mb-1">
                              <SelectValue
                                placeholder="Qual sua escolaridade"
                                {...register('school_level')}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Ensino fundamental completo</SelectItem>
                              <SelectItem value="2">Cursando ensino médio</SelectItem>
                              <SelectItem value="3">Ensino ensino médio completo</SelectItem>
                              <SelectItem value="4">Cursando ensino superior</SelectItem>
                              <SelectItem value="5">Ensino superior completo</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.school_level && (
                            <p className="text-red-500 text-sm w-full">
                              {errors.school_level.message}
                            </p>
                          )}
                        </div>
                        <div className="mb-3">
                          <Select
                            onValueChange={(value) => handleSelectChange('school', value)}
                            defaultValue=""
                          >
                            <SelectTrigger className="w-full mb-1">
                              <SelectValue
                                placeholder="Para qual curso vai prestar?"
                                {...register('school')}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Ensino fundamental completo</SelectItem>
                              <SelectItem value="2">Cursando ensino médio</SelectItem>
                              <SelectItem value="3">Ensino ensino médio completo</SelectItem>
                              <SelectItem value="4">Cursando ensino superior</SelectItem>
                              <SelectItem value="5">Ensino superior completo</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.school && (
                            <p className="text-red-500 text-sm w-full">{errors.school.message}</p>
                          )}
                        </div>
                      </div>
                      <Button size="lg" className="w-full h-12" type="submit">
                        Continuar
                      </Button>
                    </form>
                  </div>
                  <p className="text-sm font-medium text-gray-500 mt-4">© 2024 boestudar</p>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {step === 3 && (
            <AnimatePresence>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideInAnimation}
                className="w-full h-full flex flex-col items-center justify-center sm:w-5/12 md:w-10/12 lg:w-10/12"
              >
                <div className="flex flex-col mt-5 items-center p-10 gap-4">
                  <div className="w-full flex flex-col gap-1">
                    <h1 className="text-2xl font-bold ">Escolha um plano</h1>
                    <p className="text-base font-medium text-gray-500">
                      Escolha um plano e comece a estudar!
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Card
                      className="group flex flex-col p-5 gap-2 w-full relative cursor-pointer hover:bg-black"
                      onClick={() => null}
                    >
                      <p className="font-medium text-md group-hover:text-white">Mensal</p>
                      <div className="flex gap-1 items-center">
                        <p className="font-bold text-2xl group-hover:text-white">R$ 200,00</p>
                        <p className="font-medium text-gray-500 text-base group-hover:text-white/70">
                          /mês
                        </p>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Star className="h-5 w-5 text-yellow-500" />
                      </div>
                    </Card>
                    <Card
                      className="group flex flex-col p-5 gap-2 w-full relative cursor-pointer hover:bg-black"
                      onClick={() => null}
                    >
                      <p className="font-medium text-md group-hover:text-white">Anual</p>
                      <div className="flex gap-1 items-center">
                        <p className="font-bold text-2xl group-hover:text-white">R$ 200,00</p>
                        <p className="font-medium text-gray-500 text-base group-hover:text-white/70">
                          /ano
                        </p>
                      </div>
                      <div className="absolute top-3 right-3">
                        <p className="text-xs font-medium group-hover:text-white/70">
                          Economize 17%
                        </p>
                      </div>
                    </Card>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full text-gray-600"
                    onClick={() => setStep(4)}
                  >
                    Fazer isso depois
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {step === 4 && (
            <AnimatePresence>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideInAnimation}
                className="w-full h-full flex flex-col items-center justify-center sm:w-5/12 md:w-10/12 lg:w-5/12"
              >
                <div className="flex flex-col mt-5 items-center p-10 gap-4">
                  <span className="text-6xl">🎉</span>
                  <div className="w-full flex flex-col gap-1 text-center">
                    <h1 className="text-2xl font-bold ">Parabéns</h1>
                    <p className="text-base font-medium text-gray-500">Conta criada com sucesso</p>
                  </div>
                  <Button size="lg" className="w-full h-12" onClick={() => navigate('/')}>
                    Bora estudar
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default Entrar;
