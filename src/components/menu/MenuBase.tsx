import React from "react";
import { Link } from "react-router-dom";
import { Home } from "@material-ui/icons";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import "./Menu.scss";

interface IMenuBaseProps {
  renderElement : JSX.Element;
  currentUrl?: string;
}

export default function({ renderElement, currentUrl = "" }: IMenuBaseProps) {
  const getBreadCrumbElement = (
    breadCrumb: string,
    index: number,
    breadCrumbsCount: number
  ): any => {
    const breadCrumbDisplayName = `${breadCrumb}${
      index + 1 < breadCrumbsCount ? "/" : ""
    }`;
    return breadCrumb === "" ? (
      <Home>{breadCrumbDisplayName}</Home>
    ) : (
      breadCrumbDisplayName
    );
  };
  let breadCrumbs: Array<JSX.Element> = [];
  if (currentUrl.length > 0) {
    const urlSplit = currentUrl.split("/");
    urlSplit.pop();
    breadCrumbs = urlSplit.map((u, i) => (
      <Link
        className="crumb bangerFont"
        to={`${urlSplit
          .slice(0, i + 1)
          .map((s, i) => (i + 1 < urlSplit.length ? s + "/" : s))
          .join("")}`}
        key={i}
      >
        {getBreadCrumbElement(u, i, urlSplit.length)}
      </Link>
    ));
  }

  return (
    <div className="menuContainer">
      <Breadcrumbs classes={{ root: "breadCrumbs" }} aria-label="breadcrumb">
        {breadCrumbs}
      </Breadcrumbs>
      {renderElement}
    </div>
  );
}
