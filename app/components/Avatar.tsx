'use client'

import { User } from "@prisma/client";
import Image from "next/image";
import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
    user?: User
}

const Avatar : React.FC<AvatarProps> = ({
    user
}) => {
    const { members } = useActiveList();
    const isActive = members.indexOf(user?.email!) !== -1;

    return ( 
        <div className="relative">
            <div 
                className="
                    relative
                    inline-block
                    rounded-full
                    overflow-hidden
                    size-9
                    md:size-11
                "
            >
                <Image 
                    alt="Ảnh đại diện"
                    src={user?.image || '/images/placeholder.jpg'}
                    fill
                />
            </div>
            {isActive && (
                <span 
                className="
                    absolute
                    block
                    rounded-full
                    bg-green-500
                    ring-2
                    ring-white
                    top-0
                    right-0
                    h-2
                    w-2
                    md:h-3
                    md:w-3
                "
            />
            )}
            
        </div>
     );
}
 
export default Avatar;