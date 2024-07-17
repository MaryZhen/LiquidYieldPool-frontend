import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type FarmingFormProps = {
  chainId,
  depositTokenAddress,
  earnedTokenAddress,
  stakingAddress,
  poolId,
  available,
  depositSymbol,
  earnedSymbol,
  title,
  depositLogo,
  earnedLogo,
  getLptHref,
  aprRate,
  aprUrl
}
interface FarmModalState {
  visiable: boolean;
  initPoolInfo: FarmingFormProps;
  tabKey: string
}
const initialState: FarmModalState = {
    visiable: false,
    initPoolInfo: {} as FarmingFormProps,
    tabKey: '1'
};
export const FarmModalSlice = createSlice({
  name: "farmModal",
  initialState,
  reducers: {
    setFarmModalVisible(state, action: PayloadAction<boolean>) {
        state.visiable = action.payload;
    },
    setInitPoolInfo(state, action: PayloadAction<FarmingFormProps>) {
        state.initPoolInfo = {...action.payload};
    },
    setTabKey(state, action: PayloadAction<string>) {
        state.tabKey = action.payload;
    }
  }
});

export const {
    setFarmModalVisible,
    setInitPoolInfo,
    setTabKey
} = FarmModalSlice.actions;
export const selectFarmModalVisible = (state: any) => state.farmModal.visiable;
export const selectInitPoolInfo = (state: any) => state.farmModal.initPoolInfo;

export const selectTabKey = (state: any) => state.farmModal.tabKey;

export default FarmModalSlice.reducer;