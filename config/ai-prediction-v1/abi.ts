export const abi = [{
    "inputs": [{ "internalType": "address", "name": "_ownerAddress", "type": "address" },
    { "internalType": "address", "name": "_adminAddress", "type": "address" },
    { "internalType": "uint256", "name": "_minBetAmount", "type": "uint256" },
    { "internalType": "uint256", "name": "_houseFee", "type": "uint256" },
    { "internalType": "uint256", "name": "_roundMasterFee", "type": "uint256" },
    { "internalType": "address", "name": "_oracleRouter", "type": "address" },
    { "internalType": "bytes32", "name": "_oracleDonID", "type": "bytes32" },
    { "internalType": "uint32", "name": "_oracleCallBackGasLimit", "type": "uint32" },
    { "internalType": "uint64", "name": "_oracleSubscriptionId", "type": "uint64" },
    { "internalType": "address", "name": "_oracleAggregatorV3PriceFeed", "type": "address" }],
    "stateMutability": "nonpayable", "type": "constructor"
},
{
    "inputs": [],
    "name": "EmptyArgs", "type": "error"
},
{
    "inputs": [],
    "name": "EmptySource", "type": "error"
},
{
    "inputs": [],
    "name": "EnforcedPause", "type": "error"
},
{
    "inputs": [],
    "name": "ExpectedPause", "type": "error"
},
{
    "inputs": [],
    "name": "NoInlineSecrets", "type": "error"
},
{
    "inputs": [],
    "name": "OnlyRouterCanFulfill", "type": "error"
},
{
    "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }],
    "name": "OwnableInvalidOwner", "type": "error"
},
{
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "OwnableUnauthorizedAccount", "type": "error"
},
{ "inputs": [], "name": "ReentrancyGuardReentrantCall", "type": "error" },
{ "inputs": [{ "internalType": "address", "name": "token", "type": "address" }], "name": "SafeERC20FailedOperation", "type": "error" },
{
    "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" },
    { "indexed": true, "internalType": "uint256", "name": "roundId", "type": "uint256" },
    { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "BetNo", "type": "event"
},
{
    "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "sender", "type": "address" },
    { "indexed": true, "internalType": "uint256", "name": "roundId", "type": "uint256" },
    { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "BetYes", "type": "event"
},
{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "HouseBalanceClaim", "type": "event" },
{
    "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "roundId", "type": "uint256" },
    { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "MasterBalanceClaim", "type": "event"
},
{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "admin", "type": "address" }], "name": "NewAdminAddress", "type": "event" },
{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "minBetAmount", "type": "uint256" }], "name": "NewMinBetAmount", "type": "event" },
{
    "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "houseFee", "type": "uint256" },
    { "indexed": false, "internalType": "uint256", "name": "roundMasterFee", "type": "uint256" }], "name": "NewOperationFees", "type": "event"
},
{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint64", "name": "newId", "type": "uint64" }], "name": "NewOracleSubscriptionId", "type": "event" },
{
    "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "requestId", "type": "bytes32" },
    { "indexed": false, "internalType": "bytes", "name": "response", "type": "bytes" },
    { "indexed": false, "internalType": "bytes", "name": "err", "type": "bytes" }], "name": "OracleRequestSent", "type": "event"
},
{
    "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "requestId", "type": "bytes32" },
    { "indexed": false, "internalType": "bytes", "name": "response", "type": "bytes" },
    { "indexed": false, "internalType": "bytes", "name": "err", "type": "bytes" }], "name": "OracleResponseReceived", "type": "event"
},
{
    "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" },
    { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event"
},
{ "anonymous": false, "inputs": [], "name": "Pause", "type": "event" },
{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Paused", "type": "event" },
{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "id", "type": "bytes32" }], "name": "RequestFulfilled", "type": "event" },
{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "bytes32", "name": "id", "type": "bytes32" }], "name": "RequestSent", "type": "event" },
{
    "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "roundId", "type": "uint256" },
    { "indexed": false, "internalType": "uint256", "name": "rewardBaseCall", "type": "uint256" },
    { "indexed": false, "internalType": "uint256", "name": "totalVolume", "type": "uint256" },
    { "indexed": false, "internalType": "uint256", "name": "totalFees", "type": "uint256" }], "name": "RewardsCalculated", "type": "event"
},
{
    "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "token", "type": "address" },
    { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "TokenRecovery", "type": "event"
},
{ "anonymous": false, "inputs": [], "name": "Unpause", "type": "event" },
{ "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Unpaused", "type": "event" },
{ "inputs": [], "name": "BET_OPTION_NO", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" },
{ "inputs": [], "name": "BET_OPTION_YES", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }], "stateMutability": "view", "type": "function" },
{ "inputs": [], "name": "MAX_OP_FEE", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
{ "inputs": [], "name": "_admin", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
{ "inputs": [{ "internalType": "uint256", "name": "roundId", "type": "uint256" }], "name": "betNo", "outputs": [], "stateMutability": "payable", "type": "function" },
{ "inputs": [{ "internalType": "uint256", "name": "roundId", "type": "uint256" }], "name": "betYes", "outputs": [], "stateMutability": "payable", "type": "function" },
{
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" },
    { "internalType": "address", "name": "", "type": "address" }], "name": "betsLedger", "outputs": [{ "internalType": "bytes32", "name": "betOption", "type": "bytes32" },
    { "internalType": "uint256", "name": "amount", "type": "uint256" },
    { "internalType": "bool", "name": "claimed", "type": "bool" }], "stateMutability": "view", "type": "function"
},
{ "inputs": [{ "internalType": "uint256[]", "name": "roundIds", "type": "uint256[]" }], "name": "claim", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
{ "inputs": [], "name": "claimHouseBalance", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
{ "inputs": [{ "internalType": "uint256", "name": "roundId", "type": "uint256" }], "name": "claimMasterBalance", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
{
    "inputs": [{ "internalType": "uint256", "name": "roundId", "type": "uint256" },
    { "internalType": "address", "name": "user", "type": "address" }], "name": "claimable", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function"
},
{ "inputs": [], "name": "coordinator", "outputs": [{ "internalType": "contract IFunctionsCoordinator", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
{
    "inputs": [{ "internalType": "string", "name": "_prompt", "type": "string" },
    { "internalType": "uint256", "name": "_lockTimestamp", "type": "uint256" },
    { "internalType": "uint256", "name": "_closeTimestamp", "type": "uint256" }], "name": "createRound", "outputs": [], "stateMutability": "payable", "type": "function"
},
{ "inputs": [], "name": "dataFeed", "outputs": [{ "internalType": "contract AggregatorV3Interface", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" },
{ "inputs": [{ "internalType": "uint256", "name": "roundId", "type": "uint256" }], "name": "endRound", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
{ "inputs": [{ "internalType": "uint256", "name": "callbackGasLimit", "type": "uint256" }], "name": "estimateFee", "outputs": [{ "internalType": "uint256", "name": "fee", "type": "uint256" }], "stateMutability": "view", "type": "function" },
{
    "inputs": [{ "internalType": "uint256", "name": "cursor", "type": "uint256" },
    { "internalType": "uint256", "name": "size", "type": "uint256" }], "name": "getAllRounds", "outputs": [{
        "components": [{ "internalType": "uint256", "name": "id", "type": "uint256" },
        { "internalType": "address", "name": "master", "type": "address" },
        { "internalType": "uint256", "name": "masterBalance", "type": "uint256" },
        { "internalType": "string", "name": "prompt", "type": "string" },
        { "internalType": "uint256", "name": "lockTimestamp", "type": "uint256" },
        { "internalType": "uint256", "name": "closeTimestamp", "type": "uint256" },
        { "internalType": "uint256", "name": "yesBetsVolume", "type": "uint256" },
        { "internalType": "uint256", "name": "noBetsVolume", "type": "uint256" },
        { "internalType": "uint256", "name": "totalVolume", "type": "uint256" },
        { "internalType": "uint256", "name": "rewardBaseCall", "type": "uint256" },
        { "internalType": "bytes32", "name": "result", "type": "bytes32" },
        { "internalType": "bytes32", "name": "oracleRequestId", "type": "bytes32" },
        { "internalType": "bytes", "name": "err", "type": "bytes" }], "internalType": "struct AiPredictionV1.Round[]", "name": "", "type": "tuple[]"
    },
    { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function"
},
{
    "inputs": [{ "internalType": "address", "name": "master", "type": "address" },
    { "internalType": "uint256", "name": "cursor", "type": "uint256" },
    { "internalType": "uint256", "name": "size", "type": "uint256" }], "name": "getMasterRounds", "outputs": [{
        "components": [{ "internalType": "uint256", "name": "id", "type": "uint256" },
        { "internalType": "address", "name": "master", "type": "address" },
        { "internalType": "uint256", "name": "masterBalance", "type": "uint256" },
        { "internalType": "string", "name": "prompt", "type": "string" },
        { "internalType": "uint256", "name": "lockTimestamp", "type": "uint256" },
        { "internalType": "uint256", "name": "closeTimestamp", "type": "uint256" },
        { "internalType": "uint256", "name": "yesBetsVolume", "type": "uint256" },
        { "internalType": "uint256", "name": "noBetsVolume", "type": "uint256" },
        { "internalType": "uint256", "name": "totalVolume", "type": "uint256" },
        { "internalType": "uint256", "name": "rewardBaseCall", "type": "uint256" },
        { "internalType": "bytes32", "name": "result", "type": "bytes32" },
        { "internalType": "bytes32", "name": "oracleRequestId", "type": "bytes32" },
        { "internalType": "bytes", "name": "err", "type": "bytes" }], "internalType": "struct AiPredictionV1.Round[]", "name": "", "type": "tuple[]"
    },
    { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function"
},
{ "inputs": [{ "internalType": "address", "name": "master", "type": "address" }], "name": "getMasterRoundsLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
{
    "inputs": [{ "internalType": "bytes32", "name": "requestId", "type": "bytes32" },
    { "internalType": "bytes", "name": "response", "type": "bytes" },
    { "internalType": "bytes", "name": "err", "type": "bytes" }], "name": "handleOracleFulfillment", "outputs": [], "stateMutability": "nonpayable", "type": "function"
},
{ "inputs": [], "name": "houseBalance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
{ "inputs": [], "name": "houseFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" },
{
    "inputs": [{ "internalType": "address", "name": "", "type": "address" },
    { "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "masterRoundIDs", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view", "type": "function"
}, {
    "inputs": [],
    "name": "minBetAmount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view", "type": "function"
}, {
    "inputs": [],
    "name": "oracleCallBackGasLimit", "outputs": [{ "internalType": "uint32", "name": "", "type": "uint32" }],
    "stateMutability": "view", "type": "function"
}, {
    "inputs": [],
    "name": "oracleDonID", "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
    "stateMutability": "view", "type": "function"
}, {
    "inputs": [],
    "name": "oracleSubscriptionId", "outputs": [{ "internalType": "uint64", "name": "", "type": "uint64" }],
    "stateMutability": "view", "type": "function"
}, {
    "inputs": [],
    "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view", "type": "function"
}, {
    "inputs": [],
    "name": "pause", "outputs": [],
    "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [],
    "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view", "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "_token", "type": "address" }, { "internalType": "uint256", "name": "_amount", "type": "uint256" }],
    "name": "recoverToken", "outputs": [],
    "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{ "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "internalType": "address", "name": "user", "type": "address" }],
    "name": "refundable", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view", "type": "function"
}, {
    "inputs": [],
    "name": "renounceOwnership", "outputs": [],
    "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
    "name": "requestsLedger", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view", "type": "function"
}, {
    "inputs": [],
    "name": "roundIdCounter", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view", "type": "function"
}, {
    "inputs": [],
    "name": "roundMasterFee", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view", "type": "function"
}, {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "roundsLedger", "outputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "address", "name": "master", "type": "address" }, { "internalType": "uint256", "name": "masterBalance", "type": "uint256" }, { "internalType": "string", "name": "prompt", "type": "string" }, { "internalType": "uint256", "name": "lockTimestamp", "type": "uint256" }, { "internalType": "uint256", "name": "closeTimestamp", "type": "uint256" }, { "internalType": "uint256", "name": "yesBetsVolume", "type": "uint256" }, { "internalType": "uint256", "name": "noBetsVolume", "type": "uint256" }, { "internalType": "uint256", "name": "totalVolume", "type": "uint256" }, { "internalType": "uint256", "name": "rewardBaseCall", "type": "uint256" }, { "internalType": "bytes32", "name": "result", "type": "bytes32" }, { "internalType": "bytes32", "name": "oracleRequestId", "type": "bytes32" }, { "internalType": "bytes", "name": "err", "type": "bytes" }],
    "stateMutability": "view", "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "_adminAddress", "type": "address" }],
    "name": "setAdmin", "outputs": [],
    "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{ "internalType": "uint256", "name": "_minBetAmount", "type": "uint256" }],
    "name": "setMinBetAmount", "outputs": [],
    "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{ "internalType": "uint256", "name": "_houseFee", "type": "uint256" }, { "internalType": "uint256", "name": "_roundMasterFee", "type": "uint256" }],
    "name": "setOperatingFees", "outputs": [],
    "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{ "internalType": "uint64", "name": "_oracleSubscriptionId", "type": "uint64" }],
    "name": "setOracleSubscriptionId", "outputs": [],
    "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }],
    "name": "transferOwnership", "outputs": [],
    "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [],
    "name": "unpause", "outputs": [],
    "stateMutability": "nonpayable", "type": "function"
}] as const;
