import React from 'react';
import PropTypes from 'prop-types';
// docs-page-shell
import ReactPageShell from '../../vendor/docs-page-shell/react-page-shell.js';
// dr-ui components
import PageLayout from '@mapbox/dr-ui/page-layout';
import { buildMeta, findParentPath } from '@mapbox/dr-ui/page-layout/utils';
// site variables
import constants from '../constants';
// batfish modules
import { withLocation } from '@mapbox/batfish/modules/with-location';
// dataSelectors
import navigation from '@mapbox/batfish/data/navigation';
import filters from '@mapbox/batfish/data/filters';
import apiNavigation from '@mapbox/batfish/data/api-navigation';

import { styleSpecNavigation } from '../data/style-spec-navigation';
import plugins from '../data/plugins.json';

import Search from './api/search';
import AppropriateImage from './appropriate-image';
import Browser from '@mapbox/dr-ui/browser';
import redirectApiRef from '../util/api-ref-redirect';
import classnames from 'classnames';
import { version } from '../../node_modules/maplibre-gl/package.json';
import { version as styleSpecVersion } from '../../node_modules/maplibre-gl/src/style-spec/package.json';

import slug from 'slugg';

const redirectStyleSpec = require('../util/style-spec-redirect');

class PageShell extends React.Component {
    componentDidMount() {
        // redirect hashes on /style-spec/
        if (
            this.props.location.pathname ===
                '/maplibre-gl-js-docs/style-spec/' &&
            this.props.location.hash
        ) {
            if (redirectStyleSpec(this.props.location))
                window.location = redirectStyleSpec(this.props.location);
        }

        // redirect hashes on /api/
        if (
            this.props.location.pathname === '/maplibre-gl-js-docs/api/' &&
            this.props.location.hash
        ) {
            if (redirectApiRef(this.props.location))
                window.location = redirectApiRef(this.props.location);
        }
    }
    renderCustomHeadings = () => {
        const { location, frontMatter } = this.props;

        const subSection = findParentPath(navigation, location.pathname);
        if (subSection === '/maplibre-gl-js-docs/api/')
            return (
                frontMatter.headings ||
                apiNavigation.filter((f) => f.path === location.pathname)[0]
                    .subnav
            );
        else if (subSection === '/maplibre-gl-js-docs/style-spec/') {
            return (
                styleSpecNavigation.filter(
                    (f) => f.path === location.pathname
                )[0].subnav || frontMatter.headings
            );
        } else if (subSection === '/maplibre-gl-js-docs/plugins/') {
            const headings = Object.keys(plugins).reduce((arr, key) => {
                arr.push({
                    slug: slug(key),
                    text: key,
                    level: 2
                });
                return arr;
            }, []);

            return headings || [];
        } else {
            return frontMatter.headings;
        }
    };
    renderCustomAside = () => {
        const subSection = findParentPath(
            navigation,
            this.props.location.pathname
        );
        if (subSection === '/maplibre-gl-js-docs/api/') return <Search />;
        else return undefined;
    };
    render() {
        const { location, children, frontMatter } = this.props;
        const meta = buildMeta(frontMatter, location.pathname, navigation);
        const isStyleSpec = location.pathname.indexOf('/style-spec/') > -1;

        return (
            <ReactPageShell
                site={constants.SITE}
                subsite={isStyleSpec ? 'Style Specification' : undefined}
                {...this.props}
                meta={meta}
                darkHeaderText={true}
            >
                <PageLayout
                    domain={{
                        title: 'MapLibre',
                        path: 'https://maplibre.org/'
                    }}
                    hideSearch={true}
                    location={location}
                    frontMatter={{
                        ...frontMatter,
                        ...(frontMatter.overviewHeader && {
                            overviewHeader: {
                                ...frontMatter.overviewHeader,
                                version: isStyleSpec
                                    ? styleSpecVersion
                                    : version,
                                ...(frontMatter.overviewHeader.image && {
                                    image: (
                                        <div className="overview-header-browser mb6">
                                            <Browser>
                                                <AppropriateImage
                                                    imageId={
                                                        frontMatter
                                                            .overviewHeader
                                                            .image
                                                    }
                                                    alt=""
                                                    className="hmax300"
                                                />
                                            </Browser>
                                        </div>
                                    )
                                })
                            }
                        }),
                        headings: this.renderCustomHeadings()
                    }}
                    constants={constants}
                    navigation={navigation}
                    filters={filters}
                    AppropriateImage={AppropriateImage}
                    // use custom sidebar for API and Style Spec since this data needs to be generated
                    customAside={this.renderCustomAside()}
                >
                    <div
                        className={classnames('', {
                            'style-spec-page': isStyleSpec
                        })}
                    >
                        {children}
                    </div>
                </PageLayout>
            </ReactPageShell>
        );
    }
}

PageShell.propTypes = {
    meta: PropTypes.object,
    frontMatter: PropTypes.object.isRequired,
    children: PropTypes.node,
    location: PropTypes.object.isRequired,
    headings: PropTypes.array
};

export default withLocation(PageShell);
