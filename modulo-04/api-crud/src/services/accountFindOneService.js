import { accountModel } from "../models/accountModel.js";
import Error from "../shared/Error.js";

const accountFindOneService = {
  async execute(branchCode, accountNumber) {
    const account = await accountModel.find({
      agencia: Number(branchCode),
      conta: Number(accountNumber),
    });

    if (account.length <= 0) {
      throw new Error("account not found.");
    }

    return account[0];
  },
};
export default accountFindOneService;
