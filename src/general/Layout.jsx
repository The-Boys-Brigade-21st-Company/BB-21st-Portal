import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./general.scss";
import "./errorContainer.scss"

const Layout = () => {
	return (
		<div className="layout">
			<div className='error-container'></div>

			<div className="tip">We have moved! Check out our new website at <a href="https://portal.bb21coy.workers.dev">https://portal.bb21coy.workers.dev</a></div>
			<Header />
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
};

export default Layout;
