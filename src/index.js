import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import prodData from './products.json'
import Filter from './filter.js'


function Item(props) {
	var cap = props.cap ? "Remove" : "Compare"
	return (
		<div className="itemCtn">
			<img src={require(`${props.value.image}`)} alt="Unavailable" />
			<div className="hoverlay"></div>
			<div className="compCtn" onClick={(e) => props.onClick(e, props.value)}>{cap}</div>
			<div className="cap1">{"₹" + props.value.price}</div>
			<div className="cap2">{props.value.product}</div>
			<div className="cap3">{props.value.desc}</div>
		</div>
	);
}
class Compare extends React.Component {
	render() {
		var heads = []
		var prices = []
		var screen = []
		var cam = []
		this.props.tab.forEach((ele) => {
			heads.push(<th>{ele.product}</th>)
			prices.push(<td>{"₹" + ele.price}</td>)
			screen.push(<td>{ele.size + " in"}</td>)
			cam.push(<td>{ele.camera + " MP"}</td>)
		})
		return (<div className="ctn3">
			<table className="table">
				<thead>
					<tr>
						<th></th>
						{heads}
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>Price</th>
						{prices}
					</tr>
					<tr>
						<th>Screen Size</th>
						{screen}
					</tr>
					<tr>
						<th>Camera</th>
						{cam}
					</tr>
				</tbody>
			</table>
		</div>)
	}
}
class ItemList extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			items: null,
			compare: Array(prodData.length).fill(false),
			tabs: Array(prodData.length),
			count: 0,
		}
		this.state.items = prodData
	}

	handleClick = (i, e) => {
		const compare = this.state.compare.slice()
		const count = this.state.count
		const tabs = this.state.tabs.slice()
		if (compare[e.index] === false) {
			compare[e.index] = !compare[e.index]
			tabs.push(e)
			this.setState({ compare: compare, tabs: tabs, count: count + 1 })
		}
		else {
			compare[e.index] = !compare[e.index]
			tabs.forEach((ele, index) => {
				if (ele === e) {
					tabs.splice(index, 1)
					this.setState({ compare: compare, tabs: tabs, count: count - 1 })
				}
			})
		}
	}

	renderItem(i) {
		return (
			<Item
				value={i}
				onClick={this.handleClick}
				cap={this.state.compare[i.index]}
			/>
		);
	}

	filterItem = (i) => {
		var ele = []
		for (let c = prodData.length - 1; c >= 0; c--) {
			if ( prodData[c].price<=i.prices  &&  prodData[c].camera<=i.cams  &&  prodData[c].size<=i.sizes ) {
				ele.push(prodData[c])
			}
		}
		for(let o = ele.length-1;o>=0;o--){
			i.prods.forEach((element)=>{
				console.log(ele[o])
				if(element===ele[o].manufacturer){
					ele.splice(o,1)
				}
			})
		}
		console.log(i)
		this.setState({ items: ele })
	}

	render() {
		var ele = []
		var tab = this.state.count === 0 ? "" : <Compare tab={this.state.tabs} />
		this.state.items.forEach((element) => ele.push(this.renderItem(element)))
		return (
			<>
				<div className="ctn1">
					<h2>The Mobile Storep</h2>
				</div>
				<Filter updater={this.filterItem} />
				<div className="ctn2">
					{ele}
				</div>
				{tab}
			</>
		);
	}
}


ReactDOM.render(<ItemList />, document.getElementById("root"));

