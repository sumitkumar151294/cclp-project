// src/hooks/useClientId.js
import { useSelector } from 'react-redux';

const ClientId = () => {
  return useSelector(
    (state) => state.clientMasterReducer?.clientMasterData?.[0]?.clientId
  );
};
const UserId = () => {
  return useSelector(
    (state) => state.loginReducer?.data?.[0]?.userId
  );
};

export { ClientId, UserId };
