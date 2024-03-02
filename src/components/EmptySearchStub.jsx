import React from "react";
import { Alert } from "antd";

export default function EmptySearchStub(){
    return (
        <Alert 
            style={{
                width: "300px",
                margin: "auto"
            }}
            message="Введите запрос"
            description="Мы пока не умеем читать мысли, введите ваш запрос"
            type="info"
            showIcon
        />
    )
}