'use client';

import axios from "axios";
import { signIn, useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";

import Input from "@/app/components/inputs/Input";
import AuthSocialButton from './AuthSocialButton';
import Button from "@/app/components/Button";
import { toast } from "react-hot-toast";

type Variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {

    const session = useSession();
    const router = useRouter();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/profiles')
        }
    }, [session?.status, router]);

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === 'REGISTER') {
            axios.post('/api/register', data)
                .then(() => signIn('credentials', {
                    ...data,
                    redirect: false,
                }))
                .then((callback) => {
                    if (callback?.error) {
                        toast.error('Invalid credentials!');
                    }

                    if (callback?.ok) {
                        router.push('/profiles')
                    }
                })
                .catch(() => toast.error('Something went wrong!'))
                .finally(() => setIsLoading(false))
        }

        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error('Invalid credentials!');
                    }

                    if (callback?.ok && !callback.error) {
                        router.push('/profiles')
                    }
                })
                .finally(() => setIsLoading(false))
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error('Invalid credentials!');
                }

                if (callback?.ok && !callback.error) {
                    console.log("Hey");
                    
                    router.push('/profiles');
                }
            })
            .finally(() => setIsLoading(false));
    }

    return (
        <div className="flex justify-center">
            <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                <h2 className="text-white text-4xl mb-8 font-semibold">
                    {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                </h2>
                <div className="space-y-6">
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <div className="flex flex-col gap-4">
                            {variant === 'REGISTER' && (
                                <Input
                                    disabled={isLoading}
                                    register={register}
                                    errors={errors}
                                    required
                                    id="name"
                                    label="Name"
                                />
                            )}
                            <Input
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                                id="email"
                                label="Email address"
                                type="email"
                            />
                            <Input
                                disabled={isLoading}
                                register={register}
                                errors={errors}
                                required
                                id="password"
                                label="Password"
                                type="password"
                            />
                        </div>
                        <Button
                            disabled={isLoading}
                            fullWidth
                            type="submit"
                            definedClassName="
                            bg-red-600 
                            py-3 
                            text-white 
                            rounded-md 
                            w-full 
                            mt-10 
                            hover:bg-red-700 
                            transition
                        "
                        >
                            {variant === 'LOGIN' ? 'Sign in' : 'Register'}
                        </Button>
                    </form>
                </div>
                <div className="flex flex-row items-center gap-4 mt-8 justify-center">

                    <AuthSocialButton
                        icon={FcGoogle}
                        onClick={() => socialAction('google')}
                    />
                    <AuthSocialButton
                        icon={FaGithub}
                        onClick={() => socialAction('github')}
                    />
                </div>
                <p className="text-neutral-500 mt-12">
                    {variant === 'LOGIN' ? 'New to Netflix?' : 'Already have an account?'}
                    <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                        {variant === 'LOGIN' ? 'Sign up now.' : 'Login'}
                    </span>
                    .
                </p>
            </div>
        </div>
    );
}

export default AuthForm;