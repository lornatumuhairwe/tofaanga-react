import React from 'react';
import renderer from 'react-test-renderer';
import PaginationComp from "../components/Pagination/pagination";
import {mount} from 'enzyme';
import sinon, {spy} from 'sinon';


describe('pagination snapshot', () => {
    const details = [];
    it('matches pagination snapshot', () => {
            const pagination = renderer.create(<PaginationComp details={details} />);
            expect(pagination.toJSON()).toMatchSnapshot();
        },
    );

    it("mounts with only next button when next_url is true", () => {
        const details = {next_url: true, prev_url: false};
        // sinon.spy(PaginationComp.prototype, 'handleSelectNext');
        const pagination = mount(<PaginationComp details={details} />);
        pagination.instance().displaySignup = jest.fn();
        const paginationComponent = pagination.find('Pager');
        expect(paginationComponent.length).toEqual(1);
        paginationComponent.simulate('click');
        // expect(pagination.instance().displaySignup).toHaveBeenCalled();

    });

    it("mounts with only prev button when prev_url is true", () => {
        const details = {next_url: false, prev_url: true};
        // sinon.spy(PaginationComp.prototype, 'handleSelectNext');
        const pagination = mount(<PaginationComp details={details} />);
        pagination.instance().displaySignup = jest.fn();
        const paginationComponent = pagination.find('Pager');
        const paginationItem = paginationComponent.find('Pager.Item');
        expect(paginationComponent.length).toEqual(1);
        paginationComponent.simulate('click');
        console.log(paginationItem);
        // expect(pagination.instance().displaySignup).toHaveBeenCalled();

    });
});
