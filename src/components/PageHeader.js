// PageHeader.js
import React from 'react';
import './PageHeader.scss';
import graphic from '../assets/landing-illustration.svg';

class PageHeader extends React.Component {
    render() {
        return (
            <header class="page-header">
                <div className="page-header__left">
                    <h1 className="page-header__title">
                        Discover the new and novel in our curated collection of designs and design resources.
                    </h1>
                    <h4 className="page-header__subtitle">
                        Found something worth contributing? Share your discovery with the world!
                    </h4>
                    <span><a href="https://google.com" className="page-header__cta">Contribute Now</a></span>
                </div>
                <div className="page-header__right">
                    <img src={graphic} />
                </div>
            </header>
        );
    }
}

export default PageHeader;