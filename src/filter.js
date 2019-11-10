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
                }
            }
        })
    }
    renderProd(ele) {
        return (
            <label><input type="checkbox" value={ele} onChange={this.handleChange} defaultChecked="true"/>{ele}</label>
        )
    }
    handleChange(event) {
        var ele=event.target
        var temp={prods: null,
            sizes: null,
            cams: null,
            prices: null};
        if(ele.type==="checkbox"){
            temp.prods=ele.value
        }
        else if(ele.name==="price"){
            temp.prices=ele.value
        }
        else if(ele.name==="size"){
            temp.sizes=ele.value
        }
        else{
            temp.cams=ele.value
        }
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
                            <input type="range" name="price" onChange={this.handleChange} max={this.state.prices[this.state.prices.length - 1]} min={this.state.prices[0]} step="500" /></label>
                        </label>
                    </div>
                    <div className="filter">
                        <label>Size:<label>
                            <input type="range" name="size" onChange={this.handleChange} max={this.state.sizes[this.state.sizes.length - 1]} min={this.state.sizes[0]} step="0.2" /></label>
                        </label>
                    </div>
                    <div className="filter">
                        <label>Camera:<label>
                            <input type="range" name="cam" onChange={this.handleChange} max={this.state.cams[this.state.cams.length - 1]} min={this.state.cams[0]} step="2" /></label>
                        </label>
                    </div>
                </form>
            </div>
        )
    }
}

export default Filter;