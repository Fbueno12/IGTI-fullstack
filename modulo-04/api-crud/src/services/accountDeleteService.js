import { accountModel } from "../models/accountModel.js";
import Error from "../shared/Error.js";

const accountDeleteService = {
  async execute(branchCode, accountNumber) {
    const account = await accountModel.find({
      agencia: Number(branchCode),
      conta: Number(accountNumber),
    });

    if (account.length <= 0) {
      throw new Error("account not found.");
    }

    await accountModel.deleteOne({ _id: account[0]._id });

    return await accountModel.find({
      agencia: Number(branchCode),
    });
  },
};
export default accountDeleteService;
