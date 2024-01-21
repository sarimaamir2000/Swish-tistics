const readLastLines = require('read-last-lines');
import React, { useEffect } from 'react';
import readLastLines from 'read-last-lines';

readLastLines.read('./output.txt', 50)
    .then((lines) => console.log(lines));
    const TxtReader = () => {
        useEffect(() => {
            readLastLines.read('./output.txt', 5)
                .then((lines) => {
                    const [shotCount, successCount, accuracy] = lines.split('\n\n');
                    console.log('Shot Count:', shotCount.split(':')[1].trim());
                    console.log('Success Count:', successCount.split(':')[1].trim());
                    console.log('Accuracy:', accuracy.split(':')[1].trim());
                });
        }, []);

        return <div>TxtReader Component</div>;
    };

    export default TxtReader;
