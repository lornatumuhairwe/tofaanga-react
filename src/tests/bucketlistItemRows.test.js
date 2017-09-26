import React from 'react';
import renderer from 'react-test-renderer';
import {BLIRow} from "../components/Bucketlist/bucketlistItems";

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
