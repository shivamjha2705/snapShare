import React, { useEffect, useState } from 'react';

import MasonryLayout from './MasonryLayout';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import Spinner from './Spinner';

const Search = ({ searchTerm }) => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm && searchTerm !== '') {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
    {loading && <Spinner message="Searching for pins..." />}
    {pins?.length !== 0 && <MasonryLayout pins={pins} />}
    {pins?.length === 0 && searchTerm !== '' && !loading && (
      <div className="mt-10 text-center justify-center text-xl font-bold text-teal-800 ">No Pins Found!</div>
    )}
  </div>
  )
}

export default Search