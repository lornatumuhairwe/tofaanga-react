import React from 'react';
import renderer from 'react-test-renderer';
import BucketlistItems from "../components/Bucketlist/bucketlistItems";

describe('bucketlist items snapshot', () => {
    it('matches snapshot', () => {
            const blItems = renderer.create(<BucketlistItems/>);
            expect(blItems.toJSON()).toMatchSnapshot();
        },

    );
});
