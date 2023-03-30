import { Form, Field } from 'houseform';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useLocalStorage } from '../../hooks/use-local-storage';
import type { BackendResponse } from '../../types/backend-response';
import styles from './../login/login.module.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const WebsiteForm = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [username] = useLocalStorage('user');

  const submitWebsite = useCallback((websiteUrl: string) => {
    setSubmitting(true);

    toast.loading(`Processing website ("${websiteUrl}")`, { id: 'website' });
    fetch(`${BACKEND_URL}/api/website`, {
      method: 'POST',
      body: JSON.stringify({ url: websiteUrl, username }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data: BackendResponse<{ id: string }>) => {
        if (data.ok) {
          toast.success('Website processed!', { id: 'website' });
          navigate(0);
        } else {
          toast.error(
            Array.isArray(data.errors) ? data.errors.join('\n') : data.errors,
            { id: 'website' },
          );
        }
        setSubmitting(false);
      })
      .catch((error) => {
        toast.error(error.message || 'Unexpected error', { id: 'website' });
        setSubmitting(false);
      });
  }, []);

  return (
    <Form<{ website: string }>
      onSubmit={(values) => {
        submitWebsite(values.website);
      }}
    >
      {({ submit, isValidating }) => (
        <form
          className={styles.formContainer}
          style={{ maxWidth: '100%' }}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Field<string>
            name="website"
            initialValue={''}
            onSubmitValidate={z.string().min(1, 'This field is required')}
          >
            {({ value, setValue, onBlur, errors }) => (
              <div className={styles.formField}>
                <label htmlFor={'website'}>Website URL</label>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <input
                    placeholder={'https://google.com'}
                    name={'website'}
                    type={'url'}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={onBlur}
                    required
                    style={{ margin: 0 }}
                  />
                  <button
                    onClick={submit}
                    disabled={submitting || isValidating}
                  >
                    Scrape
                  </button>
                </div>
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
        </form>
      )}
    </Form>
  );
};
