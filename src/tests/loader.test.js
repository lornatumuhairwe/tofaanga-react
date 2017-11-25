import React from 'react';
import renderer from 'react-test-renderer';
import Loader from "../components/loader";

describe('search snapshot', () => {
    it('matches snapshot', () => {
            const loader = renderer.create(<Loader/>);
            expect(loader.toJSON()).toMatchSnapshot();
        },

    );
});
