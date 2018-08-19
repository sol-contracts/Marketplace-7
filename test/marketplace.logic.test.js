
const MarketplaceLogic = artifacts.require("MarketplaceLogic");
const StoreLogic = artifacts.require("StoreLogic");

//var marketplaceAddr = "";

contract('marketplaceLogic js tests', async (accounts) => {

  const admin1 = accounts[0]; //Marketplace owner & Administrator
  const admin2 = accounts[1];
  const appStoreOwner1 = accounts[2];
  const appStoreOwner2 = accounts[3];

  let tryCatch = require("./exceptions.js").tryCatch;
  let errTypes = require("./exceptions.js").errTypes;

  it("constructor instanciator should have the role Admnistrator", async () => {
    instance = await MarketplaceLogic.deployed();
    let role = await instance.getUserRole(admin1);
    assert.equal(role, 0 /*RoleChoices.Administrator*/,
    "instanciator of the marketplace should also be administrator, check constructor and method getUserRole.");
  })

/*
event LogNewMarketplace(address _req);
event LogAdminAdded(address _req, address _user);
event LogAdminDeleted(address _req, address _user);
event LogApprStoreOwnerAdded(address _req, address _user );
event LogApprStoreOWnerDeleted(address _req, address _user);
event LogNewStore(address _req, address _store);
event LogStoreDeleted(address _req, address _store);
*/

  it("add Administrator.", async () => {
    let instance = await MarketplaceLogic.deployed();
    const LogMade = await instance.LogAdminAdded();
    await instance.addAdmin (admin2,{from:admin1});
    const expectedLog = {_user:admin2};
    const log = await new Promise(function(resolve, reject) {
        LogMade.watch(function(error, log){ resolve(log);});
    });
    assert.equal(expectedLog._user, log.args._user,
      "LogAdminAdded made, event _user property not emmitted, check addAdmin method.");

//    instance = await MarketplaceLogic.deployed();
//    await instance.addAdmin(Administrator2,{from : marketplaceOwner});
//    assert.equal()
//    let role = await instance.getUserRole(Administrator2);
//    assert.equal(role, 0 /*RoleChoices.Administrator*/,
//      "Administrator should be able to add administrator.");

    //await tryCatch(instance.addAdmin(Administrator2), errTypes.revert);
    //addAprovedStoreOwner
 })

 it("delete Administrator", async () => {
   let instance = await MarketplaceLogic.deployed();
   const LogMade = await instance.LogAdminDeleted();
   await instance.deleteAdmin (admin2,{from:admin1});
   const expectedLog = {_user:admin2};
   const log = await new Promise(function(resolve, reject) {
     LogMade.watch(function(error, log){ resolve(log);});
   });
   assert.equal(expectedLog._user, log.args._user,
   "LogAdminDeleted made, event _user property not emmitted, check deleteAdmin method");
 })

 it("add approved store owner.", async () => {
   let instance = await MarketplaceLogic.deployed();
   const LogMade = await instance.LogApprStoreOwnerAdded();
   await instance.addAprovedStoreOwner (appStoreOwner1,{from:admin1});
   const expectedLog = {_user:appStoreOwner1};
   const log = await new Promise(function(resolve, reject) {
       LogMade.watch(function(error, log){ resolve(log);});
   });
   assert.equal(expectedLog._user, log.args._user,
     "LogApprStoreOwnerAdded made, event _user property not emmitted, check addAprovedStoreOwner method.");
 })

 it("create 3 stores", async () => {
   let instance = await MarketplaceLogic.deployed();
   const result1 = await instance.createStore("Cars",{from : appStoreOwner1});
   const result2 = await instance.createStore("Bikes",{from : appStoreOwner1});
   const result3 = await instance.createStore("TRuck",{from : appStoreOwner1});
   //if needed, have a look at the results of teh transactionwe
   //console.log(result.tx); console.log(result.logs);console.log(result.receipt);

   //TBD : check also event name
   const adrStore = result1.logs[0].args._store; //console.log("address of the new store : "+adrStore);
   var instanceStoreLogic = await StoreLogic.at(adrStore);

   assert.equal(await instance.getStoresNum(), 3, "marketplace should have 3 stores");
   assert.equal(await instanceStoreLogic.dummy(), 42, "should get the magic number from an instanciated store, otherwise store was not created. check constructore of StoreLogic");
   })


it("retrieve stores", async () => {
  let instance = await MarketplaceLogic.deployed();
  let Stores = await instance.getStores ();
  assert.equal(Stores[0].length, 3, "marketplace should have 3 stores, check method getStores.");
  assert.equal(Stores[0].length,Stores[1].length,"should get complet information for the 3 stores");
  //console.log("***"+(Stores[1][0]).toAsc);
  //let toto = web3.utils.toHex("Cars");
  //let tata = web3.utils.hexToAscii(Stores[1][0]);
  //console.log("**"+tata);
  //console.log("*"+toto);
  //assert.equal(Stores[1][0],toto,"bad mood");
})


/*
const result = await supplyChain.fetchItem.call(sku)
assert.equal(result[0], name, 'the name of the last added item does not match the expected value')
assert.equal(result[2].toString(10), price, 'the price of the last added item does not match the expected value')
assert.equal(result[3].toString(10), 0, 'the stat
*/


 it("delete approved store owner.", async () => {
   let instance = await MarketplaceLogic.deployed();
   const LogMade = await instance.LogApprStoreOWnerDeleted();
   await instance.deleteApprovedStoredOwner (appStoreOwner1,{from:admin1});
   const expectedLog = {_user:appStoreOwner1};
   const log = await new Promise(function(resolve, reject) {
       LogMade.watch(function(error, log){ resolve(log);});
   });
   assert.equal(expectedLog._user, log.args._user,
     "LogApprStoreOWnerDeleted made, event _user property not emmitted, check deleteApprovedStoredOwner method.");

     ///TBD problem with modifier is administrat

 })

})