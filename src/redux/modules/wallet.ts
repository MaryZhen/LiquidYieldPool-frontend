import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface chainobject {

}
interface WalletState {
  iswalletshow: boolean;
  chain: chainobject | undefined
}
const initialState: WalletState = {
  iswalletshow: false,
  chain: undefined
};
export const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletShow: (state, action: PayloadAction<boolean>) => {
        state.iswalletshow = action.payload;
    },
    setWalletChain: (state, action: PayloadAction<chainobject>) => {
        state.chain = {...action.payload}
    }
  }
});

export const {
    setWalletShow,
    setWalletChain
} = walletSlice.actions;
export const selectWallet = (state: any) => state.wallet.iswalletshow;
export const selectwalletchain = (state: any) => state.wallet.chain;

export default walletSlice.reducer;