import { WebsitesPaginableContext } from '../../contexts';
import { useLocalStorage } from '../../hooks/use-local-storage';
import { usePaginable, PaginableProvider } from '../../providers';
import { Loading } from '../loading/loading';
import { LogOut } from '../logout';
import { Pagination } from '../pagination';
import { Table } from '../table';
import { WebsiteForm } from '../website-form';

import type { Website } from './../../types/website';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const WebsitesContent = () => {
  const { items, loading, pagesCount, currentPage, setCurrentPage } =
    usePaginable(WebsitesPaginableContext);
  return (
    <>
      <LogOut />
      {loading ? <Loading /> : <WebsiteForm />}
      {Boolean(items?.length && !loading) && (
        <>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Total Links</th>
              </tr>
            </thead>
            <tbody>
              {items?.map((website) => {
                return (
                  <tr key={website.url}>
                    <td className={'truncate'}>
                      {website.title || website.url}
                    </td>
                    <td>{website.linksCount || 'In progress'}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Pagination
            pagesCount={pagesCount || 1}
            currentPage={currentPage || 1}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </>
  );
};

export const Websites = () => {
  const [user] = useLocalStorage('user');
  if (!user) return null;
  return (
    <PaginableProvider<Website>
      fetchUrl={`${BACKEND_URL}/api/website?user=${user}`}
      maxItemsPerPage={3}
      context={WebsitesPaginableContext}
    >
      <WebsitesContent />
    </PaginableProvider>
  );
};
