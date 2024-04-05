'use client';

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";

interface SettingModalProps {
    isOpen?: boolean;
    onClose: () => void;
    currentUser: User;
}

const SettingModal: React.FC<SettingModalProps> = ({
    isOpen,
    onClose,
    currentUser
}) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name,
            image: currentUser?.image
        }
    });

    const image = watch('image');

    const handleUpload = (result: any) => {
        setValue('image', result?.info?.secure_url,{
            shouldValidate: true
        });
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/settings', data)
            .then(() => {
                router.refresh();
                onClose();
            })
            .catch(() => toast.error('Xảy ra lỗi!'))
            .finally(() => setIsLoading(false))
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                            Tài khoản
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Chỉnh sửa thông tin công khai.
                        </p>
                        <div className="
                            mt-10
                            flex
                            flex-col
                            gap-y-8
                        ">
                            <Input
                                disabled={isLoading}
                                label="Tên"
                                id="name"
                                errors={errors}
                                required
                                register={register}
                            />
                            <div className="">
                                <label
                                    className="
                                        block
                                        text-sm
                                        font-medium
                                        leading-6
                                        text-gray-900
                                    "
                                >
                                    Hình ảnh
                                </label>
                                <div className="
                                    mt-2
                                    flex
                                    items-center
                                    gap-x-3
                                ">
                                    <Image 
                                        sizes="48"
                                        width="48"
                                        height="48"
                                        className="rounded-full"
                                        src={image || currentUser?.image  || '/images/placeholder.jpg'}
                                        alt="Ảnh đại diện"
                                    />
                                    <CldUploadButton
                                        options={{ maxFiles: 1 }}
                                        onUpload={handleUpload}
                                        uploadPreset="nadtqdkk"
                                    >
                                        <Button
                                            disabled={isLoading}
                                            secondary
                                            type="button"
                                        >
                                            Thay đổi
                                        </Button>
                                    </CldUploadButton>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Button
                            disabled={isLoading}
                            secondary
                            onClick={onClose}
                        >
                            Hủy
                        </Button>
                        <Button
                            disabled={isLoading}
                            type="submit"
                        >
                            Lưu
                        </Button>
                    </div>
                </div>
            </form>
        </Modal>
    )
}

export default SettingModal;