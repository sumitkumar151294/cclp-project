import { useSelector } from 'react-redux';
export const GetTranslationData = (resourceType, resourceKey) => {
  debugger
  const translationData = useSelector((state) => state.translationReducer);
  const value =
    translationData && translationData?.data.find(
          (item) =>
            item.clientId === "0" &&
            item.resourceType === resourceType &&
            item.resourceKey === resourceKey
        )?.resourceValue


  return value;
};