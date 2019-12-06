
const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index += 1) {
      await callback(array[index], index);
    }
  };

const ab2str = async (buffer) => {
    const bufView = new Uint16Array(buffer);

    let str = '';

    const concat = (code) => {
        return new Promise((res) => {
            str += String.fromCharCode(code);
            setTimeout(res);
        });
    };

    await asyncForEach(bufView, concat);

    return str;

    // return String.fromCharCode.apply(null, bufView);
 };

 const str2ab = (string) => {
     const buffer = new ArrayBuffer(string.length * 2); // 2 bytes for each char
     const bufView = new Uint16Array(buffer);

     for (let i = 0, strLen = string.length; i < strLen; i++) {
         bufView[i] = string.charCodeAt(i);
     }

     return buffer;
 };

onmessage = async (message) => {
    const obj = JSON.parse(await ab2str(message.data));
    const ab = str2ab(JSON.stringify(obj));
    postMessage(ab, [ab]);
    // postMessage(message.data);
};