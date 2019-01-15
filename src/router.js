import React from 'react'
import {HashRouter,Route,Switch,BrowserRouter} from 'react-router-dom'
import App from './App.js'
import Admin from './admin.js';
import Login from './pages/login/index.js';
import Errors from './pages/errors404/index.js';
import HouseList from './pages/houseInfo/houseList/index.js';
import HouseAudit from './pages/houseInfo/houseAudit/index.js';
import ListManage from './pages/infoManage/listManage/index.js';
import SystemParams from './pages/system/systemParams/index.js';
import Home from './pages/home/index.js';
import CityManage from './pages/city/cityManage/index.js';
import CityState from './pages/city/cityState/index.js';
import TimeJob from './pages/timeJob/index.js';

export default class Irouter extends React.Component{
	render(){
		return (
				<BrowserRouter>
						<App>
							<Switch>
									<Route exact path="/" component={Login}></Route>
									<Route path="/admin" render={()=>
										<Admin>
											<Switch>
												<Route path="/admin/houseInfo/houseList" component={HouseList}></Route>
												<Route path="/admin/houseInfo/houseAudit" component={HouseAudit}></Route>
												<Route path="/admin/infoManage/listManage" component={ListManage}></Route>
												<Route path="/admin/system/systemParams" component={SystemParams}></Route>
												<Route path="/admin/home" component={Home}></Route>
												<Route path="/admin/city/cityManage" component={CityManage}></Route>
												<Route path="/admin/city/cityState" component={CityState}></Route>
												<Route path="/admin/timeJob" component={TimeJob}></Route>
												<Route component={Errors}></Route>
											</Switch>
										</Admin>
									}/>
							</Switch>						
						</App>
				</BrowserRouter>
				
			)
	}
}