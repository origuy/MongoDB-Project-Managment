const MongoClient = require("mongodb").MongoClient;
let projectsDoc = [{
    "_id":1,
    "company":"Apple",
    "contact":"ליאת בר",
    "error": "",
    "type": ""
},
{
    "_id":2,
    "company":"Microsoft",
    "contact":"לי מלכה",
    "error": "",
    "type": ""
},
{
    "_id":3,
    "company":"Monday",
    "contact":"עומר גודר",
    "error": "",
    "type": ""
},
{
    "_id":4,
    "company":"Bank Of Israel",
    "contact":"עדנה גיא ליפל",
    "error": "",
    "type": ""
}]
let errorDoc = [{
    "_id":1,
    "errorType":"שרת לא מגיב",
    "responsible": "אורי גיא"
},
{
    "_id":2,
    "errorType":"הלקוח לא הציג את החומר הנדרש",
    "responsible": "לקוח "
},
{
    "_id":2,
    "errorType":"הפסקת חשמל",
    "responsible": "כוח עליון"
}
]
let typeDoc = [{
    "_id":1,
    "type":"תכנות ועיצוב אתר",
    "responsible": "Ori Guy"
},
{
    "_id":2,
    "type":"תכנות ועיצוב אפליקציה",
    "responsible": "Ori Guy"
},
{
    "_id":3,
    "type":"קידום אתרים ופרסום במדיות חברתיות ",
    "responsible": "Ori Guy"
}]
const uri =
  "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const database = client.db('PMS');
    const projects = database.collection('projects');
    const errors = database.collection('errors');
    const types = database.collection('types');
    // await addDocumentsToCollection(projects,projectsDoc);
    // await addDocumentsToCollection(errors,errorDoc);
    // await addDocumentsToCollection(types,typeDoc);
    // await addErrorToProject(projects,1,1);
    // await addErrorToProject(projects,2,2);
    // await addErrorToProject(projects,4,2);
    // await addTypeToProject(projects,1,1);
    // await addTypeToProject(projects,2,1);
    // await addTypeToProject(projects,3,2);
    // await addTypeToProject(projects,4,3);
  }catch{
    console.log("Cannot Connect")
  }finally {
    await client.close();
  }
}

async function addDocumentsToCollection(collection,docs) {
    try {
        await collection.insertMany(docs)
        console.log(`added succefully`)
    } catch (error) {
        console.log(`not added: ${error}`)
    }
}
async function addTypeToProject(collection,projectID,typeID) {
    try {
        await collection.updateOne({_id:projectID},{$set:{type:typeID}}) 
        console.log(`Updated!`);
    } catch (error) {
        console.log(`not Updated: ${error}`);
    }

}
async function addErrorToProject(collection,projectID,errorID) {
    try {
        await collection.updateOne({_id:projectID},{$set:{error:errorID}}) 
        console.log(`Updated!`);
    } catch (error) {
        console.log(`not Updated: ${error}`);
    }

}
async function updateTypeResponsiable(collection,typeID,responsibleValue){
    try {
        await collection.updateOne({_id:typeID},{$set:{responsible:responsibleValue}})
        console.log(`Updated!`);
    } catch (error) {
        console.log(`cannot update the responsible type ${error}`)
    }
}
async function deleteErrorById(collection,errorId){
    try {
        await collection.deleteOne({_id:errorId})
        console.log("Deleted!")
    } catch (error) {
        console.log("not Deleted")
    }
}
async function findProjectsByError(collection,errorId){
    try {
        let searchResult = await collection.find({error:errorId}).forEach(result => {
            console.log(result)
        })
        console.log("Finished Search & Print");
    } catch (error) {
        console.log("not Found")
    }
}
async function findProjectsByType(collection,typeId){
    try {
        let searchResult = await collection.find({type:typeId}).forEach(result => {
            console.log(result)
        })
        console.log("Finished Search & Print");
    } catch (error) {
        console.log("not Found")
    }
}
run()