import React from "react";
import Header from './header';


// 包含页头页尾等相关公共样式集合
interface layoutType {
    children: JSX.Element
}
function Layout (props:layoutType) {
    return (
        <>
            <Header></Header>
            {props.children}
            
        </>
    )
}

export default Layout;