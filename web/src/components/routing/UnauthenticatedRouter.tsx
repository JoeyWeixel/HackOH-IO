import { createBrowserRouter } from "react-router-dom";
import SUSI from "@/pages/susi/SUSI.tsx";

const UnauthenticatedRouter = createBrowserRouter([
    {
        path: "*",
        element: <SUSI />,
    },
]);

export default UnauthenticatedRouter;