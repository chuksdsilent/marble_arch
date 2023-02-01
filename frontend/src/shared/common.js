export const convertPicturetoBase64 = (file: any, cb: any) => {
  //   var ext = file.split(".").pop();
  let reader = new FileReader();
  // if(ext !== "jpg" || ext !== "jpeg" || ext !== "png"){
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (error) {
    console.log("Error: ", error);
  };
  // }else{
  //     reader.onload = function () {
  //         cb("error")
  //     };
  //     reader.onerror = function (error) {
  //         console.log('Error: ', error);
  //     };
  // }
};
