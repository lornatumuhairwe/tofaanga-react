import React from 'react';
import renderer from 'react-test-renderer';
import BucketlistItems from "../components/Bucketlist/bucketlistItems";
import BLIRow from "../components/Bucketlist/BLIRow";

describe('bucketlist items snapshot', () => {
    it('matches snapshot', () => {
            const blItems = renderer.create(<BucketlistItems/>);
            expect(blItems.toJSON()).toMatchSnapshot();
        },

    );
});

describe('bucketlist methods', () => {

    it('decodes the rows', () => {

        const blsi= { 24 : ["Lorna Tumuhairwe", "2017-09-23", "Complete"], 26:["y", "2017-10-01", "Incomplete"]};
        let rows = [];
        let bID=37;

        for (const key in blsi) {
            if (blsi.hasOwnProperty(key)) {
                rows.push(<BLIRow id={key} key={key} />);
            }
        }
        expect(rows.length).toBe(2);
    })
});
