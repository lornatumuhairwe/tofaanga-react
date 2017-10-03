import React from 'react';
import renderer from 'react-test-renderer';
import {BLIRow} from "../components/Bucketlist/bucketlistItems";
import {mount, shallow} from 'enzyme';

global.localStorage = {
    setItem: () => {}, getItem: () => {},
};

global.confirm = () =>  true;

describe('bucketlist items row snapshot', () => {
    let bID=0;
    let id=0;
    let key=0;
    let bucketListItem=0;
    it('matches snapshot', () => {
            const blItemRow = renderer.create(<BLIRow bID={bID} id={id} key={key} bucketListItem={bucketListItem} />);
            expect(blItemRow.toJSON()).toMatchSnapshot();
        },

    );
});

describe('fxns', () => {
    let BLIRowComponent;
    const getBucketlistItems = () => {
        return true;
    };
    let bID=0;
    let key;
    let bucketListItem;
    beforeEach(() => {
        BLIRowComponent = mount(<BLIRow bID={bID} id={key} key={key}
                                        bucketListItem={bucketListItem}
                                        getBucketlistItems={getBucketlistItems} />);
    });

    // it('captures fields in form', () => {
    //     const updateForm = BLIRowComponent;
    //     console.log(updateForm)
    // });
});

describe('bucketlist methods', () => {
    let bID=0;
    let id=0;
    let key=0;
    let bucketListItem=0;
    let getBucketlistItems = () => {};
    it('calls deleteBucketlistItemsAction method', () => {
        const wrapper = shallow(<BLIRow bID={bID} id={id} key={key} bucketListItem={bucketListItem} getBucketlistItems={getBucketlistItems} />);
        wrapper.instance().deleteBucketlistItemsAction = jest.fn();
        wrapper.instance().refs = {
            bid: {value: ''}
        };
        const deleteBucketlistItemsActionInstance = wrapper.instance();
        deleteBucketlistItemsActionInstance.deleteBucketlistItem({preventDefault:() => {}});
        expect(wrapper.instance().deleteBucketlistItemsAction).toHaveBeenCalled();

    });

    it('calls updateBucketlistItemsAction method', () => {
        const wrapper = shallow(<BLIRow bID={bID} id={id} key={key} bucketListItem={bucketListItem} getBucketlistItems={getBucketlistItems} />);
        wrapper.instance().updateBucketlistItemsAction = jest.fn();
        wrapper.instance().refs = {
            bid: {value: ''}
        };
        const updateBucketlistItemsActionInstance = wrapper.instance();
        updateBucketlistItemsActionInstance.handleUpdate({preventDefault:() => {}});
        expect(wrapper.instance().updateBucketlistItemsAction).toHaveBeenCalled();

    });

    it('opens modal', () => {
        const wrapper = shallow(<BLIRow bID={bID} id={id} key={key} bucketListItem={bucketListItem} />);
        wrapper.instance().openModal({preventDefault:() => {}});
        expect(wrapper.state().showUpdate).toBe(true);
    });

    it('closes modal', () => {
        const wrapper = shallow(<BLIRow bID={bID} id={id} key={key} bucketListItem={bucketListItem} />);
        wrapper.instance().closeModal({preventDefault:() => {}});
        expect(wrapper.state().showUpdate).toBe(false);
    });

    it('gets all bucketlist items', () => {
        const wrapper = shallow(<BLIRow bID={bID} id={id} key={key} bucketListItem={bucketListItem} />);
        wrapper.instance().handleChange( 'title', {target:{ value: 'Me' }});
        expect(wrapper.state().title).toBe('Me');
    });
});

// describe('test fetch', () => {
//     let wrapper;
//     let bID=0;
//     let id=0;
//     let key=0;
//     let bucketListItem=0;
//     //let getBucketlistItems = () => {};
//     beforeEach(function() {
//         wrapper = shallow(<BLIRow bID={bID} id={id} key={key} bucketListItem={bucketListItem} /> );
//         global.fetch = jest.fn().mockImplementation(() => {
//             let p = new Promise((resolve, reject) => {
//                 resolve({
//                     json: function() {
//
//                         return {
//                             "Deadline": "1/1/2016",
//                             "buckelist Item": "one",
//                             "message": "Bucketlist item updated successfully",
//                             "status": "COMplete"
//                         }
//                     }
//                 });
//             });
//             return p;
//         });
//
//     });
//
//     it("update bucketlist items", async function() {
//         const response = await wrapper.instance().delete('foo', 'bar');
//         console.log(response);
//         expect(response.status).toBe("COMplete");
//     });
// });
