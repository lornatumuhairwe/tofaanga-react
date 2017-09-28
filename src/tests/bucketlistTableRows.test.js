import React from 'react';
import renderer from 'react-test-renderer';
import BLRow from "../components/Bucketlist/bucketlistTableRows";
import {mount, shallow} from 'enzyme';
import sinon, { spy, stub } from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
sinonStubPromise(sinon);

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
        spy = stub(BLRow.prototype, "delete").returns(true);
        // let spy2 = stub(BLRow.prototype, "deleteAction").returns(true);
        const element = bltr.find('li');
        expect(element.length).toBe(1);
        const deleteBLButton = element.find('#delete');
        expect(deleteBLButton.length).toBe(1);
        deleteBLButton.simulate('click',{
            preventDefault: () => {
            }
        });

        expect(spy.called).toBe(true);
        spy.restore();
    });

});

// describe('add item to bucketlist', () => {
//     let stubedFetch;
//     let bltr, spy;
//     beforeEach(() => {
//         bltr = mount(<BLRow/>);
//         stubedFetch = sinon.stub(window, 'fetch');
//         spy = sinon.spy(BLRow.prototype, 'addItemToBucketlistAction');
//     });
//
//     it('it should work', () => {
//         stubedFetch.returnsPromise().resolves({
//             "buckelist Item": "get",
//             "message": "Bucketlist item added successfully"
//         });
//         const element = bltr.dive().find('form.addItemForm');
//         // const addItemForm = element.find('.pull-right').find("Modal").at(1).nodes[0];
//         console.log(element.length);
//         //addItemForm.simulate('submit');
//         //expect(bltr.state().bucketlist).toBe('');
//         //expect(spy.called).toBe(true);
//         // expect(bltr.state().newname).toBe('');
//         // expect(bltr.state().items).toEqual([]);
//     });
// });
//jest.mock('addItemToBucketlistAction', () => jest.fn());

//

describe('bucketlist methods', () => {
    it('calls addItemToBucketlistAction method', () => {
        const wrapper = shallow(<BLRow />);
        wrapper.instance().addItemToBucketlistAction = jest.fn();
        wrapper.instance().refs = {
        bid: {value: ''}
        };
        const addItemToBucketlistActionInstance = wrapper.instance();
        addItemToBucketlistActionInstance.addItemToBucketlist({preventDefault:() => {}});
        expect(wrapper.instance().addItemToBucketlistAction).toHaveBeenCalled();

    });

    it('closes modal', () => {
        const wrapper = shallow(<BLRow />);
        wrapper.instance().closeModal({preventDefault:() => {}});
        expect(wrapper.state().showModal).toBe(false);
    });

    it('gets all bucketlist items', () => {
        const wrapper = shallow(<BLRow />);
        wrapper.instance().getBucketlistItemsAction = jest.fn();
        wrapper.instance().refs = {
            bid: {value: ''}
        };
        wrapper.instance().getBucketlistItems({preventDefault:() => {}});
        expect(wrapper.instance().getBucketlistItemsAction).toHaveBeenCalled();
    })
});

describe('test fetch', () => {
    let wrapper;
    beforeEach(function() {
        wrapper = shallow(<BLRow />);
        global.fetch = jest.fn().mockImplementation(() => {
            let p = new Promise((resolve, reject) => {
                resolve({
                    ok: true,
                    Id: '123',
                    json: function() {
                        return {
                            "buckelist Item": "get",
                            "message": "Bucketlist item added successfully"
                        }
                    }
                });
            });

            return p;
        });

    });

    it("adds bucketlist items", async function() {
        const response = await wrapper.instance().addItemToBucketlistAction('foo', 'bar');
        expect(response.message).toBe("Bucketlist item added successfully");
    });
});
