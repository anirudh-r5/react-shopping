import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import prodData from './products.json'


function Item(props) {
	var cap = props.cap ? "Remove" : "Compare"
	return (
		<div className="itemCtn">
			<img src={require(`${props.value.image}`)} alt="Unavailable"/>
			<div className="hoverlay"></div>
			<div className="compCtn" onClick={(e) => props.onClick(e, props.value)}>{cap}</div>
			<div className="cap1">{props.value.price}</div>
			<div className="cap2">{props.value.product}</div>
			<div className="cap3">{props.value.desc}</div>
		</div>
	);
}
class Filter extends React.Component {
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
	render() {
		return (
			<div className="filter ctn0">
				<h2>Filter:</h2>
				<form>
					<label>Manufacturer:</label>
				</form>
			</div>
		)
	}
}
class Compare extends React.Component {
	render() {
		var heads = []
		var prices = []
		var screen = []
		var cam = []
		console.log(this.props.tab)
		this.props.tab.forEach((ele) => {
			heads.push(<th>{ele.product}</th>)
			prices.push(<td>{ele.price}</td>)
			screen.push(<td>{ele.size}</td>)
			cam.push(<td>{ele.camera}</td>)
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
			count: 0
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

	render() {
		var ele = []
		var tab = this.state.count === 0 ? "" : <Compare tab={this.state.tabs} />
		this.state.items.forEach((element) => ele.push(this.renderItem(element)))
		return (
			<>
				<div className="ctn1">
					<h2>Compare Items!</h2>
				</div>
				<Filter value={prodData}/>
				<div className="ctn2">
					{ele}
				</div>
				{tab}
			</>
		);
	}
}


ReactDOM.render(<ItemList />, document.getElementById("root"));

