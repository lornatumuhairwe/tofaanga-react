import React from 'react';
import renderer from 'react-test-renderer';
import BucketlistItems from "../components/Bucketlist/bucketlistItems";
import {mount} from 'enzyme';

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
