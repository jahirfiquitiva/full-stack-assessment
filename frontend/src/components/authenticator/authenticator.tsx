import { type PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/use-local-storage';

const Authenticator = (props: PropsWithChildren) => {
  const [userId] = useLocalStorage<string | undefined>('user');
  const navigate = useNavigate();

  useEffect(() => {
    const { pathname } = window.location;
    if (!userId && pathname !== '/') navigate('/');
  }, [userId]);

  return <>{props.children}</>;
};

export const withAuthenticator = (children: PropsWithChildren['children']) => (
  <Authenticator>{children}</Authenticator>
);
