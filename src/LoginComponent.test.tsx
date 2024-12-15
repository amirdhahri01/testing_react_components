import { render, screen } from "@testing-library/react"
import LoginComponent from "./LoginComponent"


describe("Login Component Tests" , () => {
    const loginServiceMock ={
        login : jest.fn()
    }
    const setTokenMock = jest.fn()
    let container : HTMLElement;
    function setup(){
        container = render(<LoginComponent 
            loginService={loginServiceMock} 
            setToken={setTokenMock}
            />).container
    }
    beforeEach(() => {
        setup();
    })
    it("Should render correctly the login component" , () => {
        const mainElement = screen.getByRole("main")
        expect(mainElement).toBeInTheDocument()
        expect(screen.queryByTestId("resultLabel")).not.toBeInTheDocument()
    })
})