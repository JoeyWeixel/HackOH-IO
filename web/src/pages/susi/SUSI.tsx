import {useMsal} from "@azure/msal-react";
import {loginRequest} from "../../../authConfig.ts";
import {Button} from "@/components/ui/button.tsx";
import React from "react";

const SUSI : React.FC = () => {
    const { instance } = useMsal();

    const handleSignIn = () => {
        instance.loginRedirect({
            ...loginRequest
        }).then();
    }

    return (
        <div>
            <Button onClick={() => handleSignIn()}>
                Sign In
            </Button>
        </div>
    );
}

export default SUSI;