import React from 'react';
import renderer from 'react-test-renderer';
import PaginationComp from "../components/Pagination/pagination";


describe('pagination snapshot', () => {
    const details = [];
    it('matches pagination snapshot', () => {
            const pagination = renderer.create(<PaginationComp details={details} />);
            expect(pagination.toJSON()).toMatchSnapshot();
        },

    );
});
