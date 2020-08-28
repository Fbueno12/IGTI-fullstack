import { accountModel } from "../models/accountModel.js";
import Error from "../shared/Error.js";

const accountWithdrawService = {
    async execute(branchCode, accountNumber, depositValue) {
        const accountExists = await accountModel.find({
            agencia: branchCode,
            conta: accountNumber,
          });
    
          if (accountExists.length <= 0) {
            throw new Error("account not found!");
          }
          const balance = accountExists[0].balance - withdrawValue;
          if (balance <= 0) {
            throw new Error("This account don't have suficient balance to withdraw");
          }
          await accountModel.update(
            { _id: accountExists[0]._id },
            { $set: { balance: balance } }
          );
    }
}
export default accountWithdrawService;