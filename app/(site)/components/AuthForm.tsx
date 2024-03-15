'use client'


import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useState } from "react";
import {useForm, SubmitHandler , FieldValues} from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";

import { signIn, useSession } from "next-auth/react";

type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = () => {
    const session = useSession();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState(false);

    const toggleVariant = useCallback(() => {
        if(variant === 'LOGIN'){
            setVariant('REGISTER');
        } else{
            setVariant('LOGIN')
        }
    }, [variant])

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) =>{
        setIsLoading(true);

        if(variant === 'REGISTER'){
            axios.post("/api/register", data)
                .catch(() => toast.error('Có gì đó không đúng!'))
                .finally(() => setIsLoading(false))
        }

        if(variant === 'LOGIN'){
            signIn('credentials',{
                ...data,
                redirect: false
            })
                .then( (callback) => {
                    if (callback?.error) {
                        toast.error('Không hợp lệ!')
                    }

                    if(callback?.ok && !callback?.error){
                        toast.success('Đăng nhập thành công!')
                    }
                })
                .finally(() => {
                    setIsLoading(false)
                })
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action, {redirect: false})
            .then( (callback) => {
                if (callback?.error) {
                    toast.error('Không hợp lệ!')
                }

                if(callback?.ok && !callback?.error){
                    toast.success('Đăng nhập thành công!')
                }
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return ( 
        <div
            className="
                mt-8
                sm:mx-auto
                sm:w-full
                sm:max-w-md
            "    
        >
            <div
                className="
                    bg-white
                    px-4
                    py-8
                    shadow
                    sm-rounded-lg
                    sm:px-10
                "
            >
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)} 
                >
                    { variant === "REGISTER" && (
                        <Input 
                            id="name" 
                            label="Họ và tên" 
                            register={register} 
                            errors = {errors}
                            disabled={isLoading}
                        />
                    )}
                    <Input 
                        id="email" 
                        label="Địa chỉ email" 
                        type="email"
                        register={register} 
                        errors = {errors}
                        disabled={isLoading}
                    />
                    <Input 
                        id="password" 
                        label="Mật khẩu" 
                        type="password"
                        register={register} 
                        errors = {errors}
                        disabled={isLoading}
                    />
                    <Button
                        disabled={isLoading}
                        fullWitd
                        type="submit"
                    >
                        { variant === "LOGIN" ? 'Đăng nhập' : 'Đăng ký'}
                    </Button>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div 
                            className="
                                absolute
                                inset-0
                                flex
                                items-center
                            "
                        >
                            <div 
                                className="
                                    w-full
                                    border-t
                                    border-gray-300
                                "
                            >
                            </div>
                        </div>
                        <div 
                            className="
                                relative 
                                flex 
                                justify-center 
                                text-sm
                            "
                        >
                            <span 
                                className="
                                bg-white 
                                px-2 
                                text-gray-500
                                "
                            >
                                Hoặc tiếp tục với
                            </span>
                        </div>
                    </div>
                    
                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={()=> socialAction('github')}
                        />
                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={()=> socialAction('google')}
                        />
                    </div>
                </div>

                <div className="
                    flex
                    gap-2
                    justify-center
                    text-sm
                    mt-6
                    px-2
                    text-gray-500
                ">
                    <div>
                        {variant === 'LOGIN' ? 'Chưa có tài khoản?': "Đã có tài khoản"}
                    </div>
                    <div
                        onClick={toggleVariant}
                        className="underline cursor-pointer"
                    >
                        { variant === 'LOGIN' ? 'Đăng ký' : 'Đăng nhập'}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default AuthForm;