import React from 'react';
import renderer from 'react-test-renderer';
import BLRow from "../components/Bucketlist/bucketlistTableRows";
import {mount, shallow} from 'enzyme';
import sinon, { stub } from 'sinon';

global.localStorage = {
    setItem: () => {}, getItem: () => {},
};


describe('bucketlist row snapshot', () => {
    it('matches snapshot', () => {
            const blrow = renderer.create(<BLRow/>);
            expect(blrow.toJSON()).toMatchSnapshot();
        },

    );
});

describe('bucketlist table row and functions', () => {
    let bltr;
    let spy, stubb;
    beforeEach(() => {
        bltr = mount(<BLRow/>);
        // stubb = stub(BLRow.prototype, "deleteAction").returns(true);

    });

    afterEach(() => {
        // spy.restore();
        // stubb.restore();
    });
    it("renders with expected state", () => {
        expect(bltr.state().bucketlist).toBe('');
        expect(bltr.state().showModal).toBe(false);
        expect(bltr.state().newname).toBe('');
        expect(bltr.state().items).toEqual([]);
        }
    );

    it("opens the add modal", () => {
        const element = bltr.find('li');
        expect(element.length).toBe(1);
        const addBLButton = element.find('#add');
        expect(addBLButton.length).toBe(1);
        addBLButton.simulate('click');
        expect(bltr.state().showAdd).toBe(true);
    });

    it("opens the edit modal", () => {
        const element = bltr.find('li');
        expect(element.length).toBe(1);
        const editBLButton = element.find('#edit');
        expect(editBLButton.length).toBe(1);
        editBLButton.simulate('click');
        expect(bltr.state().showModal).toBe(true);
    });

    it("calls the delete function", () => {
        // const del = new Promise(r=>r());
        // const deleteSpy = sinon.spy(BLRow.prototype, 'deleteBucketlist');
        // console.log(Object.keys(spy));
         //BLRow.prototype.delete = deleteBucketlist;
        // bltr.instance().deleteAction = jest.fn();
        // stub(BLRow.prototype, "dummy").returns(true);
        // const dummy = () => {};
        spy = stub(BLRow.prototype, "delete").returns(true);
        let spy2 = stub(BLRow.prototype, "deleteAction").returns(true);

        // stub(BLRow.prototype, "deleteBucketlist").returns(true);
        const element = bltr.find('li');
        expect(element.length).toBe(1);
        const deleteBLButton = element.find('#delete');
        // console.log(deleteBLButton.text());
        expect(deleteBLButton.length).toBe(1);
        deleteBLButton.simulate('click',{
            preventDefault: () => {
            }
        });

        //sinon.assert.called(spy);
        //.log(spy.getCalls());
        // expect(BLRow.prototype.deleteBucketlist.calledOnce).toBe(true);
        expect(spy.called).toBe(true);
        spy.restore();
        // stubb.restore();
    });

});

