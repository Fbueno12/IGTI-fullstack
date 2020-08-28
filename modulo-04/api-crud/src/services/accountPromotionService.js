import { accountModel } from "../models/accountModel.js";

const accountPromotionService = {
  async execute(branchCode) {
    const accounts = await accountModel.aggregate([
      {
        $sort: {
          agencia: 1,
          balance: -1,
        },
      },
      {
        $group: {
          _id: "$agencia",
          account: {
            $push: "$$ROOT",
          },
        },
      },
      {
        $project: {
          _id: 0,
          agencia: "$_id.agencia",
          data: { $slice: ["$account", 1] },
        },
      },
    ]);

    accounts.forEach(async (account) => {
      account = account.data[0];
      const acc = await accountModel.findById(account._id);
      acc.agencia = 99;
      await acc.save();
    });

    return await accountModel.find({ agencia: 99 });
  },
};

export default accountPromotionService;
