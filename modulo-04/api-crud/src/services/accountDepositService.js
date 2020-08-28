import { accountModel } from "../models/accountModel.js";
import Error from "../shared/Error.js";

const accountDepositService = {
    async execute(branchCode, accountNumber, depositValue) {
        const accountExists = await accountModel.find({
            agencia: branchCode,
            conta: accountNumber,
        });

        if (accountExists.length <= 0) {
            const STATUS = 400;
            throw new Error(STATUS, "account not found.");
        }
        const balance = accountExists[0].balance + depositValue;

        await accountModel.update(
            { _id: accountExists[0]._id },
            { $set: { balance: balance } }
        );
    }
}
export default accountDepositService;