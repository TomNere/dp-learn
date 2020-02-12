// author: Tomáš Nereča, 2019

import * as React from 'react';

import { WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

type AllProps =
    WithStyles<typeof styles>;

interface IPageState {
    pageViewsNumber: number
}

const styles = () => createStyles({
    complexityParent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    complexity: {
        border: '1px solid black',
        padding: '8px 4px',
        marginRight: '20px',
        display: 'inline-block',
        '& svg': {
            display: 'inline-block',
            verticalAlign: 'middle'
        }
    },
    fixedWidth: {
        minWidth: 180
    }
})


// Component for showing time and space complexity of algorithm
class PageViews extends React.Component<AllProps, IPageState> {
    public constructor(props: AllProps) {
        super(props);
        this.state = {
            pageViewsNumber: 0
        };

        this.getPageViews();
    }

    public render() {
        return (
            <div>
                {this.state.pageViewsNumber}
            </div>
        );
    }

    private getPageViews = () => {
        // create a new XMLHttpRequest
        const xhr = new XMLHttpRequest();

        // get a callback when the server responds
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
            console.log('test');
            console.log(xhr.responseText);
        });

        // open the request with the verb and the url
        xhr.open('POST', 'https://language.googleapis.com/v1/reports:batchGet?key={AIzaSyBfx0iInXIxW8K6u3n9IAdIcLEA-wf1XKc}');

        // send the request
        xhr.send(JSON.stringify({
            reportRequests: [
                {
                    "viewId": "211286428",
                    "dimensions": [
                        {
                            "name": "ga:pagePath"
                        }
                    ],
                    "metrics": [
                        {
                            "expression": "ga:pageviews"
                        }
                    ],
                    "dimensionFilterClauses": [
                        {
                            "filters": [
                                {
                                    "operator": "EXACT",
                                    "dimensionName": "ga:pagePath",
                                    "expressions": [
                                        "/your-path"
                                    ]
                                }
                            ]
                        }
                    ],
                    "dateRanges": [
                        {
                            "startDate": "2020-01-01",
                            "endDate": "today"
                        }
                    ]
                }]
        }));
    }
}

export default withStyles(styles)(PageViews);
