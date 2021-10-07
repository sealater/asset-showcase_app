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
            formAction: "http://52.86.154.61:3000/asset",
            formMethod: "PUT"
        };

        this.setWorkingAsset = this.setWorkingAsset.bind(this);
        this.execXHTML = this.execXHTML.bind(this);
    }

    setWorkingAsset(id) {
        if (id !== null) {
            var assetData;

            for (const asset of this.state.assets) {
                if (asset.id == id) {
                    let state = asset;
                    state.formAction = "http://52.86.154.61:3000/asset/" + asset.id;
                    state.formMethod = "PUT";
                    this.setState(state);
                    break;
                }
            }

            this.render()
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
    }

    updateStateValues(formValues) {
        this.setState(formValues);
    }

    execXHTML(data) {
        const XHR = new XMLHttpRequest();
        let urlEncodedData = "",
            urlEncodedDataPairs = [],
            name;

        for (name in data) {
            urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
        }

        urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

        console.log(data);
        alert(urlEncodedData);

        XHR.addEventListener('load', function (event) {
            alert('Yeah! Data sent and response loaded.');
            console.log(event);
        });

        // Define what happens in case of error
        XHR.addEventListener('error', function (event) {
            alert('Oops! Something went wrong.');
        });

        // Set up our request
        XHR.open('POST', 'http://52.86.154.61:3000/asset');

        // Add the required HTTP header for form data POST requests
        XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        // Finally, send our data.
        XHR.send(urlEncodedData);
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
        const { error, isLoaded, assets, formAction, formMethod } = this.state;
        let idMessage;

        let assetData = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            author: this.state.author,
            source: this.state.source
        };

        let formState = {

        }

        if (this.state.id !== null) {
            idMessage = <h4>Editing Post Id {this.state.id}</h4>;
        }

        if (error) {
            return <p>Error: {error.message}</p>
        } else if (!isLoaded) {
            return <p>Just a moment...</p>
        } else {
            return (
                <div className="asset-editor">
                    {/* id, name, description, author, license, source, submission_date */}
                    <form action={formAction} method={formMethod} className="asset-editor__controls">
                        <h3>Asset Editor</h3>
                        {idMessage}
                        <label>Name</label><br />
                        <input type="text" id="name" name="assetName" placeholder={this.state.name} /><br />
                        <label>Description</label><br />
                        <input type="text" id="description" name="assetDescription" placeholder={this.state.description} /><br />
                        <label>Author</label><br />
                        <input type="text" id="author" name="assetAuthor" placeholder={this.state.author} /><br />
                        <label>License</label><br />
                        <input type="text" id="license" name="assetLicense" placeholder={this.state.license} /><br />
                        <label>Image URL</label><br />
                        <input type="text" id="source" name="assetSource" placeholder={this.state.source} /><br />
                        <input type="submit" id="submit" value="Submit" />
                    </form>
                    <ul className="asset-editor__list">
                        <h3>Asset Selection</h3>
                        {assets.map(asset => (
                            <li><a href="#" onClick={() => this.setWorkingAsset(asset.id)} id={asset.id}>{asset.name}</a></li>
                        ))}
                        <a href="#" onClick={() => this.execXHTML(assetData)}>Test</a>
                    </ul>

                </div>
            );
        }
    }
}

export default AssetEditor;