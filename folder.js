
var readlineSync = require('readline-Sync');

var fileSystem = [
  [0,0,"root"],
  [1,0,"folder1"],
  [2,0,"folder2"],
  [3,0,"folder3"],
  [4,1,"folder4"],
  [5,1,"folder5"],
  [6,2,"file1","im the first file"],
  [10,5,"file2","im the second file"]
];
var curIndexFolder = 0;


promptQuestion("");

function fileDelete (startPos) { // delete files,first flagging then deleting
  curIndexFolder=  fileSystem[getPlaceFromIndex(curIndexFolder)][1];
  fileDelete2 (startPos);
    for (var i=0;i<fileSystem.length;i++) {

    if (fileSystem[i][0]==-1) {

      fileSystem.splice (i,1);
      i--; //overcome array shrinking problem
    }
  }       fileSystem.splice (startPos,1);//delete father file
   promptQuestion ("");
}

function fileDelete2 (startPos) { // flag files to be deleted,recursion
  if (startPos==0) { // root folder protector
    console.log ("You cannot remove root folder")
    promptQuestion ("")
  }
  for (var i=startPos;i<fileSystem.length;i++) {
    if (fileSystem[i][1]==startPos) {
      fileDelete2 (fileSystem[i][0])
      fileSystem[i][0]=-1;
    }
  }
}

function folderSearch (fileName) { //turn filename into it's index number
  for (var i=0;i<fileSystem.length;i++) {
    if (fileSystem[i][2]==fileName) {

      if (fileSystem[i][1]==fileSystem[getIndexFromPlace(getPlaceFromName(filename))][0]) {

        console.log("You are now under your required file");
        curIndexFolder=fileSystem[i][0];
        return true;
      }
      else {
         console.log("the destination is not under you current folder");
      }
    }
  }
  console.log("Cannot find your folder,please type again");
  promptQuestion("Search")//GO TO QUESTIONING
}

function getPlaceFromNameOpen (fileName) {
  for (var i=0;i<fileSystem.length;i++) {
    if (fileSystem[i][2]==fileName) {
      return getPlaceFromIndex(fileSystem[i][0]);
    }
  }
    console.log("Cannot find desired file under the current directory,please try again");
    promptQuestion("Open")
}

function getPlaceFromName (fileName) { //turn filename into it's place
  for (var i=0;i<fileSystem.length;i++) {
    if (fileSystem[i][2]==fileName) {
      return getPlaceFromIndex(fileSystem[i][0]);
    }
  }
  console.log("Destination folder does not exist");
  promptQuestion("Change")}

function printFolder (startPos) { //print father folder,then activate recursion
  console.log(fileSystem[startPos][2]);
  printFolder2 (getPlaceFromIndex(startPos),"");
}

function printFolder2 (startPos,spaces) { //print all folders under current one,recursion
  var fatherIndex = startPos==0 ? 1 : startPos;//overcome root infinite loop
  spaces=spaces.concat(" ");
  for (var i=1;i<fileSystem.length;i++) {//Running from
    if (fileSystem[i][1]==fileSystem[startPos][0]) {
      if(getType(fileSystem[i][0])=="folder") {
        console.log(spaces, fileSystem[i][2]);
      }
      else if(getType(fileSystem[i][0])=="file") {
        console.log(spaces, fileSystem[i][2] + " " ,fileSystem[i][3]);
      }
      printFolder2 (getPlaceFromIndex(fileSystem[i][0]),spaces)
    }
  }
}

function printUnderCurFolder () {
  var father=fileSystem[curIndexFolder][0];
  console.log(father);
  for (var i=1;i<fileSystem.length;i++) {
    if (fileSystem[i][1]==father) {
      if(getType(fileSystem[i][0])=="folder") {
        console.log("  ",fileSystem[i][2]);
      }
      else if(getType(fileSystem[i][0])=="file") {
        console.log("  ",fileSystem[i][2]," ",fileSystem[i][3]);}
    }
  }
}

function getType (index) { // return either file or folder
  index = getPlaceFromIndex (index);
  if (fileSystem[index]!=undefined) { //check if the index exists
    if (fileSystem[index][3]!=undefined) {
      return "file"
    } else return "folder"
  }
  else {
    console.log ("Folder does not exist in this system");
  }
}

function getPlaceFromIndex (index) {
  for (var i=0;i<fileSystem.length;i++) {
    if (fileSystem[i][0]==index) {
      return i;
    }
  }
}

function getIndexFromPlace (place) {
  return fileSystem [place][0];
}

