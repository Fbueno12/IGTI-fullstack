import { accountModel } from "../models/accountModel.js";
import Error from "../shared/Error.js";

const accountTransferService = {
  async execute(branchCode, accountNumber) {
    const origin = await accountModel.find({ conta: Number(originAccount) });
      const destination = await accountModel.find({
        conta: Number(destinationAccount),
      });

      if (origin.length <= 0 || destination.length <= 0) {
        throw new Error("Origin or Destination account not found.");
      }
      if (origin[0].balance < value) {
        throw new Error("Origin account doesn't have enough balance to transfer.");
      }
      let originBalance = 0;
      let destinationBalance = 0;

      if (origin[0].agencia == destination[0].agencia) {
        originBalance = origin[0].balance - Number(value);
        destinationBalance = destination[0].balance + Number(value);
      } else {
        originBalance = origin[0].balance - Number(value) - 8;
        destinationBalance = destination[0].balance + Number(value);
      }

      console.log(origin, destination);

      await accountModel.update(
        { conta: Number(originAccount) },
        { $set: { balance: originBalance } }
      );
      await accountModel.update(
        { conta: Number(destinationAccount) },
        { $set: { balance: destinationBalance } }
      );

      return originBalance;
  },
};
export default accountTransferService;
