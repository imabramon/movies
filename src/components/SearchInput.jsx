import React from "react";
import { Input } from "antd";

export default function SearchInput({changeHandler}){
    return (
        <Input placeholder="Введите, например: Великоплепный век"  defaultValue={""} onChange={changeHandler}/>
    )
}