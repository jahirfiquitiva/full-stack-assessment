import { Link, useParams } from 'react-router-dom';
import {
  LinksPaginableContext,
  WebsitesPaginableContext,
} from '../../contexts';
import { PaginableProvider, usePaginable } from '../../providers';
import type { Link as LinkType, Website } from '../../types/website';
import { Loading } from '../loading';
import { NotFound } from '../not-found';
import { Pagination } from '../pagination';
import { Table } from '../table';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LinksContent = () => {
  const { items, loading, pagesCount, currentPage, setCurrentPage } =
    usePaginable(WebsitesPaginableContext);
  const website = items?.[0];

  if (loading) return <Loading />;
  if (!website) return <NotFound />;

  return (
    <>
      <Link to={'/websites '}>⬅️ Go back</Link>
      <a href={website.url} style={{ textAlign: 'center' }} target={'_blank'}>
        <h2>{website.title}</h2>
      </a>
      {Boolean(website.links.length) && (
        <>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {website.links?.map((link) => {
                return (
                  <tr key={link.url}>
                    <td className={'truncate'}>
                      <>{link.title || link.url}</>
                    </td>
                    <td className={'truncate'}>
                      <a href={link.url} target={'_blank'}>
                        {link.url}
                      </a>
                    </td>
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

export const Links = () => {
  const { id } = useParams();
  return (
    <PaginableProvider<Website>
      fetchUrl={`${BACKEND_URL}/api/website/${id}`}
      maxItemsPerPage={5}
      context={WebsitesPaginableContext}
    >
      <LinksContent />
    </PaginableProvider>
  );
};
