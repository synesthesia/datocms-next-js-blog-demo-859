  
import { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'use-debounce';
import DatoCmsSearch from 'datocms-search/dist/datocms-search.base';
import highlighter from 'keyword-highlighter';
import cn from 'classnames';
import parse from 'html-react-parser';

import s from './style.module.css';

console.log(process.env.NEXT_PUBLIC_SEARCH_API_KEY);
const client = new DatoCmsSearch(process.env.NEXT_PUBLIC_SEARCH_API_KEY);

const search = async query => {
  const [{ results: docs }, community] = await Promise.all([
    client.search(query),
    //fetchCommunity(query),
  ]);

  return [].concat(docs, community);
};


export default function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);

      search(debouncedSearchTerm).then(results => {
        setIsSearching(false);
        setResults(results);
      });
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <div
        className={cn(s.overlay, { [s.visible]: !!searchTerm })}
        onClick={() => setSearchTerm('')}
      />
      <div className={cn(s.searchResults, { [s.visible]: !!searchTerm })}>
        {isSearching && (
          <div className={s.spinning}>
            <div />
            <div />
          </div>
        )}
        <ul className={s.results}>
          {console.log(results)}
          {results.length > 0 && results.map(result => (
            result  !== undefined && (
            <li key={result.url} className={s.result}>
              <a href={result.url}>
                <div className={s.resultTitle}>
                  {parse((result.title || '').replace(/ - DatoCMS$/, ''))}{' '}
                  {result.community && (
                    <span className={s.community}>Community</span>
                  )}
                </div>
                {result.body && (
                  <div
                    className={s.resultBody}
                    dangerouslySetInnerHTML={{ __html: result.body }}
                  />
                )}
                <div
                  className={s.resultUrl}
                  dangerouslySetInnerHTML={{
                    __html: highlighter(searchTerm || '', result.url),
                  }}
                />
              </a>
            </li>)
          ))}
        </ul>
      </div>
      <form className={s.formSearch}>
        <input
          name="query"
          type="search"
          placeholder="Search this site"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </form>
    </>
  );

}