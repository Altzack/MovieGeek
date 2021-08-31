import React, { useContext } from 'react';
import { AppContext } from '../AppContext';

export default function List() {
  const { data } = useContext(AppContext);
  return <div />;
}
