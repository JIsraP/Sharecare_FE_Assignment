import { Routes, Route } from "react-router-dom";
import { Registration } from "../pages";

export const AppRoutes = () => {
    const renderRoutes = () => (
        <>
            <Route path="/register" element={<Registration />} />
            <Route path="/*" element={<Registration />} />
        </>
    );

    return (
        <Routes>
            {renderRoutes()}
        </Routes>
    );
};