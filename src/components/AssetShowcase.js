// AssetShowcase.js
import React from 'react';
import './AssetShowcase.scss'

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
            return <p>Error: {console.log(error)}</p>
        } else if (!isLoaded) {
            return <p>Just a moment...</p>
        } else {
            return (
                <div>
                    {assets.map(asset => (
                        <p>{asset.id} - {asset.name} - {asset.description} - {asset.author} - {asset.license} - {asset.source} - {asset.submission_date}</p>
                    ))}
                </div>
            );
        }

        return (
            <main className="asset-showcase">
                <p>Asset Showcase</p>
            </main>
        );
    }
}

export default AssetShowcase;