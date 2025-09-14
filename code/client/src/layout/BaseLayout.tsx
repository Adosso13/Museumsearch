import { Outlet } from "react-router-dom";
import Footer from "../component/common/Footer";
import Header from "../component/common/header/Header";

const BaseLayout = () => {
	return (
		<>
			<Header />
			{/* emplacement du composant lié à la route */}
			<Outlet />
			<Footer />
		</>
	);
};
export default BaseLayout;
