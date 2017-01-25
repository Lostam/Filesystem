var readlineSync = require('readline-Sync');

var fileSystem = [
  {
  id: 0, name:"root",children: [
      {
      id: 1, name:"folder1",children: [
        { id:4, name:"file2",content:"yes",type:"file" }
        ], type: "folder"
      },
    {
      id: 2, name:"folder2",children: [],type: "folder"
    },
    {
      id: 3, name:"file1",content: 'this is the first file',type: "file"
    }
  ], type: "folder"
  }
];

var fs = fileSystem[0];
var prevFs = fs;
var changeFlag=false;
var biggestId=0;

createFile("file3","blabla");

printUnderCurFolder();
changeFolder("folder1");
printUnderCurFolder();
changeFolder("root");
printUnderCurFolder();
changeFolder("folder1");
deleteFilder ("file2");
printUnderCurFolder();
changeFolder("blabla")

folderSearch(fileSystem[0],"file")

function getChildrenLength (currentFs){
  return currentFs.children.length;
}

function getId (currentFs){
  return currentFs.id;
}

function getType (currentFs){
  return currentFs.type;
}

function getBiggestId (){
  getBiggestId2(fileSystem[0]);
  return biggestId;
}

function getBiggestId2 (rootFs){
  for (var i=0;i<getChildrenLength(rootFs);i++){
    if (getType(rootFs.children[i]) == "folder" ){
      getBiggestId2(rootFs.children[i]);
    }
    biggestId = Math.max (biggestId,getId(rootFs.children[i]))
  }
}

function checkIfNameExist (nameCheck){
   nameExistFlag =true;
  checkIfNameExist2 (fileSystem[0],nameCheck);
  return  nameExistFlag;
}

function checkIfNameExist2(rootFs,nameCheck){
  //console.log(rootFs.children);
  for (var i=0;i<getChildrenLength(rootFs);i++){
    if (getType(rootFs.children[i]) == "folder" ){
      checkIfNameExist2 (rootFs.children[i]);
    }
    if (rootFs.children[i].name==nameCheck){
      nameExistFlag =  false;
    }
  }
}

function createFile (fileName,contentText){
  if (getType(fs)=="folder"){
    if (checkIfNameExist(fileName)){
      fs.children.push({id: getBiggestId() , name: fileName,content:contentText,type:"file"});
    }
    else { console.log("file name already exists");
    }
  }
  else { console.log("Can't create file inside a file");
  }
}

function createFolder (folderName){
  if (getType(fs)=="folder"){
    if (checkIfNameExist(fileName)){
      fs.children.push({id: getBiggestId() , name: folderName,children: [],type:"folder"});
    }
    else { console.log("folder name already exists");
    }
  }
  else { console.log("Can't create folder inside a file");
  }
}

function printUnderCurFolder (){
  if (fs.type=="folder"){
    console.log(fs.name);
    for (var i=0;i<getChildrenLength(fs);i++){
      console.log("  ",fs.children[i].name);
    }
  }
  else {
    console.log(fs.name);
  }
  promptQuestion ("");

}

function deleteFilder (fileToDelete){
  if (fs.type=="folder"){
    console.log(getChildrenLength(fs));
    for (var i=0;i<getChildrenLength(fs);i++){
      if (fs.children[i].name==fileToDelete){
        fs.children.splice(i,1);
        i--;
        console.log(getChildrenLength(fs));
        console.log("File was deleted");
        return true;
      }
    }
    console.log("Cant find ",fileToDelete," under current folder");
  }
  else {
    console.log("can only delete items under a folder");
  }
}

function changeFolder (desFolder) {
  changeFlag=false;
  if (checkIfFather(fileSystem[0],desFolder)){
    return true;
  }
  if (fs.type=="folder"){
    for (var i=0;i<getChildrenLength(fs);i++){
      if (fs.children[i].name==desFolder){
        fs=fs.children[i];
        console.log("Moved to child folder");
        return true;
      }
    }
  }
  if (changeFlag==false){
    console.log(desFolder, " Is not father nor children");
  }
}

