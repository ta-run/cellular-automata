document.addEventListener('DOMContentLoaded', function() {
    let container = document.querySelector('#container')
    let row = document.querySelector('.row')
    const patterns = {
        73: [
                [[1, 1, 1], false],
                [[1, 1, 0], true],
                [[1, 0, 1], false],
                [[1, 0, 0], false],
                [[0, 1, 1], true],
                [[0, 1, 0], false],
                [[0, 0, 1], false],
                [[0, 0, 0], true]
            ]
    }

    const getRandomNumber = () => Math.round(Math.random()) // returns 0 or 1
    const getState = (cell) => cell.classList.contains('active') ? 1 : 0 //returns true if cell is active
    const setState = (cell, state) => {
        cell.classList.remove('active', 'inactive') //remove both states
        cell.classList.add(state ? 'active' : 'inactive') //set correct state
    }

    const createRow = (() => {
        for(let i = 0; i < 145; i++) {
            let div = document.createElement('div')
            row.appendChild(div)
            div.classList.add(getRandomNumber() ? 'active' : 'inactive')
        }
    })()


    const duplicateRow = () => {
        let firstRow = document.querySelector('.row')
        let clone = firstRow.cloneNode(true)

        container.appendChild(clone)
        processRow(clone)
    }

    const processRow = (row) => {
        let prevRow = row.previousElementSibling;
        for(let i = 0; i < row.childNodes.length; i++) {
            let target = row.childNodes[i]

            let left = getState(prevRow.childNodes[i - 1] || prevRow.childNodes[prevRow.childNodes.length - 1])
            let self = getState(prevRow.childNodes[i])
            let right = getState(prevRow.childNodes[i + 1] || prevRow.childNodes[0])

            let automate = ruleMatcher.bind(null, target, left, self, right)

            for(let i = 0; i < patterns[73].length; i++) {
                automate(patterns[73][i][0], patterns[73][i][1])
            }
        }
    }


    setInterval(duplicateRow, 100)


    function ruleMatcher(target, left, self, right, rule, ruleValue) {
        let matchesRule =
            left === rule[0] &&
            self === rule[1] &&
            right === rule[2]

        if(matchesRule) setState(target, ruleValue)

    }
})