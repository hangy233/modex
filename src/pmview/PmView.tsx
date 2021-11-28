// type PmViewProps = {
//   nid: number,
// };

import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import { LinkWithQuery } from "../linkwithquery/LinkWithQuery";
import styles from "./PmView.module.css"

const PmView = () => {
  const {nationalId} = useParams();
  let [searchParams, setSearchParams] = useSearchParams();

  return <>
    <LinkWithQuery to={`/`}>{'<-'}</LinkWithQuery>
    <span>{searchParams.get('version')}</span>
    <span>{nationalId}</span>
    </>;
};

export default PmView;
