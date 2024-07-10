import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import {
    selectMediaquery,
    setMediaquery
  } from "@/redux/modules/mediaquery";
export const useResponsiveInit = () => {
    const dispatch = useDispatch();
    const _setMediaQuery = () => {
        const isDeskTop = window.innerWidth > 768;
        dispatch(setMediaquery(isDeskTop));
    };
    useEffect(() => {
        _setMediaQuery();
        window.addEventListener('resize', _setMediaQuery)
    }, []);
};
export const useResponsive = () => {
    const isDeskTop = useSelector(selectMediaquery);
    return { isDeskTop };
}