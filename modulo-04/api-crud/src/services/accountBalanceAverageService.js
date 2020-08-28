import { accountModel } from "../models/accountModel.js";

const accountBalanceAverageService = {
  async execute(branchCode) {
    const accounts = await accountModel.find({ agencia: Number(branchCode) });
    const balanceAmount = accounts.reduce((acc, account) => account.balance);

    return balanceAmount / accounts.length;
  },
};

export default accountBalanceAverageService;
