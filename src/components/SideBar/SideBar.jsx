import React from "react";
import SideBarContent from "./SideBarContent";
import { useProduct } from "../../context/ProductContext";
import { Offcanvas } from "react-bootstrap";
import useWindowSize from "../../hooks/useWindowSize";
function SideBar() {
  const { isSideBarOpen, dispatch } = useProduct();
  const { width } = useWindowSize();
  const isMobile = width < 768;
  return (
    <>
      {/* large screen */}
      {isMobile ? (
        <div className="SideBar">
          <Offcanvas
            show={isSideBarOpen}
            onHide={() => dispatch({ type: "toggleSideBar" })}
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Filters</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <SideBarContent />
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      ) : (
        <div className="sidebar col-md-2 bg-light pt-3">
          <SideBarContent />
        </div>
      )}
    </>
  );
}

export default SideBar;
