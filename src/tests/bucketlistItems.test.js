import React from 'react';
import renderer from 'react-test-renderer';
import BucketlistItems from "../components/Bucketlist/bucketlistItems";
import {mount, shallow} from 'enzyme';

describe('bucketlist items snapshot', () => {
    it('matches snapshot', () => {
            const blItems = renderer.create(<BucketlistItems/>);
            expect(blItems.toJSON()).toMatchSnapshot();
        },

    );
});

// describe('fxns', () => {
//     let BLIComponent;
//     const getBucketlists = () => {
//         return true;
//     };
//     beforeEach(() => {
//         BLIComponent = mount(<BucketlistItems />);
//     });
    // it('captures fields in form', () => {
    //     const updateForm = BLIComponent.find('tr');
    //     console.log(updateForm)
    // });
//});

// describe('bucketlist methods', () => {
//     // it('calls deleteBucketlistItemsAction method', () => {
//     //     const wrapper = shallow(<BucketlistItems />);
//     //     wrapper.instance().deleteBucketlistItemsAction = jest.fn();
//     //     wrapper.instance().refs = {
//     //         bid: {value: ''}
//     //     };
//     //     const deleteBucketlistItemsActionInstance = wrapper.instance();
//     //     deleteBucketlistItemsActionInstance.deleteBucketlistItem({preventDefault:() => {}});
//     //     expect(wrapper.instance().deleteBucketlistItemsAction).toHaveBeenCalled();
//     //
//     // });
//
//     it('opens modal', () => {
//         const wrapper = shallow(<BucketlistItems />);
//         wrapper.instance().openModal({preventDefault:() => {}});
//         expect(wrapper.state().showUpdate).toBe(true);
//     });
//
//     // it('gets all bucketlist items', () => {
//     //     const wrapper = shallow(<BucketlistItems />);
//     //     wrapper.instance().getBucketlistItemsAction = jest.fn();
//     //     wrapper.instance().refs = {
//     //         bid: {value: ''}
//     //     };
//     //     wrapper.instance().getBucketlistItems({preventDefault:() => {}});
//     //     expect(wrapper.instance().getBucketlistItemsAction).toHaveBeenCalled();
//     // })
// });
