import { Outlet } from "react-router-dom";
import Header from "../../Components/Header/Header";

const Root = () => {
    return (
        <div className="relative">
            <Header />
            <Outlet />
        </div>
    );
};

export default Root;