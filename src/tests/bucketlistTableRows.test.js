import React from 'react';
import renderer from 'react-test-renderer';
import BLRow from "../components/Bucketlist/bucketlistTableRows";
import { mount, shallow } from 'enzyme';
import sinon, { spy, stub } from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
sinonStubPromise(sinon);

global.localStorage = {
    setItem: () => {}, getItem: () => {},
};

global.confirm = () =>  true;

describe('bucketlist row snapshot', () => {
    it('matches snapshot', () => {
            const blrow = renderer.create(<BLRow/>);
            expect(blrow.toJSON()).toMatchSnapshot();
        },

    );
});

describe('bucketlist table row and functions', () => {
    let bltr, wrapper;
    let spy;
    beforeEach(() => {
        bltr = mount(<BLRow/>);
        wrapper = shallow(<BLRow/>);
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

    it('handle change works', () => {
        wrapper.instance().handleChange('bname', { target: { value: 'Me' } });
        expect(wrapper.state().bname).toBe('Me');
    });

});

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

    it('gets all bucketlist items', () => {
        const wrapper = shallow(<BLRow />);
        wrapper.instance().getName('title', { target: { value: 'Me' } });
        expect(wrapper.state().title).toBe('Me');
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

    it('updateActions is called', () => {
        const wrapper = shallow(<BLRow />);
        wrapper.instance().updateAction = jest.fn();
        wrapper.instance().refs = {
            bid: {value: ''}
        };
        wrapper.instance().editBucketlist({preventDefault:() => {}});
        expect(wrapper.instance().updateAction).toHaveBeenCalled();
    })
});

describe('notifications', () => {
    let wrapper;
    const getBucketlists = ()=> {};
    beforeEach(function() {
        wrapper = shallow(<BLRow getBucketlists={getBucketlists} />);
    });

    it("adds bucketlist items", async function() {
        global.fetch = jest.fn().mockImplementation(() => {
            let p = new Promise((resolve, reject) => {
                resolve({
                    ok: true,
                    Id: 1,
                    json: function() {
                        return {
                            ok: true,
                            Id: '1',
                        }
                    }
                });
            });

            return p;
        });
        wrapper.instance().setState({notificationSystem: {
            addNotification: () => {}
        }});

        const response = await wrapper.instance().addItemToBucketlistAction('foo', 'bar');
    });

    it("update bucketlist items", async function() {
        // noinspection JSAnnotator
        global.fetch = jest.fn().mockImplementation(() => {
            let p = new Promise((resolve, reject) => {
                resolve({
                    ok: true,
                    Id: 1,
                    message: 'Bucketlist updated successfully',
                    json: function() {
                        return {
                            ok: true,
                            Id: 1,
                            message: 'Bucketlist updated successfully'
                        }
                    }
                });
            });
            return p;
        });
        wrapper.instance().setState({notificationSystem: {
            addNotification: () => {}
        }});

        const response = await wrapper.instance().updateAction('foo', 'bar');
        expect(wrapper.state().showModal).toBe(false)
    });

    it("getBucketlistItemsAction works", async function() {
        global.fetch = jest.fn().mockImplementation(() => {
            let p = new Promise((resolve, reject) => {
                resolve({
                    ok: true,
                    Id: 1,
                    json: function() {
                        return {
                            ok: true,
                            Id: 1
                        }
                    }
                });
            });

            return p;
                });
        wrapper.instance().setState({notificationSystem: {
            addNotification: () => {}
        }});

        const response = await wrapper.instance().getBucketlistItemsAction('foo', 'bar');
    });

});
