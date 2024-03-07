import React from "react";
import { Alert } from "antd";

export default function UncaughtErrorStub(){
    return (
        <Alert
            message="Ошибка"
            description="Какая-то неизвестная ошибка"
            type="error"
            showIcon
            style={{
                    width: "300px",
                    margin: "auto"
                }}
        />
    )
}