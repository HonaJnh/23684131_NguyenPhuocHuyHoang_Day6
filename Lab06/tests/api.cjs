const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts']=(mod,file)=>mod._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,file);
require.extensions['.png']=(mod,file)=>{mod.exports=file};
async function main(){
 const apiPath=require.resolve('../src/api/phoneApi.ts');
 delete process.env.EXPO_PUBLIC_API_URL;
 const offline=require(apiPath);
 const phone=await offline.fetchPhone('1');assert.equal(phone.price,1790000);
 await assert.rejects(offline.fetchPhone('missing'),/Không tìm thấy/);
 assert.equal(offline.validatePhone(phone),phone);
 for(const invalid of [null,{}, {...phone,price:-1},{...phone,rating:8},{...phone,colors:['purple']},{...phone,defaultColor:'purple'}])assert.throws(()=>offline.validatePhone(invalid));
 delete require.cache[apiPath];process.env.EXPO_PUBLIC_API_URL='https://example.test/api/v1/';
 const online=require(apiPath);assert.equal(online.API_URL,'https://example.test/api/v1');
 const original=global.fetch;
 try{
  global.fetch=async(url)=>{assert.equal(url,'https://example.test/api/v1/phones/1');return {ok:true,json:async()=>phone}};
  assert.deepEqual(await online.fetchPhone('1'),phone);
  global.fetch=async()=>({ok:false,status:503});await assert.rejects(online.fetchPhone('1'),/503/);
  global.fetch=async()=>({ok:true,json:async()=>({})});await assert.rejects(online.fetchPhone('1'),/định dạng/);
  global.fetch=async()=>{throw new Error('Network offline')};await assert.rejects(online.fetchPhone('1'),/Network offline/);
  global.fetch=async()=>({ok:true,json:async()=>phone});assert.equal((await online.fetchPhone('1')).id,'1');
 }finally{global.fetch=original;delete process.env.EXPO_PUBLIC_API_URL}
 console.log('PASS: offline data, missing ID, schema, URL, HTTP error, malformed response, network error and retry success.');
}
main().catch(e=>{console.error(e);process.exitCode=1});

