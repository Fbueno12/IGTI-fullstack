import { accountModel } from "../models/accountModel.js";

const accountLowerBalanceService = {
  async execute(customers) {
    const accounts = await accountModel
      .find({})
      .sort({ balance: 1 })
      .limit(Number(customers));

    return accounts;
  },
};

export default accountLowerBalanceService;
