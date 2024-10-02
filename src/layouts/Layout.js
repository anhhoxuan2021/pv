import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from "./Header";
import MainNav from "./MainNav";

function Layout() {
  return (
    <>
     <Header />
     <MainNav />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;