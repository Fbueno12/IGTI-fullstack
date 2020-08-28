import { accountModel } from "../models/accountModel.js";

const accountHighestBalanceService = {
  async execute(customers) {
    return await accountModel
      .find({})
      .sort({ balance: -1, name: 1 })
      .limit(Number(customers));
  },
};

export default accountHighestBalanceService;
