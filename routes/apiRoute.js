const express = require('express');
const router = express.Router();
const apiModel = require('../models/apiModel.js')

router.get('/', function (req, res, next) {
  res.json({'message':'welcome'});
});


/* GET /api/customer/items - get a list of items */

router.get('/customer/items', function(req,res,next){
    let dbList = apiModel.getAllItems()
    dbList
    .then(function(dbResponse){
        let items = dbResponse.items.map(formatJSON)
        let response = {
            status : "Success",
            data : items
        }
        return response
    })
    .then(response => res.json(response))
})

// POST /api/customer/items/:itemId/purchases - purchase an item
// Expecting a parameter of ?given_money={int}
router.post('/customer/items/:itemId/purchase', function(req,res,next){
    let purchase = apiModel.purchaseItem(req.params.itemId,req.body.given_money)
    purchase.then(function(data){
        data.item = formatJSON(data.item,false)
        res.json(data)
    })
    .catch(function(data){
        data.item = formatJSON(data.item,false)
        res.json(data)        
    })
})

// GET /api/vendor/purchases - get a list of all purchases with their item and date/time
router.get('/vendor/purchases', function(req,res,next){
    let purchases = apiModel.getPurchases()
    purchases.then(
        function(data){
            data.purchases = data.purchases.map(function(item){
                return formatJSON(item,true)
            })
            res.json(data)
        }
    )
    .catch(res.json)
})
// GET /api/vendor/money - get a total amount of money accepted by the machine
router.get('/vendor/money', function(req,res,next){
    let moneys = apiModel.getMoney()
    moneys.then(function(data){
        res.json(data)
    })
    .catch(function(data){
        res.json(data)
    })
})

// POST /api/vendor/items - add a new item not previously existing in the machine

// PUT /api/vendor/items/:itemId - update item quantity, description, and cost




//Helper functions
const dbToJSON = {
    iditems:'id',
    item_name: 'name',
    item_description:'description',
    item_quantity: 'quanity',
    item_cost: 'cost',
    item_active: 'active',
    status: 'status',
    errorMessage: 'errorMessage'
}

/*  This takes a JSON object from the apiModel and can rename db properties
*   to the defined naming convention for the API structure in dbToJSON. If 
*   'includeAllFields' is true/exists, all original obj fields will also be left
*   on. Otherwise all fields are stripped off that do not match dbToJSON.
*/
function formatJSON(objJSON,includeAllFields){
    console.log("Hello")
    let returnObj = {}
    Object.keys(objJSON).forEach(function(key){
        if (key in dbToJSON){
            returnObj[dbToJSON[key]] = objJSON[key]
        } else if(includeAllFields){
            returnObj[key] = objJSON[key]
        }
    })
    return returnObj
}
module.exports = router;