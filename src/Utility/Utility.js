// src/hooks/useClientId.js
import { useSelector } from 'react-redux';

const useClientId = () => {
  return useSelector(
    (state) => state?.clientMasterReducer?.clientMasterData?.[0]?.id
  );
};

export default useClientId;