function changeFolder (desFolder) {
  if (fileSystem[desFolder][0]==fileSystem[curIndexFolder][1]) {
    console.log("Father Folder");
    curIndexFolder=desFolder;
    printFolder(curIndexFolder)
    promptQuestion("");
  }
  else if (fileSystem[desFolder][1]==fileSystem[curIndexFolder][0]) {
    console.log("Son Folder");
    curIndexFolder=desFolder;
    if(getType(fileSystem[desFolder][0])=="file") {
      console.log(fileSystem[curIndexFolder][2]," ",fileSystem[curIndexFolder][3] );
    }
    else {
      printFolder(curIndexFolder)
      promptQuestion("");
    }
  }
  else {
    console.log("Destination is not Father nor Son");
    promptQuestion ("Change");
}

function ifExist(fileName) {
  for (var i=0;i<fileSystem.length;i++) {
    if (fileSystem[i][2]==fileName) {
      console.log("File name already exits");
      return false
    }
  } return true
}

function createFolder(newName) {
  if (ifExist(newName)) {
    var  newIndex = (fileSystem[(fileSystem.length)-1][0])+1;
    fileSystem.push ([newIndex,fileSystem[curIndexFolder][0],newName])
    console.log("Current folder with new content");
    printFolder (curIndexFolder)
    promptQuestion("");
  }
  else {
    console.log ("folder name already exists")
    promptQuestion("Create");
  }
}

function createFile (newName,newContent) {
  if (ifExist(newName)) {
    var  newIndex = (fileSystem[(fileSystem.length)-1][0])+1;
    fileSystem.push ([newIndex,fileSystem[curIndexFolder][0],newName,newContent])
    console.log("Current folder with new content");
    printFolder (curIndexFolder)
    promptQuestion("");
  }
  else {
    console.log ("file name already exists")
    promptQuestion("Create");
  }
}

function getIndexFromName (filename) {
  for (var i=1;i<fileSystem.length;i++) {
    if (fileSystem[i][2]==filename) {
      return fileSystem[i][0];
    }
  }
}

function fileOpen (filename) {
  if (fileSystem[getPlaceFromNameOpen(filename)][1]==fileSystem[getPlaceFromIndex(curIndexFolder)][0]) {
    if (getType(getIndexFromName(filename))=="file") {
      console.log(fileSystem[getPlaceFromName(filename)][2],"  ",fileSystem[getPlaceFromName(filename)][3]);
      promptQuestion ("")
      }
    console.log("Target is not a file");
  }
  promptQuestion("Open")
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
      console.log("");
      printUnderCurFolder ();
      console.log("");
      promptQuestion ("");
    break;

    case "CHANGE":
      console.log("");
      var change = readlineSync.question("To go back enter - GoBack\n Please Enter Target:");
      if (change=="GoBack") {
        promptQuestion("");
      }
      changeFolder (getPlaceFromName(change));
    break;

    case "CREATE":
      if (getType(curIndexFolder)=="file") {

          console.log("Cant Create Inside a File");
          promptQuestion("")
      }

      var Create = readlineSync.question("To go back enter - GoBack\n Create File or a Folder?:");
      Create = Create.toUpperCase();
      if (Create=="GoBack") {
        promptQuestion("");
      }
        if (Create=="FILE") {
          var name = readlineSync.question("To go back enter - GoBack\n Please enter file name");
          if (name=="GoBack") {
            promptQuestion("");
          }
          if (name=="") {
            console.log("Cant create nameless file");
            promptQuestion("Create");
          }
          var inside = readlineSync.question("Please enter file text?");
          if (name=="") {
            console.log("must enter text");
            promptQuestion("Create");
          }
          createFile (name,inside)
        }
        else if (Create=="FOLDER") {

          var name = readlineSync.question("To go back enter - GoBack\n Please enter folder name");

          if (name=="GoBack") {
            promptQuestion("");
          }
          createFile (name)
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

    case "OPEN":
      var name = readlineSync.question("To go back enter - GoBack\n Which file under current folder would you like to open? :");
      if (name=="GoBack") {
        promptQuestion("");
      }
      fileOpen(name);
    break;

    case "QUIT":
      process.exit(1);
    break;

    case "DELETE":
      fileDelete(curIndexFolder);
    break;

    case "PRINTALL":
      printFolder (curIndexFolder);
      promptQuestion ("");
    break;

    default:
      console.log(" ");
      console.log("Cant recognize "+action+" as an action");
      console.log("Please try again");
      promptQuestion("");
  }

}
