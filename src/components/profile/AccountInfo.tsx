import {useSession} from "next-auth/react";
import Image from "next/image";

export const AccountInfo = () => {
  const { data: session } = useSession();
  
  return (
    <div className="flex flex-col items-center pt-20 min-h-screen gap-2 rounded-lg bg-white p-2">
      {session ?
        <div className="text-center flex flex-col items-center">
          <Image
            priority
            src={session?.user?.image}
            alt={'logo'}
            width={120}
            height={120}
            className={"rounded-full"}
          />
          
          <h1>{session?.user?.id}</h1>
          <h1>{session?.user?.name}</h1>
          <h1>{session?.user?.email}</h1>
        </div> :
        'asd'
      }
    </div>
  );
};
