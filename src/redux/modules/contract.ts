import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ContractState {
  walletAddress: string;
}
const initialState: ContractState = {
  walletAddress: '',
};
export const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    setWalletAddress: (state, action: PayloadAction<string>) => {
        state.walletAddress = action.payload;
    }
  }
});

export const {
    setWalletAddress,
} = contractSlice.actions;
export const selectWalletAddress = (state: any) => state.contract.walletAddress;

export default contractSlice.reducer;