import { Navbar } from "@/src/components/Navbar";
import { describe, expect ,it, afterEach  } from "vitest";
import {cleanup ,render , screen , fireEvent} from "@testing-library/react";
afterEach(()=>{
    cleanup();
});

describe("Navbar",()=>{
    it("renders the navbar",()=>{
        render(<Navbar/>);
        expect(screen.getByRole("navigation")).toBeInTheDocument();
    });
});

   it("opens the menue when the button is clicked",()=>{
        render(<Navbar/>);
        const button =screen.getByRole("button",{name:/open menu/i});
        fireEvent.click(button);
        expect(button).toHaveAttribute("aria-expanded","true");
    });

    it ("close the menu when the button is clicked again",()=>{
        render(<Navbar/>);
        const button =screen.getByRole("button",{name:/open menu/i});
        fireEvent.click(button);
        fireEvent.click(button);
        expect(button).toHaveAttribute("aria-expanded","false");
    });

    it("closes the menue when Escape is pressed",()=>{
        render(<Navbar/>);
        const button =screen.getByRole("button",{name: /open menu/i});
        fireEvent.click(button);
        fireEvent.keyDown(button,{key:"Escape"});
        expect(button).toHaveAttribute("aria-expanded","false");

    
    });

    it ("returns focus to the menu button after Escape",()=>{
        render(<Navbar/>);
        const button = screen.getByRole("button",{name:/open menu/i});
        fireEvent.click(button);
        fireEvent.keyDown(button,{key:"Escape"});
        expect(document.activeElement).toBe(button);
    });
