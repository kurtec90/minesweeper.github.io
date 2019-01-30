import levelParam from '../levelParam';

function createNewGame(level) {

    let
        result = [],
        rows = [],
        idCount = 0,
        newGameParam = levelParam.filter(function(item) {
            return item.name === level;
        })[0],
        mineCount = newGameParam.width * newGameParam.height,
        mineArr = getRandomMineArr(0, mineCount, newGameParam.mine);

    // create matrix
    for (let i = 0; i < newGameParam.height; i++) {

        let partArr = [];

        for (let j = 0; j < newGameParam.width; j++) {

          partArr.push({
              id: idCount,
              isMine: mineArr.includes(idCount),
              blockState: 'close'
          })

          idCount++;
        }

        rows.push(partArr);
    }

    //add content
    rows.forEach(function(arr, i) {

        arr.forEach(function(item, j) {

          if (item.isMine) {
              return;
          }

          let
              count = 0,
              sideBySideBlock = [
                arr[j - 1],
                arr[j + 1]
              ];

          if (rows[i - 1] !== undefined) {
              sideBySideBlock.push(
                  rows[i - 1][j],
                  rows[i - 1][j-1],
                  rows[i - 1][j+1]
              )
          }

          if (rows[i + 1] !== undefined) {
              sideBySideBlock.push(
                  rows[i + 1][j],
                  rows[i + 1][j-1],
                  rows[i + 1][j+1]
              )
          }

          sideBySideBlock.forEach(function (item2) {

              if (item2 === undefined) {
                  return;
              };

              if (item2.isMine) {
                  count++;
              }
          });

          item.content = count;
        })

    })

    // transform rows to result
    rows.forEach(function(arr) {
        for (let i = 0; i < arr.length; i++) {
            result.push(arr[i]);
        }
    })

    return result;
};

function getRandomMineArr(min, max, count){

    let arr = [];

    for (var i = 0; i < count; i++) {

        let
            randomNumber = Math.floor(Math.random() * ((max-1) - min + 1) + min);
        !arr.includes(randomNumber) ? arr.push(randomNumber) : count++;
    }

    return arr;
}

export default createNewGame;
