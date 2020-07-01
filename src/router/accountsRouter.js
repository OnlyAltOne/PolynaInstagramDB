const express = require('express')
const router = new express.Router
const Account = require('../models/accountModel')
const { handlebars } = require('hbs')

router.get('/database', async(req, res) => {
    Account.find({}, function (err, accounts) {
        res.render('viewDB', {accounts:accounts})
    })
})

router.get('/database/account?:url', async (req, res) => {
    try {
        const account = await Account.findOne({url: req.query.url})
        res.render('viewDB', {
                account: account
            })
    } catch (e) {  
        res.status(400).send(e)
    }
})



router.post('/database/account', async(req, res) => {
    const account = createAccount(req.body)
    try {
        await account.save()
        res.redirect('/addaccount')
    } catch (e) {
        res.status(400).send(e)
    }
})

function createAccount(body){
    values = calculateReachTAsubscriberCost(body)
    const newAccount = new Account(body)
    newAccount.TA = values.TA.toFixed(2)
    newAccount.costReach = values.costReach.toFixed(2)
    newAccount.costReachTA = values.costReachTA.toFixed(2)
    newAccount.subscriberCost = values.subscriberCost.toFixed(2)
    return newAccount
}
function calculateReachTAsubscriberCost(body){
    const TA = body.percentTAgeo/100 * body.percentTAage/100 * body.percentTAsex/100 || 0
    const costReach = body.cost / body.reach || 0
    const costReachTA = body.cost / (body.reach * TA) || 0
    const subscriberCost = body.cost / body.subscribersIncome || 0
    return {TA, costReach, costReachTA, subscriberCost}
}

module.exports = router 