import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const mediaquerySlice = createSlice({
  name: "mediaquery",
  initialState: {
    isDesktop: true
  },
  reducers: {
    setMediaquery: (state, action: PayloadAction<boolean>) => {
      // Redux Toolkit 允许我们在 reducers 写 "可变" 逻辑。
      // 并不是真正的改变 state 因为它使用了 immer 库
      // 当 immer 检测到 "draft state" 改变时，会基于这些改变去创建一个新的
      // 不可变的 state
      state.isDesktop = action.payload;
    }
  }
});

export const { setMediaquery } = mediaquerySlice.actions;
export const selectMediaquery = (state: any) => state.mediaquery.isDesktop;

export default mediaquerySlice.reducer;