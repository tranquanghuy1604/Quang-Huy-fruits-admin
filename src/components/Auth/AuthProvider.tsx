import { routerConstants } from '@/constants/router.constant';
import { loggedState } from '@/recoil/common.recoil';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [logged, setLogged] = useRecoilState(loggedState);

  useEffect(() => {
    if (!logged) {
      router.push(routerConstants.login);
      return;
    }
  }, [logged]);

  return <>{children}</>;
}
