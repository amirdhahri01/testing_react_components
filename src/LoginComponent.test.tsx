import { render } from "@testing-library/react"
import LoginComponent from "./LoginComponent"


describe("Login Component Tests" , () => {
    const loginServiceMock ={
        login : jest.fn()
    }
    const setTokenMock = jest.fn()
    it("Should render correctly the login component" , () => {
        const container = render(<LoginComponent 
            loginService={loginServiceMock} 
            setToken={setTokenMock}
            />).container
        console.log(container.textContent);
            
    })
})