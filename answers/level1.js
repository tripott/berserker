import R from 'ramda'
import xhr from 'xhr'
import { parallel } from 'async'
/**
 * Level 1 - Callbacks
 *
 * READ About Callbacks: https://developer.mozilla.org/en-US/docs/Glossary/Callback_function
 * READ About setTimeout: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
 *
 * Challenge 1
 *
 * In this challenge use setTimeout to call print `World`
 * after print `Hello`
 * keeping the code print('World') above print('Hello')
 *
 * setTimeout takes a function as its first argument,
 * and milliseconds as its second argument, using
 * the function, you can get the contents of setTimeout
 * to run after the code below the setTimeout.
 *
 */
function challenge1(print) {
  setTimeout(() => {
    print('World')
  }, 10)

  print('Hello')
}
/**
 * Challenge 2
 *
 * READ: https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick
 *
 * Assign the callback function to the onclick event of the button
 *
 * The button element has an onclick property that can be assigned
 * ** HINT: Do this before the click function is called.
 */
function challenge2(button, callback) {
  button.onclick = callback
  setTimeout(() => button.click(), 10)
  return
}

/**
 * Challenge 3
 *
 * READ: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
 *
 * READ: https://github.com/naugtur/xhr
 *
 * Use the xhr library to get the number 42 from the number api and
 * use the callback to send the response to the caller.
 *
 * http://numbersapi.com/42
 */
function challenge3(xhr, callback) {
  window.xhr = xhr
  // use xhr to call the above url
  xhr.get('http://numbersapi.com/42', (err, res) => {
    callback(null, res.body)
  })
}

/**
 * Challenge 4
 *
 * READ https://caolan.github.io/async/docs.html#parallel
 *
 * In this parallel example use xhr and the parallel function
 * to get two numbers in parallel.
 *
 * http://numbersapi.com/42
 * http://numbersapi.com/63
 *
 */
function challenge4(xhr, parallel, callback) {
  parallel(
    [
      cb => xhr('http://numbersapi.com/42', (err, res) => cb(err, res.body)),
      cb => xhr('http://numbersapi.com/63', (err, res) => cb(err, res.body))
    ],
    callback
  )
  //callback(null, ['1', '2'])
}

/* ------------------- do not touch ----------------*/
const { equals, inc } = R
export default () => {
  tape('Level 1 - Challenge 1', t => {
    var count = 0
    t.plan(2)
    challenge1(v => {
      if (equals(count, 0)) {
        t.equals(v, 'Hello', 'Got Hello First')
      }
      if (equals(count, 1)) {
        t.equals(v, 'World', 'Got World Second')
      }
      count = inc(count)
    })
  })

  tape('Level 1 - Challenge 2', t => {
    t.plan(1)
    const el = document.createElement('button')
    el.onclick = () => {
      t.ok(false)
      el.parentNode.removeChild(el)
    }
    el.innerText = 'Click Me'
    const callback = function(v) {
      t.ok(true)
      el.parentNode.removeChild(el)
    }
    challenge2(el, callback)
    document.body.append(el)
  })

  tape('Level 1 - Challenge 3', t => {
    t.plan(1)
    challenge3(xhr, (err, body) => {
      t.ok(R.contains('42', body))
    })
  })

  tape('Level 1 - Challenge 4', t => {
    t.plan(1)
    challenge4(xhr, parallel, (err, results) => {
      t.ok(R.and(R.contains('42', results[0]), R.contains('63', results[1])))
    })
  })
}
