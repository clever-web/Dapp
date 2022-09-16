// import useFetch from "use-http";
import { Redirect, Route, Switch } from 'react-router-dom';

import Layout from 'CONTAINERS/Layout';
import Home from 'PAGES/Home';
import Swap from 'PAGES/Swap';
import StableSwap from 'PAGES/StableSwap';
import Pool from 'pages/Pool';
import Bridge from 'pages/Bridge';
import Farms from 'pages/Farms';
import V1alpha from 'pages/V1alpha';
import EarlyAdoptionProgram from 'pages/EarlyAdoptionProgram';
import useEagerConnect from 'hooks/useEagerConnect';

const App = () => {
	useEagerConnect();

	return (
		<Layout>
			<Switch>
				<Route exact path='/' render={(props) => <Home {...props} />} />
				<Route exact path='/swap' component={Swap} />
				<Route exact path='/swap' component={Swap} />
				<Route exact path='/stable-swap' component={StableSwap} />
				<Route exact path='/farms' component={Farms} />
				<Route exact path='/pools' component={Pool} />
				<Route exact path='/bridge' component={Bridge} />
				<Route exact path='/v1alpha' component={V1alpha} />
				{/* <Route exact path='/early-adoption-program' component={EarlyAdoptionProgram} /> */}
				<Redirect to='/' />
			</Switch>
		</Layout>
	);
};

export default App;
