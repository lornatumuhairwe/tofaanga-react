import React from 'react';
import { shallow } from 'enzyme';

import BucketlistTable from '../components/Bucketlist/bucketlistTable';
import BLRow from '../components/Bucketlist/bucketlistTable';

it('should still render a list of items', () => {
  const items = [];

  const table = shallow(
    <BucketlistTable />,
  );
  expect(table.find('ul').exists()).toBe(true);
});

it('should have no rows when no items are supplied', () => {
    const items = [];

    const table = shallow(
      <BucketlistTable bucketlists={items} />,
    );
    expect(table.find('ul > li').exists()).toBe(false);
});

