import React, {useState} from "react";

import App from "../components/AdminPanel/App";

function AdminPage(){
    return(
        <div className="text-gray-600 font-mono">
            <div className="grid md:grid-cols-3">
                <App />
            </div>
        </div>
    )
}
