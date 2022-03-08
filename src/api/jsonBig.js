// 示范jsonbig.js

import JSONBig from 'json-bigint'

const jsonStr = '{"art_id":1245953273789007552}';
console.log(JSON.parse(jsonStr));//1245953273789007600
console.log(JSONBig.parse(jsonStr));//{art_id: BigNumber {s: 1, e: 18, c: Array(2)}}
console.log(JSONBig.parse(jsonStr).art_id.toString());//1245953273789007552

console.log(JSON.stringify(JSONBig.parse(jsonStr))); //{"art_id":"1245953273789007552"}
console.log(JSONBig.stringify(JSONBig.parse(jsonStr))); //{"art_id":1245953273789007552}
