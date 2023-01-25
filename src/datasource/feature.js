const mongoose = require('mongoose');
const FCode = mongoose.model('fcode', new mongoose.Schema({
    code: String,
    desc: String,
    roles: [String],
    members: [String],
}));

class FeatureError extends Error {
    constructor(message, code) {
        super(message);
        this.name = "Feature Error";
        this.code = code;
    }
}

/**
 * @description get features avaliable
 * @param {Object} option - param option
 * @param {string} option.code - Fcode
 * @param {string} option.roles - roles of member
 */
module.exports.getFeatures = async ({ roles = [], memberId }) => {
    if (parseInt(process.env.DEV_DB_MODE)) return FEATURES_FOR_TEST;

    const query = roles.lengt > 0 || memberId ? { $or: [{ roles: { $in: roles } }, { members: memberId }] } : {};
    await mongoose.connect(process.env.BBB_DB, { useNewUrlParser: true, useUnifiedTopology: true });
    const codes = await FCode.find(query).lean();
    await mongoose.disconnect();
    return codes;
}

/**
 * @description get feature from a specific member
 * @param {Object} option - param option
 * @param {string} option.code - Fcode
 * @param {string} option.roles - roles of member
 * @param {string} option.memberId - id of member
 */
module.exports.getFeature = async ({ code, roles, memberId }) => {
    if (parseInt(process.env.DEV_DB_MODE)) return FEATURES_FOR_TEST;

    await mongoose.connect(process.env.BBB_DB, { useNewUrlParser: true, useUnifiedTopology: true });
    const fcode = await FCode.findOne({ code }).lean();
    await mongoose.disconnect();
    if (fcode == null) throw new FeatureError(`fcode ${code} doesnt exist`, 404);
    const authRole = fcode.roles.filter(fc => roles.includes(fc)) > 0;
    const authMember = fcode.members.includes(memberId);
    if (authRole || authMember) return fcode;
    throw new FeatureError(`you not authorized`, 401)
}

module.exports.addFeature = async ({ code, roles, members }) => {
    if (parseInt(process.env.DEV_DB_MODE)) return FEATURES_FOR_TEST;

    await mongoose.connect(process.env.BBB_DB, { useNewUrlParser: true, useUnifiedTopology: true });
    const feature = new FCode({ code, roles, members });
    feature.save(err => {
        if (err) return err;
    })
    await mongoose.disconnect();
};
module.exports.updateFeature = async ({ code, roles, members }) => {
    if (parseInt(process.env.DEV_DB_MODE)) return FEATURES_FOR_TEST;

    await mongoose.connect(process.env.BBB_DB, { useNewUrlParser: true, useUnifiedTopology: true });
    const feature = await FCode.findOne({ code });
    feature.roles = roles;
    feature.members = members;
    feature.save(err => {
        if (err) {
            console.log("mongoose error");
            console.log(err);
            return err;
        };
    })
    await mongoose.disconnect();
};

const FEATURES_FOR_TEST = [
    {
        code: 'A003',
        roles: ['740240464875356225', '836409034323132426'],
        members: ['1', '2']
    },
    {
        code: 'A002',
        roles: ['90945371452224fff7198'],
        members: ['2']
    },
    {
        code: 'A001',
        roles: ['962363518747816009'],
        members: ['435097195482447899']
    }
]