function folderSearch (rootFs,stringSearch){ //rootFs init is root folder
  checkIfStringContanin(rootFs.name,stringSearch)
  for (var i=0;i<getChildrenLength(rootFs);i++){
    if (getType(rootFs.children[i]) == "folder" ){
      folderSearch(rootFs.children[i],stringSearch);
    }
    checkIfStringContanin(rootFs.children[i].name,stringSearch)
  }
}

function checkIfFather (rootFs,name){
  if (fatherChecker(rootFs,name)){
    return true;
  }
  for (var i=0;i<getChildrenLength(rootFs);i++){
    if (getType(rootFs.children[i]) == "folder" ){
      checkIfFather(rootFs.children[i],name);
      if(fatherChecker(rootFs.children[i],name)){
        return true;
      }
    }
  }
}

function fatherChecker (fatherFs,name){
  if (fatherFs.name==name){
    for (var i=0;i<getChildrenLength(fatherFs);i++){
      if (getId(fs)==getId(fatherFs.children[i])){
        console.log("Father Folder");
        fs=fatherFs;
        changeFlag=true;
        break;
      }
    }
  }
}

function checkIfStringContanin (string1,string2){
  if (string1.includes(string2)) {
    console.log("Found ", string1);
    return true;
  }
  return false;
}

function goBackQuestion (name){
  if (name=="GoBack") {
    promptQuestion("");
  }
}

function quitProgram (){
  process.exit(1);
}

function promptQuestion (lastAction) {
  console.log("");
  var action=lastAction;

  if (lastAction=="") {
    console.log("To Change Current folder enter - Change");
    console.log("To Create a File or a Folder enter - Create")
    console.log("To Search a file or a folder Under Current folder enter - Search")
    console.log("To Print the Current folder enter - Print")
    console.log("To Open a File under your current Folder enter - Open")
    console.log("To Print the Current folder and ALL it branches enter - PrintAll")
    console.log("To Delete current Folder or File enter - Delete")
    console.log("To Terminate current process enter - Quit")
    var action = readlineSync.question("Please enter your desired action:");
  }
  action = action.toUpperCase();

  switch (action) {

    case "PRINT":
      printUnderCurFolder ();
    break;

    case "CHANGE":
      console.log("");
      var change = readlineSync.question("To go back enter - GoBack\n Please Enter Target:");
      goBackQuestion(change);
      changeFolder (change);
    break;

    case "CREATE":
      var Create = readlineSync.question("To go back enter - GoBack\n Create File or a Folder?:");
      goBackQuestion(Create);
      Create = Create.toUpperCase();
        if (Create=="FILE") {
          var name = readlineSync.question("To go back enter - GoBack\n Please enter file name");
          goBackQuestion(name);
          if (name=="") {
            console.log("Cant create nameless file");
            promptQuestion("Create");
          }
          var inside = readlineSync.question("Please enter file text?");
          goBackQuestion(inside);
          if (name=="") {
            console.log("must enter text");
            promptQuestion("Create");
          }
          createFile (name,inside);
          break;
        }
        else if (Create=="FOLDER") {

          var name = readlineSync.question("To go back enter - GoBack\n Please enter folder name");
          goBackQuestion(name);
          createfolder (name);
          break;
        }
      console.log("Please select file or a folder");
      promptQuestion ("Create");
    break;

      case "SEARCH":
        var name = readlineSync.question("To go back enter - GoBack\n Please enter the requested file or folder name :  ");
        if (name=="GoBack") {
          promptQuestion("");
        }
        folderSearch (name);
      break;

    // case "OPEN":
    //   var name = readlineSync.question("To go back enter - GoBack\n Which file under current folder would you like to open? :");
    //   if (name=="GoBack") {
    //     promptQuestion("");
    //   }
    //   fileOpen(name);
    // break;

    case "QUIT":
      quitProgram();
    break;

    case "DELETE":
      fileDelete(curIndexFolder);
    break;

    // case "PRINTALL":
    //   printFolder (curIndexFolder);
    //   promptQuestion ("");
    // break;

    default:
      console.log(" ");
      console.log("Cant recognize "+action+" as an action");
      console.log("Please try again");
      promptQuestion("");
 }
}
