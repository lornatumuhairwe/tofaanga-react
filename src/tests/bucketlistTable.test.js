import React from 'react';
import { shallow } from 'enzyme';

import BucketlistTable from '../components/Bucketlist/bucketlistTable';

it('should have no rows when no items are supplied', () => {
    const items = [];

    const table = shallow(
      <BucketlistTable bucketlists={items} />,
    );
    expect(table.find('ul > li').length).toBe(1);
});
