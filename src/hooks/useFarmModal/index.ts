import { useSelector, useDispatch } from "react-redux";
import {
    selectFarmModalVisible,
    setFarmModalVisible,
    selectInitPoolInfo,
    selectTabKey,
    setInitPoolInfo,
    setTabKey
  } from "@/redux/modules/farmModal";

export function useFarmModal () {
    const dispatch = useDispatch();
    const setFormVisible = (visible: boolean) => {
        dispatch(setFarmModalVisible(visible))
    }
    const setFarmFormInfo = (poolInfo: any) => {
        dispatch(setInitPoolInfo(poolInfo))
    }

    const setActiveTabKey = (key: string) => {
        dispatch(setTabKey(key))
    }

    const isvisible: boolean = useSelector(selectFarmModalVisible);
    const farmFormInfo = useSelector(selectInitPoolInfo);
    const activeTabKey: string = useSelector(selectTabKey)
    return {
        isvisible,
        farmFormInfo,
        activeTabKey,
        setFormVisible,
        setFarmFormInfo,
        setActiveTabKey
    }
}