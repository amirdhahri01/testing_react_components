import { fireEvent, render, screen } from "@testing-library/react"
import LoginComponent from "./LoginComponent"
import user from "@testing-library/user-event"
import { act } from "@testing-library/react"


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

    it("Should render correctly - query by test id" , ()=>{
        const inputs = screen.getAllByTestId("input")
        expect(inputs).toHaveLength(3)
        expect(inputs[0].getAttribute("value")).toBe("")
        expect(inputs[1].getAttribute("value")).toBe("")
        expect(inputs[2].getAttribute("value")).toBe("Login")
    })

    it("Should render correctly - query by document" , () => {
        const inputs = container.querySelectorAll("input")
        expect(inputs).toHaveLength(3)
        expect(inputs[0].getAttribute("value")).toBe("")
        expect(inputs[1].getAttribute("value")).toBe("")
        expect(inputs[2].getAttribute("value")).toBe("Login")
    })

    it("Click login button with incomplete credentials - show required message" , () => {
        const inputs = screen.getAllByTestId('input')
        const loginButton = inputs[2];
        fireEvent.click(loginButton)
        const resultLabel = screen.getByTestId("resultLabel")
        expect(resultLabel.textContent).toBe("UserName and password required!")
    })

    // it("Click login button with incomplete credentials - show required message" , () => {
    //     const inputs = screen.getAllByTestId('input')
    //     const loginButton = inputs[2];
    //     act(() => {
    //         user.click(loginButton)
    //     })
    //     const resultLabel = screen.getByTestId("resultLabel")
    //     expect(resultLabel.textContent).toBe("UserName and password required!")
    // })

    it("right credentials - successful login" , async () => {
        loginServiceMock.login.mockResolvedValueOnce("1234")
        const inputs = container.querySelectorAll("input")
        const userNameInput = inputs[0];
        const passwordInput = inputs[1];
        const loginButton = inputs[2];
        fireEvent.change(userNameInput , {target : {value : "user"}})
        fireEvent.change(passwordInput , {target : {value : "pass"}})
        fireEvent.click(loginButton)
        expect(loginServiceMock.login).toHaveBeenCalledWith("user" , "pass")
        const resultLabel = await screen.findByTestId("resultLabel")
        expect(resultLabel.textContent).toBe("successful login")
    })
    
    it("right credentials - successful login - with user calls" , async () => {
        loginServiceMock.login.mockResolvedValueOnce("1234")
        const inputs = container.querySelectorAll("input")
        const userNameInput = inputs[0];
        const passwordInput = inputs[1];
        const loginButton = inputs[2];
        act(() => {
            user.click(userNameInput)
            user.keyboard("user")

            user.click(passwordInput)
            user.keyboard("pass")

            user.click(loginButton)
        })
        expect(loginServiceMock.login).toHaveBeenCalledWith("user" , "pass")
        const resultLabel = await screen.findByTestId("resultLabel")
        expect(resultLabel.textContent).toBe("successful login")
    })

})