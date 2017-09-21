import React from 'react';
import renderer from 'react-test-renderer';
import Bucketlist from "../components/Bucketlist/bucketlist";

global.localStorage = {
    setItem: () => {}, getItem: () => {},
};

describe('Bucketlist snapshot', () => {
    const token = [];
    it('matches bucketlist snapshot', () => {
            const bucketlistComponent = renderer.create(<Bucketlist token={token} />);
            expect(bucketlistComponent.toJSON()).toMatchSnapshot();
        },

    );
});
