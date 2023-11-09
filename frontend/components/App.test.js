import server from '../../backend/mock-server'
import React from 'react'
import AppFunctional from './AppFunctional'
import AppClass from './AppClass'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

jest.setTimeout(1000) // default 5000 too long for Codegrade
const waitForOptions = { timeout: 100 }
const queryOptions = { exact: false }

let up, down, left, right, reset, submit
let squares, coordinates, steps, message, email

const updateStatelessSelectors = document => {
  up = document.querySelector('#up')
  down = document.querySelector('#down')
  left = document.querySelector('#left')
  right = document.querySelector('#right')
  reset = document.querySelector('#reset')
  submit = document.querySelector('#submit')
}

const updateStatefulSelectors = document => {
  squares = document.querySelectorAll('.square')
  coordinates = document.querySelector('#coordinates')
  steps = document.querySelector('#steps')
  message = document.querySelector('#message')
  email = document.querySelector('#email')
}


const testSquares = (squares, activeIdx) => {
  squares.forEach((square, idx) => {
    if (idx === activeIdx) {
      expect(square.textContent).toBe('B')
      expect(square.className).toMatch(/active/)
    } else {
      expect(square.textContent).toBeFalsy()
      expect(square.className).not.toMatch(/active/)
    }
  })
}

test('AppFunctional is a functional component, Review how to build a functional component, including useState and passing props.', () => {
  expect(
    AppFunctional.prototype &&
    AppFunctional.prototype.isReactComponent
  ).not.toBeTruthy()
})
test('AppClass is a class-based component, Review how to build a class-based component, such as using “extends”, and constructors', () => {
  expect(
    AppClass.prototype &&
    AppClass.prototype.isReactComponent
  ).toBeTruthy()
});

[AppFunctional, AppClass].forEach((Component, idx) => {
  const label = idx === 0 ? 'FUNCTIONAL' : 'CLASS-BASED'

  describe(`${label}`, () => {
    beforeAll(() => { server.listen() })
    afterAll(() => { server.close() })
    beforeEach(() => {
      render(<Component />)
      updateStatelessSelectors(document)
      updateStatefulSelectors(document)
    })
    afterEach(() => {
      server.resetHandlers()
      document.body.innerHTML = ''
    })

    describe(`[A ${label}] Active Square, Review how to set a class name and use ternary statements, as well as how to set, manipulate, and read pieces of state. Also review how to handle user interaction.`, () => {
      test(`[A ${label}] Actions: up left 
          Active Square should be index 0`, () => {
          fireEvent.click(up)
          fireEvent.click(left)
          testSquares(squares, 0)
      })
      
    })
    describe(`[B ${label}] Coordinates Readout, Review how to set, manipulate, and display pieces of state, and handle user interaction.`, () => {
      test(`[B ${label}] Actions: down
          Coordinates should be (2,3)`, () => {
        fireEvent.click(down)
        expect(coordinates.textContent).toMatch(/\(2.*3\)$/)
      })
      
    })
    describe(`[C ${label}] Limit Reached Message, Review how to set, manipulate, and display pieces of state, and handle user interaction.`, () => {
      test(`[C ${label}] Actions: down, up, up, up
          Limit reached message should be "You can't go up"`, () => {
        fireEvent.click(down)    
        fireEvent.click(up)
        fireEvent.click(up)
        fireEvent.click(up)
        expect(message.textContent).toBe("You can't go up")
      })
    })
    describe(`[D ${label}] Steps Counter,  Review how to set, manipulate, and display pieces of state, and handle user interaction.`, () => {
      test(`[D ${label}] Steps counter works correctly`, () => {
        expect(steps.textContent).toBe("You moved 0 times")
        fireEvent.click(up)
        fireEvent.click(up)
        expect(steps.textContent).toBe("You moved 1 time")
        fireEvent.click(left)        
        fireEvent.click(left)
        fireEvent.click(right)
        fireEvent.click(right)
        expect(steps.textContent).toBe("You moved 4 times")
        fireEvent.click(down)
        fireEvent.click(down)
        fireEvent.click(down)
        expect(steps.textContent).toBe("You moved 6 times")
        fireEvent.click(left)
        fireEvent.click(left)
        fireEvent.click(left)
        expect(steps.textContent).toBe("You moved 8 times")
      })
    })
    
    describe(`[E ${label}] Submit Button`, () => {
      test(`[E ${label}] Actions: up, type email, submit
          Success message is correct`, async () => {
        fireEvent.click(up)
        fireEvent.click(down)
        fireEvent.change(email, { target: { value: 'lady@gaga.com' } })
        fireEvent.click(submit)
        await screen.findByText('lady win #49', queryOptions, waitForOptions)
      })
    })
  })
})
