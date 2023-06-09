import { Form, Field } from 'houseform';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useLocalStorage } from '../../hooks/use-local-storage';
import type { BackendResponse } from '../../types/backend-response';
import styles from './login.module.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const Login = () => {
  const navigate = useNavigate();
  const [, setUser] = useLocalStorage('user');

  return (
    <Form<{ username: string }>
      onSubmit={(values, form) => {
        fetch(`${BACKEND_URL}/api/user`, {
          method: 'POST',
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((data: BackendResponse<{ username: string }>) => {
            if (data.ok) {
              setUser(data.data.username);
              toast.success(`Welcome, ${values.username}!`);
              navigate('/websites');
            } else {
              toast.error(
                Array.isArray(data.errors)
                  ? data.errors.join('\n')
                  : data.errors,
              );
              form.setIsSubmitted(false);
            }
          })
          .catch((error) => {
            toast.error(error.message || 'Unexpected error');
            form.setIsSubmitted(false);
          });
      }}
    >
      {({ submit, isSubmitted, isValidating }) => (
        <form
          className={styles.formContainer}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Field<string>
            name="username"
            initialValue={''}
            onBlurValidate={z
              .string()
              .min(1, 'This field is required')
              .toLowerCase()}
          >
            {({ value, setValue, onBlur, errors }) => (
              <div className={styles.formField}>
                <label htmlFor={'username'}>Username</label>
                <input
                  placeholder={'fulanito'}
                  name={'username'}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onBlur={onBlur}
                  required
                />
                <ul className={styles.errorsList}>
                  {errors.map((error, index) => (
                    <li key={`error-${index}`}>
                      <small>{error}</small>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Field>
          <button onClick={submit} disabled={isSubmitted || isValidating}>
            Login
          </button>
        </form>
      )}
    </Form>
  );
};
