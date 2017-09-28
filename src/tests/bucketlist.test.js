import React from 'react';
import renderer from 'react-test-renderer';
import Bucketlist from '../components/Bucketlist/bucketlist';
import { mount, shallow } from 'enzyme';
import { stub } from 'sinon';

global.localStorage = {
  setItem: () => {}, getItem: () => {}, removeItem: () => {},
};

describe('bucketlist snapshot', () => {
  const isLoggedIn = true;
  const displaySignup = () => {};
  beforeEach(() => {
    stub(Bucketlist.prototype, 'getBucketlists').returns(true);
  });
  it('renders', () => {
    const bucketlist = renderer.create(<Bucketlist isLoggedIn={isLoggedIn} displaySignup={displaySignup} />);
    expect(bucketlist.toJSON()).toMatchSnapshot();
  });
});

describe('bucketlist functions', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Bucketlist />);
  });

  it('closes modal', () => {
    wrapper.instance().closeModal();
    expect(wrapper.state().showModal).toBe(false);
  });

  it('opens modal', () => {
    wrapper.instance().openModal();
    expect(wrapper.state().showModal).toBe(true);
  });

  it('closes modal', () => {
    wrapper.instance().LogOut({ preventDefault: () => {} });
    expect(wrapper.state().isLoggedIn).toBe(false);
  });

  it('can handle addition of bucketlist', () => {
    wrapper.instance().addBucketlist = jest.fn();
    wrapper.instance().handleAdd({ preventDefault: () => {} });
    expect(wrapper.state().showModal).toBe(false);
    expect(wrapper.instance().addBucketlist).toHaveBeenCalled();
  });

  it('gets all bucketlist items', () => {
    wrapper.instance().getName('bname', { target: { value: 'Me' } });
    expect(wrapper.state().bname).toBe('Me');
  });
});

// describe('test fetch', () => {
//     let wrapper;
//     beforeEach(function() {
//         wrapper = shallow(<Bucketlist />);
//         global.fetch = jest.fn().mockImplementation(() => {
//             let p = new Promise((resolve, reject) => {
//                 resolve({
//                     "bucketlists": {
//                         "38": "Revie",
//                         "40": "tr",
//                         "41": "Lorna Tumuhairwe",
//                         "42": "taylor"
//                     },
//                     "details": {
//                         "next_url": "/api/v1/bucketlists/page/2?limit=4",
//                         "page": 1,
//                         "pages": 3,
//                         "per_page": 4,
//                         "total": 10
//                     }
//                 });
//             });
//
//             return p;
//         });
//
//     });
//
//     it("gets bucketlist", async function() {
//         const response = await wrapper.instance().getBucketlists('foo');
//         // expect(wrapper.state().bucketlists).toBe({
//         //     "38": "Revie",
//         //     "40": "tr",
//         //     "41": "Lorna Tumuhairwe",
//         //     "42": "taylor"
//         // });
//         expect(response.bucketlists).toBe({
//             "38": "Revie",
//             "40": "tr",
//             "41": "Lorna Tumuhairwe",
//             "42": "taylor"
//         });
//     });
// });
