import { configureStore } from "@reduxjs/toolkit";
import mediaqueryReducer from "./modules/mediaquery";
import walletReducer from "./modules/wallet";
import contractReducer from "./modules/contract";
import farmModalReducer from "./modules/farmModal";

export default configureStore({
  reducer: {
    mediaquery: mediaqueryReducer,
    wallet: walletReducer,
    contract: contractReducer,
    farmModal: farmModalReducer
  }
});