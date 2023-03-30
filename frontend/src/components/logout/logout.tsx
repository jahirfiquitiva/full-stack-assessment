import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../hooks/use-local-storage';

export const LogOut = () => {
  const navigate = useNavigate();
  const [, setUser] = useLocalStorage('user');

  return (
    <button
      style={{
        alignSelf: 'flex-end',
        backgroundColor: 'var(--nc-err-2)',
      }}
      onClick={() => {
        if (confirm('Are you sure you want to log out?')) {
          setUser();
          navigate(0);
        }
      }}
    >
      Log out
    </button>
  );
};
