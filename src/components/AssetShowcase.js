// AssetShowcase.js
import React from 'react';
import './AssetShowcase.scss'

function formatDate(date) {
    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

class AssetShowcase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            assets: []
        };
    }

    componentDidMount() {
        fetch("http://52.86.154.61:3000/asset")
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    assets: result
                });
            },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                });
    }

    render() {
        const { error, isLoaded, assets } = this.state;

        if (error) {
            return <p>Error: {error.message}</p>
        } else if (!isLoaded) {
            return <p>Just a moment...</p>
        } else {
            return (
                <main className="asset-showcase">
                    {assets.map(asset => (
                        <div className="asset" id={asset.id}>
                            {/* id, name, description, author, license, source, submission_date */}
                            <div className="asset__overlay">
                                <p className="asset__name">{asset.name}</p>
                                <p className="asset__license">{asset.license}</p>
                                <p className="asset__description">{asset.description}</p>
                            </div>
                            <div style={{ backgroundImage: `url(${asset.source})` }} className="asset__image" />
                            <div class="asset__info">
                                <p className="asset__author">{asset.author}</p>
                                <p className="asset__date">{formatDate(asset.submission_date)}</p>
                            </div>
                        </div>
                    ))}
                </main>
            );
        }
    }
}

export default AssetShowcase;