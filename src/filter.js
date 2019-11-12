import React from 'react';
import './index.css';
import prodData from './products.json'

class Filter extends React.Component {
    constructor(props) {
        super(props);
        var sizes = []
        var prices = []
        var cams = []
        var prods = []
        var prodCount = 0
        this.handleChange = this.handleChange.bind(this);
        prodData.forEach((ele) => {
            // var minPrice, maxPrice, minCam, maxCam, minSize, maxSize = 0
            if (!prods.includes(ele.manufacturer)) {
                prods.push(ele.manufacturer)
            }
            sizes.push(ele.size);
            prices.push(ele.price);
            cams.push(ele.camera);
            prodCount++;
            if (prodCount === prodData.length) {
                sizes.sort()
                prices.sort()
                cams.sort()
                this.state = {
                    prods: prods,
                    sizes: sizes,
                    cams: cams,
                    prices: prices,
                    stateProds: [],
                    statePrices: 5000,
                    stateCams: 25,
                    stateSizes: 6.5,

                }
            }
        })
    }
    renderProd(ele) {
        return (
            <label><input type="checkbox" value={ele} onChange={this.handleChange} defaultChecked="true" />{ele}</label>
        )
    }
    handleChange = (event) => {
        var ele = event.target
        if (ele.type === "checkbox") {
            if (!ele.checked) { this.state.stateProds.push(ele.value) }
            else{ this.state.stateProds.splice(this.state.stateProds.indexOf(ele.value),1)}
        }
        else if (ele.name === "price") {
            this.setState({statePrices:ele.value})
        }
        else if (ele.name === "size") {
            this.setState({stateSizes:ele.value})
        }
        else {
            this.setState({stateCams:ele.value})
        }
        var temp = {prods: this.state.stateProds,
            prices: this.state.statePrices,
            cams: this.state.stateCams,
            sizes: this.state.stateSizes}
        this.props.updater(temp)
    }

    render() {
        var ele = []
        this.state.prods.forEach((element) => ele.push(this.renderProd(element)))
        return (
            <div className="ctn0">
                <h2>Filter:</h2>
                <form>
                    <div className="filter">
                        <label>Manufacturer:
                        <label>{ele}</label></label>
                    </div>
                    <div className="filter">
                        <label>Price:<label>
                            <input type="range" name="price" onChange={this.handleChange} max="8000" min={this.state.prices[0]} step="500" defaultValue="5000"/></label>
                        </label>
                    </div>
                    <div className="filter">
                        <label>Size:<label>
                            <input type="range" name="size" onChange={this.handleChange} max="7.0" min={this.state.sizes[0]} step="0.2" defaultValue="6.5"/></label>
                        </label>
                    </div>
                    <div className="filter">
                        <label>Camera:<label>
                            <input type="range" name="cam" onChange={this.handleChange} max="28" min="10" step="2" defaultValue="28"/></label>
                        </label>
                    </div>
                </form>
            </div>
        )
    }
}

export default Filter;