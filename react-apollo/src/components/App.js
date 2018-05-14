import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import DevTools from "mobx-react-devtools";
import CampaignList from './CampaignList/CampaignList';

// import TopBar from "./TopBar";

@inject("store")
@observer
export default class App extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}

	render() {
		return (
			<div className="wrapper">
				<CampaignList {...this.store} />
			</div>
		);
	}
}
