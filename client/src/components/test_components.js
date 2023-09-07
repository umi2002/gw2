import React from "react";
import { useFetchServerInfo } from "./fetch_server";

function TestComponent() {
    const serverInfo = useFetchServerInfo();

    return <p>Server Info: {serverInfo}</p>;
}

export {
    TestComponent
}
