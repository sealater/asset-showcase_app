// Contribute.js
import React from 'react';
import './AssetEditor.scss';

class AssetEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            assets: [],
            id: null,
            name: "",
            description: "",
            author: "",
            license: "",
            source: "",
            action: "http://52.86.154.61:3000/asset",
            method: 'POST'
        };

        this.setWorkingAsset = this.setWorkingAsset.bind(this);
        this.sendData = this.sendData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateAssets = this.updateAssets.bind(this);
    }

    setWorkingAsset(id) {
        if (id !== null) {
            for (const asset of this.state.assets) {
                if (asset.id === id) {
                    let state = asset;
                    state.action = "http://52.86.154.61:3000/asset/" + asset.id;
                    state.method = 'PUT';
                    this.setState(state);
                    break;
                }
            }
        }
        else {
            this.setState({
                name: "",
                description: "",
                author: "",
                license: "",
                source: ""
            });
        }

        this.setState({ state: this.state });
    }

    handleChange(e) {
        this.setState({ [e.target.id]: e.target.value });
    }

    sendData(e) {
        if (e !== undefined)
            e.preventDefault();

        const url = this.state.action;
        const method = this.state.method;

        fetch(url, {
            method: method,
            body: JSON.stringify({
                assetName: document.getElementById('name').value || document.getElementById('name').placeholder,
                assetDescription: document.getElementById('description').value || document.getElementById('description').placeholder,
                assetAuthor: document.getElementById('author').value || document.getElementById('author').placeholder,
                assetLicense: document.getElementById('license').value || document.getElementById('license').placeholder,
                assetSource: document.getElementById('source').value || document.getElementById('source').placeholder
            }),
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(
            response => response.text() // .json(), etc.
            // same as function(response) {return response.text();}
        ).then(
            html => { this.updateAssets() }
        );


    }

    updateAssets() {
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

        if (this.state.id == null) {
            this.setState({
                name: "",
                description: "",
                author: "",
                license: "",
                source: ""
            });
        }
    }

    render() {
        const { error, isLoaded, assets, formAction, formMethod } = this.state;
        let idMessage;

        if (this.state.id !== null) {
            idMessage = <h5>Editing Post Id {this.state.id}</h5>;
        }

        if (error) {
            return <p>Error: {error.message}</p>
        } else if (!isLoaded) {
            return <p>Just a moment...</p>
        } else {
            return (
                <div className="asset-editor">
                    {/* id, name, description, author, license, source, submission_date */}
                    <form id="asset-editor" onSubmit={this.sendData} action={formAction} method={formMethod} className="asset-editor__controls">
                        <h3>Asset Editor</h3>
                        {idMessage}
                        <label>Name</label><br />
                        <input type="text" id="name" name="assetName" placeholder={this.state.id ? this.state.name : ""} onChange={this.handleChange} /><br />
                        <label>Description</label><br />
                        <input type="text" id="description" name="assetDescription" placeholder={this.state.id ? this.state.description : ""} onChange={this.handleChange} /><br />
                        <label>Author</label><br />
                        <input type="text" id="author" name="assetAuthor" placeholder={this.state.id ? this.state.author : ""} onChange={this.handleChange} /><br />
                        <label>License</label><br />
                        <input type="text" id="license" name="assetLicense" placeholder={this.state.id ? this.state.license : ""} onChange={this.handleChange} /><br />
                        <label>Image URL</label><br />
                        <input type="text" id="source" name="assetSource" placeholder={this.state.id ? this.state.source : ""} onChange={this.handleChange} /><br />
                        <input type="submit" id="submit" value="Submit" />
                        <a href="#" onClick={() => {
                            if (this.state.id !== null) {
                                this.setState({ method: 'DELETE' });
                                this.sendData();
                                this.setState({ id: null, action: 'http://52.86.154.61:3000/asset', method: 'POST' });
                            }
                        }}>Delete</a>
                    </form>
                    <ul className="asset-editor__list">
                        <h3>Asset Selection</h3>
                        {assets.map(asset => (
                            <a href="#" onClick={() => this.setWorkingAsset(asset.id)} id={asset.id}><li>{asset.name}</li></a>
                        ))}
                        <a className="create-button" href="#" onClick={() => {
                            this.setState({
                                id: null,
                                name: "",
                                description: "",
                                author: "",
                                license: "",
                                source: "",
                                action: 'http://52.86.154.61:3000/asset',
                                method: 'POST'
                            });
                            for (let el of document.getElementById('asset-editor').elements) el.value = null;
                        }}><li>+ Create a new asset</li></a>
                    </ul>

                </div>
            );
        }
    }
}

export default AssetEditor;