angular.module('autocomplete_module')
  .service('autocomplete_service', [function() {

    var Node = function() {
      this.value;
      this.children = {};  //keys will be single letters, values are nodes
      this.noteKeys = [];
    }

    Node.prototype.insert = function(inputStr, noteKey) {
      var recur = function(node, index){
        var currLetter = inputStr[index];
        if(index === inputStr.length) {
          node.noteKeys.push(noteKey);
          return;
        }
        if(currLetter in node.children){
          index += 1;
          recur(node.children[currLetter], index);
        } else {
          var newNode = new Node(currLetter);
          node.children[currLetter] = newNode;
          index += 1;
          recur(newNode, index);
        }
      };
      recur(this, 0);
    };

    /*
    * autocomplete finds all complete words that match the input substring:
    */
    Node.prototype.autocomplete = function(subStr) {
      var results = [];
      var runningStr = [];  //path of letters storage in an array, later converted to a string
      var recur = function(node, index) {
        if(index >= subStr.length){  //traverse tree past subStr and add stringified leaf nodes to result array
          if(Object.keys(node.children).length == 0 && index > subStr.length){  //At a leaf node bc it has no children, and check that depth is greater than subString's length
            var resultObj = {};
            resultObj[runningStr.join('')] = node.noteKeys;
            results.push(resultObj);
          } else {
            for(var letter in node.children) {
              runningStr.push(letter);
              index += 1;
              recur(node.children[letter], index);
              runningStr.pop();
            }
          }
        } else if(subStr[index] in node.children){  //traverse tree via subStr
          var currLetter = subStr[index];
          runningStr.push(currLetter);
          index += 1;
          recur(node.children[currLetter], index);
        } else {  //subStr not found in tree
          results = null;
        }
      }
      recur(this, 0);
      return results;
    };

    var root = new Node();
    this.addNote = function(note, noteKey) {
      var strings = note.match(/\S+/g);
      for(var i = 0; strings && i < strings.length; i++) {
        root.insert(strings[i], noteKey);
      }
    };

    this.autocomplete = function(string) {
      return root.autocomplete(string);
    };

  }]);
