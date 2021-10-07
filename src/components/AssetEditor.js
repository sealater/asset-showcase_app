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
        this.sendData = this.sendData.bind(this);
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


    sendData(e) {
        const XHR = new XMLHttpRequest();

        // Bind the FormData object and the form element
        const FD = new FormData(e.submitter);

        // Define what happens on successful data submission
        XHR.addEventListener("load", function (event) {
            alert(event.target.responseText);
        });

        // Define what happens in case of error
        XHR.addEventListener("error", function (event) {
            alert('Oops! Something went wrong.');
        });

        XHR.open('POST', 'http://52.86.154.61:3000/asset');

        XHR.send(FD);
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
                    <form onSubmit={this.sendData} action={formAction} method={formMethod} className="asset-editor__controls">
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

                    </ul>

                </div>
            );
        }
    }
}

export default AssetEditor;