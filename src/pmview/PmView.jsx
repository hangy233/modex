// type PmViewProps = {
//   nid: number,
// };

import { useParams } from "react-router";

const PmView = () => {
  const {nid} = useParams();
  return <>{nid}</>;
};

export default PmView;