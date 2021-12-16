// type PmViewProps = {
//   nid: number,
// };

import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Link, useSearchParams } from "react-router-dom";
import { LinkWithQuery } from "../linkwithquery/LinkWithQuery";
import { getSpriteUrl } from "../utils";
import { VERSION } from "../utils/consts";
import styles from "./PmView.module.css"
import { fetchPokemonInfo } from "../fetcher/utils";
import { PmInfoContext } from "../pminfo/PmInfoContext";
import { LocaleContext } from "../i18n/LocaleContext";

const PmView = () => {
  const {nationalId: nationalIdParam} = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const versionStr = searchParams.get('version');
  const nationalId = nationalIdParam ? parseInt(nationalIdParam,10) : 1;
  const version = versionStr ? parseInt(versionStr, 10) : VERSION.red;
  const {getInfo, fetchInfo} = useContext(PmInfoContext);
  const {strings} = useContext(LocaleContext);
  const [info, setInfo] = useState(getInfo(nationalId));
  const {height, weight, hasGenderDifferences} = info;
  useEffect(() => {
    if (info.height !== -1) return;
    fetchInfo(nationalId).then((res) => setInfo(res));
  }, [info, nationalId]);

  useEffect(() => {
    setInfo(getInfo(nationalId));
  }, [nationalId]);
  
  return <>
    <LinkWithQuery to={`/`}>{'<-'}</LinkWithQuery>
    <span>{searchParams.get('version')}</span>
    <span>{nationalId}</span>

    <div>
      <div>
        <div
            className={styles.image}
            style={{backgroundImage: `url(${getSpriteUrl({version ,nationalId})})`}}
            >
        </div>

        <span>{nationalId}</span>
      </div>

      <div>
        <span>name</span>
        <span>category</span>
        <span>HT {`${(height/10).toFixed(1)} m`}</span>
        <span>WT {`${(weight/10).toFixed(1)} kg`}</span>
      </div>
    </div>

    <div>{strings[`${nationalId}_${version}_entry`]}</div>
    </>;
};

export default PmView;
