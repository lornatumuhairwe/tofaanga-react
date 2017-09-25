import React from 'react';
import renderer from 'react-test-renderer';
import Err404 from "../components/Err404";



describe('search snapshot', () => {
    it('matches snapshot', () => {
            const errHandler = renderer.create(<Err404/>);
            expect(errHandler.toJSON()).toMatchSnapshot();
        },

    );
});
