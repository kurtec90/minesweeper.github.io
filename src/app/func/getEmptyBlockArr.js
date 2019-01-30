import levelParam from '../levelParam';

function getMatrix(game, level) {

    let
      matrix = [],
      matrixRow = [],
      count = 0,
      matrixWidth = levelParam.filter(function(item) {
          return item.name === level;
      })[0].width;

    // transform to matrix
    game.forEach((item, i) => {

        matrixRow.push(item);
        count++;

        if (count === matrixWidth) {

            matrix.push(matrixRow);
            matrixRow = [];
            count = 0;
        }
    })

    return matrix;
}

function getIdLocation(id, matrix){

    let location = {};

    matrix.forEach((arr, i) => {

      arr.forEach((item, j) => {

        if (item.id === Number(id)) {
            location.i = i;
            location.j = j;
            return;
        }
      })
    })

    return location;
}

function getSideBySideIdArr(matrix, location) {

    let sideBySideId = [
      matrix[location.i][location.j+1] === undefined ? null : matrix[location.i][location.j+1].id,
      matrix[location.i][location.j-1] === undefined ? null : matrix[location.i][location.j-1].id
    ];

    if (matrix[location.i+1] !== undefined) {

      sideBySideId.push(
        matrix[location.i+1][location.j] === undefined ? null : matrix[location.i+1][location.j].id,
        matrix[location.i+1][location.j+1] === undefined ? null : matrix[location.i+1][location.j+1].id,
        matrix[location.i+1][location.j-1] === undefined ? null : matrix[location.i+1][location.j-1].id
      )
    }

    if (matrix[location.i-1] !== undefined) {

      sideBySideId.push(
        matrix[location.i-1][location.j] === undefined ? null : matrix[location.i-1][location.j].id,
        matrix[location.i-1][location.j+1] === undefined ? null : matrix[location.i-1][location.j+1].id,
        matrix[location.i-1][location.j-1] === undefined ? null : matrix[location.i-1][location.j-1].id
      )
    }

    return sideBySideId;
}

function getEmptyBlockArr(id, game, level) {

    let
        count = 0,
        ID = Number(id),
        resultIdArr = [ID], // all block change blockstate 'open'
        emptyIdArr = [ID], // all block empty
        matrix = getMatrix(game, level);

    while (emptyIdArr.length !== count) {

        let
          checkId = emptyIdArr[count],
          location = getIdLocation(checkId, matrix),
          sideBySideIdArr = getSideBySideIdArr(matrix, location);

          sideBySideIdArr.forEach(function (sideId) {

              let filterResult, filterEmpty;

              if (sideId === null) {
                  return;
              }

              filterResult = resultIdArr.filter((item) => {
                return item === sideId;
              })

              if (filterResult.length === 0) {
                resultIdArr.push(sideId);
              }

              if (game[sideId].content === 0) {

                filterEmpty = emptyIdArr.filter((item) => {
                  return item === sideId;
                })

                if (filterEmpty.length === 0) {
                  emptyIdArr.push(sideId);
                }
              }
          });

          count++;
    }

    return resultIdArr;
}

export default getEmptyBlockArr;
