(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */

     function getNeibs(map, i, j) {
        var result = [];
        if (i != 0 && map[i-1][j] != 0) {
            result.push(map[i-1][j]);
        }
        if (i+1 != map.length && map[i+1][j] != 0) {
            result.push(map[i+1][j]);
        }
        if (j != 0 && map[i][j-1] != 0) {
            result.push(map[i][j-1]);
        }
        if (j+1 != map[i].length && map[i][j+1] != 0) {
            result.push(map[i][j+1]);
        }
        return result;
     }

     function merge(old2New, new2Old, first, second) {
        if (old2New[first] != old2New[second]) {
            var oldNum = old2New[second];
            var pieces = new2Old[old2New[second]];
            for (var i = 0; i < pieces.length; i++) {
                old2New[pieces[i]] = old2New[first];
                new2Old[old2New[first]].push(pieces[i]);
            }
            new2Old[oldNum] = [];
        }
     }

    function solution(map) {
        // init
        var count = 1;
        var old2New = [];
        var new2Old = [];
        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[i].length; j++) {
                if (map[i][j] == 1) {
                    map[i][j] = count;
                    old2New[count] = count;
                    new2Old[count] = [count];
                    count += 1;
                }
            }
        }

        // merge
        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[i].length; j++) {
                if (map[i][j] != 0) {
                    var numbers = getNeibs(map, i, j);
                    for (var k = 0; k < numbers.length; k++) {
                        merge(old2New, new2Old, map[i][j], numbers[k]);
                    }
                }
            }
        }

        // calc islands
        count = 0;
        for (var k = 1; k < new2Old.length; k++) {
            if (new2Old[k].length > 0) {
                count += 1;
            }
        }
        return count;
    }

    root.SHRI_ISLANDS.solution = solution;
})(this);
