import { NavLink, Outlet } from "react-router-dom";


const bgImg = "https://i.ibb.co/FWDxTW1/restaurant.jpg";

const Dashboard = () => {



    // navigation menu
    const adminMenu =
        <>
            <NavLink to={"/"}>Home</NavLink>
            <NavLink>Statistics</NavLink>
            <NavLink to={"/dashboard/addNewItem"}>Add Item</NavLink>
            <NavLink to={"/dashboard/allItems"}>All Items</NavLink>
            <NavLink to={"/dashboard/allUsers"}>All Users</NavLink>
        </>



    return (
        <div>
            <div className="h-[400px] flex flex-col justify-center items-center gap-4"
                style={{
                    background: `linear-gradient(to top, #000000f2, #00000072), url(${bgImg})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}>
                <h1 className="text-5xl uppercase md:text-7xl font-heading text-center">Dashboard</h1>
                <div className="flex justify-center items-center gap-5 font-body mt-2">
                    {adminMenu}
                </div>
            </div>

            {/* outlet div */}
            <div className="container mx-auto p-5">
                <Outlet />
            </div>
        </div >
    );
};

export default Dashboard;